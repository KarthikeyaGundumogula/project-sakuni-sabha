//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IExpeditionGame} from "./IExpeditionGame.sol";
import {IAssets} from "../IAssets.sol";

contract ExpeditionGameManager {
    error ExpeditionGame_InvalidNumOfRounds(uint8 numOfRounds);
    error ExpeditionGame_InvalidNumOfPlayers(uint8 numOfPlayers);
    error ExpeditionGame_InvalidMinBetValue(uint32 minBetValue);
    error ExpeditionGame_InvalidMaxRiseValue(uint32 maxRiseValue);
    error ExpeditionGame_InvalidGameID(uint gameID);
    error ExpeditionGame_GameIsFull();
    error ExpeditionGame_GameIsNotFull();
    error ExpeditionGame_BetPlacementFailed(uint8 roundNo);
    error ExpeditionGame_NotAllowedAddress();
    error ExpeditionGame_BetIsNotMatched(uint8 roundNo);

    IExpeditionGame public s_expeditionGame;
    IAssets public s_assets;
    uint8 public constant PLUTON_COST = 10;
    uint8 public constant AURORA_COST = 5;
    uint8 public constant NEXOS_COST = 2;
    uint16 public constant THRESHOLD_BET = 500;
    uint8 public constant PLUTON_ID = 1;
    uint8 public constant AURORA_ID = 2;
    uint8 public constant NEXOS_ID = 3;
    uint8 public constant VELAR_ID = 0;
    address public immutable VAULT_ADDRESS;

    event ExpeditionGame_GameCreated(
        uint gameID,
        uint8 numOfPlayers,
        uint32 minBetValue
    );
    event ExpeditionGame_PlayerJoined(uint gameID, address player);
    event ExpeditionGame_GameStarted(uint gameID);
    event ExpeditionGame_BetPlaced(uint gameID, address player, uint betValue);

    constructor(address _expeditionGame, address _assets) {
        s_expeditionGame = IExpeditionGame(_expeditionGame);
        s_assets = IAssets(_assets);
        VAULT_ADDRESS = _assets;
    }

    modifier onlyAllowedAddresses(uint256 _gameId) {
        IExpeditionGame.Game memory game = s_expeditionGame.getGame(_gameId);
        bool isAllowed = false;
        for (uint i = 0; i < game.players.length; i++) {
            if (game.players[i] == msg.sender) {
                isAllowed = true;
                break;
            }
        }
        if (!isAllowed) revert ExpeditionGame_NotAllowedAddress();
        _;
    }

    function createGame(uint8 _numOfPlayers, uint32 _entryBet) external {
        if (_numOfPlayers < 2 || _numOfPlayers > 5)
            revert ExpeditionGame_InvalidNumOfPlayers(_numOfPlayers);
        if (_entryBet < 3 || _entryBet > THRESHOLD_BET)
            revert ExpeditionGame_InvalidMinBetValue(_entryBet);
        s_expeditionGame.incrementGameCounter();
        uint gameCounter = s_expeditionGame.getCurrentGameCounter();
        IExpeditionGame.Game memory game = IExpeditionGame.Game({
            gameID: gameCounter,
            potValue: 0,
            state: IExpeditionGame.GameState.CREATED,
            entryBet: _entryBet,
            plutonsCount: 0,
            aurorasCount: 0,
            nexosCount: 0,
            numOfPlayers: _numOfPlayers,
            players: new address[](_numOfPlayers),
            vacancy: _numOfPlayers
        });
        s_expeditionGame.updateGame(gameCounter, game);
        emit ExpeditionGame_GameCreated(
            s_expeditionGame.getCurrentGameCounter(),
            _numOfPlayers,
            _entryBet
        );
    }

    function joinGame(
        uint _gameId,
        uint32 _plutons,
        uint32 _auroras,
        uint32 _nexos
    ) public {
        IExpeditionGame.Game memory game = s_expeditionGame.getGame(_gameId);
        if (
            game.state != IExpeditionGame.GameState.CREATED ||
            game.state == IExpeditionGame.GameState.FINISHED
        ) revert ExpeditionGame_InvalidGameID(_gameId);
        if (game.vacancy == 0) revert ExpeditionGame_GameIsFull();
        game.players[game.numOfPlayers - game.vacancy] = msg.sender;
        game.potValue += game.entryBet;
        game.vacancy--;
        IExpeditionGame.PlayerStats memory stats = IExpeditionGame.PlayerStats({
            gameId: _gameId,
            player: msg.sender,
            currentHand: new uint8[](0),
            currentRoll: 0,
            currentScore: 0,
            currentRollRequestId: bytes32(0),
            totalBet: 0
        });
        s_expeditionGame.updatePlayerStats(_gameId, msg.sender, stats);
        s_expeditionGame.updateGame(_gameId, game);
        bool joined = placeBet(msg.sender, _gameId, _plutons, _auroras, _nexos);
        if (!joined) revert ExpeditionGame_BetPlacementFailed(1);
        emit ExpeditionGame_PlayerJoined(_gameId, msg.sender);
    }

    function startGame(uint _gameId) public onlyAllowedAddresses(_gameId) {
        IExpeditionGame.Game memory game = s_expeditionGame.getGame(_gameId);
        IExpeditionGame.PlayerStats memory playerStats = s_expeditionGame
            .getPLayerStats(_gameId, msg.sender);
        if (
            game.state != IExpeditionGame.GameState.CREATED ||
            game.state == IExpeditionGame.GameState.FINISHED
        ) revert ExpeditionGame_InvalidGameID(_gameId);
        if (game.vacancy != 0) revert ExpeditionGame_GameIsNotFull();
        game.state = IExpeditionGame.GameState.STARTED;
        s_expeditionGame.updateGame(_gameId, game);
        s_expeditionGame.updatePlayerStats(_gameId, msg.sender, playerStats);
        game.state = IExpeditionGame.GameState.STARTED;
        emit ExpeditionGame_GameStarted(_gameId);
    }

    function placeBet(
        address player,
        uint _gameId,
        uint32 _plutons,
        uint32 _auroras,
        uint32 _nexos
    ) public returns (bool) {
        IExpeditionGame.PlayerStats memory playerStats = s_expeditionGame
            .getPLayerStats(_gameId, player);
        uint totalBet = _plutons *
            PLUTON_COST +
            _auroras *
            AURORA_COST +
            _nexos *
            NEXOS_COST;
        IExpeditionGame.Game memory game = s_expeditionGame.getGame(_gameId);
        if (_plutons > 0)
            s_assets.sendTokens(player, VAULT_ADDRESS, _plutons, PLUTON_ID);
        game.plutonsCount += _plutons;
        if (_auroras > 0)
            s_assets.sendTokens(player, VAULT_ADDRESS, _auroras, AURORA_ID);
        game.aurorasCount += _auroras;
        if (_nexos > 0)
            s_assets.sendTokens(player, VAULT_ADDRESS, _nexos, NEXOS_ID);
        game.nexosCount += _nexos;
        playerStats.totalBet += totalBet;
        s_expeditionGame.updatePlayerStats(_gameId, player, playerStats);
        s_expeditionGame.updateGame(_gameId, game);
        emit ExpeditionGame_BetPlaced(_gameId, player, totalBet);
        return true;
    }
}

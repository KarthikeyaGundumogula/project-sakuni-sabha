//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {ISeigeGame} from "./ISeigeGame.sol";
import {IAssets} from "../IAssets.sol";
import {console2} from "forge-std/console2.sol";

contract SeigeGameManager {
    error SeigeGame_InvalidGameID(uint gameId);
    error SeigeGame_GameIsFull();
    error SeigeGame_InvalidBet();

    event SeigeGame_GameCreated(
        uint gameID,
        uint8 numOfPlayers,
        uint32 entryBet,
        uint32 maxRise
    );
    event SeigeGame_PlayerJoined(uint gameID, address player);
    event SeigeGame_BetRaised(uint gameID, address player, uint totalValue);
    event SeigeGame_PlayerFolded(uint gameID, address player);

    ISeigeGame public seigeGame;
    IAssets public assets;
    mapping(uint => uint) internal tokenCosts;

    constructor(address _seigeGameAddress, address _assets) {
        seigeGame = ISeigeGame(_seigeGameAddress);
        assets = IAssets(_assets);
        tokenCosts[1] = 10;
        tokenCosts[2] = 5;
        tokenCosts[3] = 2;
        tokenCosts[4] = 100000;
        tokenCosts[5] = 75000;
        tokenCosts[6] = 50000;
        tokenCosts[7] = 30000;
        tokenCosts[8] = 20000;
        tokenCosts[9] = 10000;
        tokenCosts[10] = 7500;
    }

    function getGame(
        uint _gameId
    ) internal view returns (ISeigeGame.Game memory) {
        return seigeGame.getGame(_gameId);
    }

    function getPLayerStats(
        uint _gameId,
        address _player
    ) internal view returns (ISeigeGame.PlayerStats memory) {
        return seigeGame.getPLayerStats(_gameId, _player);
    }

    function updateGame(uint _gameId, ISeigeGame.Game memory _game) internal {
        seigeGame.updateGame(_gameId, _game);
    }

    function updatePlayerStats(
        uint _gameId,
        address _player,
        ISeigeGame.PlayerStats memory _playerStats
    ) internal {
        seigeGame.updatePlayerStats(_gameId, _player, _playerStats);
    }

    function incrementGameCounter() internal {
        seigeGame.incrementGameCounter();
    }

    function getCurrentGameCounter() internal view returns (uint) {
        return seigeGame.getCurrentGameCounter();
    }

    function createGame(
        uint32 numOfPlayers,
        uint32 entryBet,
        uint32 maxRise
    ) public {
        incrementGameCounter();
        uint gameId = getCurrentGameCounter();
        ISeigeGame.Game memory game = ISeigeGame.Game({
            gameID: gameId,
            potValue: 0,
            state: ISeigeGame.GameState.CREATED,
            entryBet: entryBet,
            maxRise: maxRise,
            currentRise: 0,
            numOfPlayers: uint8(numOfPlayers),
            potTokens: new uint8[](10),
            players: new address[](numOfPlayers),
            vacancy: uint8(numOfPlayers),
            currentLevel: ISeigeGame.GameLevel.BOOTCAMP,
            roundCompletedPlayers: 0
        });
        updateGame(gameId, game);
        emit SeigeGame_GameCreated(
            gameId,
            uint8(numOfPlayers),
            entryBet,
            maxRise
        );
    }

    function joinGame(uint _gameId, uint8[] memory _potTokens) public {
        ISeigeGame.Game memory game = getGame(_gameId);
        if (
            game.state != ISeigeGame.GameState.CREATED ||
            game.state == ISeigeGame.GameState.FINISHED
        ) revert SeigeGame_InvalidGameID(_gameId);
        checkPlayersBalance(msg.sender, _potTokens);
        if (game.vacancy == 0) revert SeigeGame_GameIsFull();
        uint totalValue = getTokensValue(_potTokens);
        if (totalValue != game.entryBet) revert SeigeGame_InvalidBet();
        bool depositSuccess = depositTokens(msg.sender, _potTokens);
        if (!depositSuccess) revert("Deposit failed");
        ISeigeGame.PlayerStats memory playerStats = ISeigeGame.PlayerStats({
            gameId: _gameId,
            player: msg.sender,
            currentHand: new uint8[](0),
            currentRoll: 0,
            currentScore: 0,
            currentRollRequestId: bytes32(0),
            totalBet: totalValue,
            currentLevel: ISeigeGame.GameLevel.BOOTCAMP,
            isFolded: false
        });
        game.vacancy--;
        game.potValue += totalValue;
        game.currentRise += totalValue;
        game.players[game.numOfPlayers - game.vacancy-1] = msg.sender;
        if (game.vacancy == 0) {
            game.state = ISeigeGame.GameState.STARTED;
        }
        for (uint8 i = 0; i < _potTokens.length; i++) {
            game.potTokens[i] += _potTokens[i];
        }
        updateGame(_gameId, game);
        updatePlayerStats(_gameId, msg.sender, playerStats);
        emit SeigeGame_PlayerJoined(_gameId, msg.sender);
    }

    function raiseBet(uint _gameId, uint8[] memory _potTokens) public {
        ISeigeGame.Game memory game = getGame(_gameId);
        ISeigeGame.PlayerStats memory playerStats = getPLayerStats(
            _gameId,
            msg.sender
        );
        if (game.currentLevel == ISeigeGame.GameLevel.BOOTCAMP)
            revert SeigeGame_InvalidGameID(_gameId);
        checkPlayersBalance(msg.sender, _potTokens);
        uint totalValue = getTokensValue(_potTokens);
        if (totalValue > game.maxRise) revert SeigeGame_InvalidBet();
        bool depositSuccess = depositTokens(msg.sender,  _potTokens);
        if (!depositSuccess) revert("Deposit failed");
        game.potValue += totalValue;
        game.currentRise += totalValue;
        playerStats.totalBet += totalValue;
        updateGame(_gameId, game);
        updatePlayerStats(_gameId, msg.sender, playerStats);
        emit SeigeGame_BetRaised(_gameId, msg.sender, totalValue);
    }

    function foldGame(uint _gameId) public onlyAllowedAddresses(_gameId) {
        ISeigeGame.Game memory game = getGame(_gameId);
        ISeigeGame.PlayerStats memory playerStats = getPLayerStats(
            _gameId,
            msg.sender
        );
        if (game.state != ISeigeGame.GameState.STARTED)
            revert SeigeGame_InvalidGameID(_gameId);
        removePlayer(game.players, msg.sender);
        game.numOfPlayers--;
        playerStats.isFolded = true;
        updateGame(_gameId, game);
        updatePlayerStats(_gameId, msg.sender, playerStats);
        emit SeigeGame_PlayerFolded(_gameId, msg.sender);
    }

    function startLevel(uint _gameId) public onlyAllowedAddresses(_gameId) {
        ISeigeGame.Game memory game = getGame(_gameId);
        if (game.currentLevel == ISeigeGame.GameLevel.BOOTCAMP)
            revert("Game is in bootcamp level");
        if (game.state != ISeigeGame.GameState.STARTED)
            revert SeigeGame_InvalidGameID(_gameId);
        bool everyoneRaisedBets = checkEveryoneRaisedBets(_gameId);
        if (!everyoneRaisedBets) revert("Not everyone raised bets");
        game.currentLevel = ISeigeGame.GameLevel(uint8(game.currentLevel) + 1);
        game.roundCompletedPlayers = 0;
        updateGame(_gameId, game);
    }

    function checkEveryoneRaisedBets(
        uint _gameId
    ) internal view returns (bool) {
        ISeigeGame.Game memory game = getGame(_gameId);
        for (uint i = 0; i < game.players.length; i++) {
            if (game.players[i] != address(0)) {
                ISeigeGame.PlayerStats memory playerStats = getPLayerStats(
                    _gameId,
                    game.players[i]
                );
                if (playerStats.totalBet != game.currentRise) return false;
            }
        }
        return true;
    }

    function getTokensValue(
        uint8[] memory _potTokens
    ) internal view returns (uint) {
        uint totalValue = 0;
        for (uint i = 0; i < _potTokens.length; i++) {
            totalValue += tokenCosts[i + 1] * _potTokens[i];
        }
        return totalValue;
    }

    function depositTokens(
        address _player,
        uint8[] memory _betTokens
    ) public returns (bool) {
        for (uint8 i = 0; i < _betTokens.length; i++) {
            if (_betTokens[i] > 0) {
                assets.sendTokens(_player, address(assets), _betTokens[i], i + 1);
                uint toatalValue = getTokensValue(_betTokens);
                assets.depositToVelars(toatalValue);
            }
        }
        return true;
    }

    function checkPlayersBalance(
        address _player,
        uint8[] memory _betTokens
    ) public view {
        for (uint8 i = 0; i < _betTokens.length; i++) {
            if (assets.getBalance(_player, i + 1) < _betTokens[i])
                revert("Insufficient balance");
        }
    }

    function removePlayer(address[] memory arr, address addr) internal pure {
        uint index = 0;
        bool found = false;
        for (uint i = 0; i < arr.length; i++) {
            if (arr[i] == addr) {
                index = i;
                found = true;
                break;
            }
        }
        if (found) {
            arr[index] = address(0);
            arr[index] = arr[arr.length - 1];
            arr[arr.length - 1] = address(0);
        }
    }

    modifier onlyAllowedAddresses(uint _gameId) {
        bool allowed = false;
        address[] memory allowedAddresses = getGame(_gameId).players;
        for (uint i = 0; i < allowedAddresses.length; i++) {
            if (msg.sender == allowedAddresses[i]) {
                allowed = true;
                break;
            }
        }
        require(allowed, "This address is not authorized to run this function");
        _;
    }
}

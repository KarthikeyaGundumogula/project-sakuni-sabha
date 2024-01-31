//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {ISeigeGame} from "./ISeigeGame.sol";
import {IAssets} from "../IAssets.sol";

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
            currentLevel: 0
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
        if (game.vacancy == 0) revert SeigeGame_GameIsFull();
        uint totalValue = getTokensValue(_potTokens);
        if (totalValue != game.entryBet) revert SeigeGame_InvalidBet();
        game.players[game.numOfPlayers - game.vacancy] = msg.sender;
    }

    function placeBet(
        address _player,
        uint8[] memory _betTokens,
        uint _gameId
    ) internal returns (bool) {
        ISeigeGame.Game memory game = getGame(_gameId);
        ISeigeGame.PlayerStats memory playerStats = getPLayerStats(
            _gameId,
            _player
        );
        uint totalBet = getTokensValue(_betTokens);
        updatePlayerStats(_gameId, _player, playerStats);
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
}

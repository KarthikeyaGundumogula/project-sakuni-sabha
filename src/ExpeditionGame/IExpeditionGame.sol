// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IExpeditionGame {
    enum GameState {
        CREATED,
        STARTED,
        FINISHED
    }

    struct Game {
        uint gameID;
        uint potValue;
        GameState state;
        uint32 entryBet;
        uint32 maxRiseValue;
        uint8 numOfRounds;
        uint8 numOfPlayers;
        uint8 currentRound;
        uint8 roundCompletedPlayers;
        bool roundCompleted;
        address[] players;
        uint32 currentRaise;
    }

    struct PlayerStats {
        uint gameId;
        address player;
        uint8[] currentHand;
        uint8 currentRoll;
        uint8 currentScore;
        uint8 currentRound;
        uint totalBet;
        bool isFolded;
    }

    function incrementGameCounter() external;
    function getCurrentGameCounter() external view returns (uint) ;

    function getGame(uint _gameId) external view returns (Game memory);

    function getPLayerStats(
        uint _gameId,
        address _player
    ) external view returns (PlayerStats memory);

    function updateGame(uint _gameId, Game memory _game) external;

    function updatePlayerStats(
        uint _gameId,
        address _player,
        PlayerStats memory _playerStats
    ) external;
}

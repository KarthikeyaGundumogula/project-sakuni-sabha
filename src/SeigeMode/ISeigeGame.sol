// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ISeigeGame {
    enum GameState {
        CREATED,
        STARTED,
        FINISHED
    }
    enum GameLevel {
        BOOTCAMP,
        MANEUVER,
        CONQUEST
    }
    struct Game {
        uint gameID;
        uint potValue;
        GameState state;
        uint32 entryBet;
        uint32 maxRise;
        uint currentRise;
        uint8 numOfPlayers;
        uint8[] potTokens;
        address[] players;
        uint8 vacancy;
        GameLevel currentLevel;
        uint8 roundCompletedPlayers;
    }

    struct PlayerStats {
        uint gameId;
        address player;
        uint8[] currentHand;
        uint8 currentRoll;
        uint currentScore;
        bytes32 currentRollRequestId;
        uint totalBet;
        GameLevel currentLevel;
        bool isFolded;
    }

    function incrementGameCounter() external;

    function getCurrentGameCounter() external view returns (uint);

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

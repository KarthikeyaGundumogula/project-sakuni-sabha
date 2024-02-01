//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import {IAssets} from "../IAssets.sol";
import {ScoreCard} from "../ScoreCard.sol";

contract SeigeGame is ScoreCard {
    error SeigeGame_InvalidGameID(uint gameId);
    error SeigeGame_RollingDiceFailed();
    error SeigeGame_InvalidRollRequest();

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

    struct RollRequest {
        uint gameId;
        address player;
        bytes32 requestId;
        uint8[] rollResults;
    }

    IAssets public s_assets;
    uint public s_gameCounter;
    address public owner;
    address public VAULT_ADDRESS;

    constructor(address _assets) {
        s_assets = IAssets(_assets);
        s_gameCounter = 0;
        VAULT_ADDRESS = _assets;
        owner = msg.sender;
    }

    mapping(uint => Game) public s_games;
    mapping(uint => mapping(address => PlayerStats)) public s_playerStats;
    mapping(bytes32 => mapping(address => RollRequest)) public s_rollRequests;
    mapping(uint => mapping(address => uint)) public s_playerRolls;
    mapping(bytes32 => uint) public s_requestToGameId;

    event SeigeGame_WithdrawalRequested(
        address indexed airnode,
        address indexed sponsorWallet
    );
    event SeigeGame_RollSaved(
        uint gameId,
        address player,
        uint8[] hand,
        uint8[] newHand
    );

    receive() external payable {
        payable(owner).transfer(msg.value);
        // emit SeigeGame_WithdrawalRequested(airnode, sponsorWallet);
    }

    modifier onlyAllowedAddresses(uint _gameId) {
        bool allowed = false;
        address[] memory allowedAddresses = s_games[_gameId].players;
        for (uint i = 0; i < allowedAddresses.length; i++) {
            if (msg.sender == allowedAddresses[i]) {
                allowed = true;
                break;
            }
        }
        require(allowed, "This address is not authorized to run this function");
        _;
    }

    function rollDice(uint gameId) public onlyAllowedAddresses(gameId) {
        //uint length = 5 - s_playerStats[gameId][msg.sender].currentHand.length;
        Game storage game = s_games[gameId];
        if (game.state != GameState.STARTED)
            revert SeigeGame_InvalidGameID(gameId);
        PlayerStats storage playerStats = s_playerStats[gameId][msg.sender];
        if (playerStats.totalBet == game.currentRise)
            revert SeigeGame_InvalidRollRequest();
        if (playerStats.currentRoll > 3) revert SeigeGame_RollingDiceFailed();
        //bytes32 rollRequestId = getRandomNumbers(length);
        bytes32 rollRequestId = bytes32("1u");
        s_rollRequests[rollRequestId][msg.sender] = RollRequest({
            gameId: gameId,
            player: msg.sender,
            requestId: rollRequestId,
            rollResults: new uint8[](0)
        });
        s_playerStats[gameId][msg.sender].currentRollRequestId = rollRequestId;
    }

    function getDiceResults(uint _length) public returns (uint8[] memory) {
        uint8[] memory arr = new uint8[](_length);
        for (uint8 i = 0; i < _length; i++) {
            arr[i] = i;
        }
        s_rollRequests[bytes32("1u")][msg.sender].rollResults = arr;
        return arr;
    }

    function saveDice(
        uint _gameId,
        uint8[] memory _hand
    ) public onlyAllowedAddresses(_gameId) {
        PlayerStats memory playerStats = s_playerStats[_gameId][msg.sender];
        Game memory game = s_games[_gameId];
        bytes32 rollRequestId = playerStats.currentRollRequestId;
        RollRequest memory rollRequest = s_rollRequests[rollRequestId][
            msg.sender
        ];
        bool subset = isSubset(_hand, rollRequest.rollResults);
        if (!subset) revert("Invalid combination");
        uint currentHandLength = playerStats.currentHand.length;
        for (uint8 i = 0; i < _hand.length; i++) {
            playerStats.currentHand[currentHandLength + i] = _hand[i];
        }
        playerStats.currentRoll++;
        if (playerStats.currentRoll == 3) {
            playerStats.currentRollRequestId = bytes32(0);
            game.roundCompletedPlayers++;
            if (game.roundCompletedPlayers == game.numOfPlayers) {
                game.roundCompletedPlayers = 0;
                playerStats.currentRoll = 0;
                playerStats.currentScore = getScore(playerStats.currentHand);
                if (game.currentLevel == GameLevel.BOOTCAMP) {
                    address winner = getCurrentLevelWinner(_gameId);
                    s_assets.sendTokens(
                        VAULT_ADDRESS,
                        winner,
                        game.potValue / 4,
                        0
                    );
                    game.currentLevel = GameLevel.MANEUVER;
                } else if (game.currentLevel == GameLevel.MANEUVER) {
                    address winner = getCurrentLevelWinner(_gameId);
                    s_assets.sendTokens(
                        VAULT_ADDRESS,
                        winner,
                        game.potValue / 2,
                        0
                    );
                    game.currentLevel = GameLevel.CONQUEST;
                } else if (game.currentLevel == GameLevel.CONQUEST) {
                    address winner = getCurrentLevelWinner(_gameId);
                    s_assets.sendTokens(
                        VAULT_ADDRESS,
                        winner,
                        game.potValue,
                        0
                    );
                    game.state = GameState.FINISHED;
                }
            }
        }
        s_playerStats[_gameId][msg.sender] = playerStats;
        s_games[_gameId] = game;
        emit SeigeGame_RollSaved(
            _gameId,
            msg.sender,
            _hand,
            playerStats.currentHand
        );
    }

    function getCurrentLevelWinner(uint _gameId) public view returns (address) {
        Game memory game = s_games[_gameId];
        uint maxScore = 0;
        address winner;
        for (uint i = 0; i < game.numOfPlayers; i++) {
            PlayerStats memory playerStats = s_playerStats[_gameId][
                game.players[i]
            ];
            if (playerStats.currentScore > maxScore) {
                maxScore = playerStats.currentScore;
                winner = game.players[i];
            }
        }
        return winner;
    }

    function getRollRequests(
        address _player,
        bytes32 _rollRequest
    ) external view returns (RollRequest memory) {
        return s_rollRequests[_rollRequest][_player];
    }

    function getGame(uint _gameId) external view returns (Game memory) {
        return s_games[_gameId];
    }

    function getPLayerStats(
        uint _gameId,
        address _player
    ) external view returns (PlayerStats memory) {
        return s_playerStats[_gameId][_player];
    }

    function updateGame(uint _gameId, Game memory _game) external {
        s_games[_gameId] = _game;
    }

    function updatePlayerStats(
        uint _gameId,
        address _player,
        PlayerStats memory _playerStats
    ) external {
        s_playerStats[_gameId][_player] = _playerStats;
    }

    function getCurrentGameCounter() external view returns (uint) {
        return s_gameCounter;
    }

    function incrementGameCounter() external {
        s_gameCounter++;
    }

    function isSubset(
        uint8[] memory _array1,
        uint8[] memory _array2
    ) public pure returns (bool) {
        for (uint i = 0; i < _array1.length; i++) {
            bool found = false;
            for (uint j = 0; j < _array2.length; j++) {
                if (_array1[i] == _array2[j]) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                return false;
            }
        }
        return true;
    }
}

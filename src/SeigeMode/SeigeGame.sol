//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import {IAssets} from "../IAssets.sol";

contract SeigeGame {
    error SeigeGame_InvalidGameID(uint gameId);
    error SeigeGame_RollingDiceFailed();
    error SeigeGame_InvalidRollRequest();

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
        uint32 maxRise;
        uint currentRise;
        uint8 numOfPlayers;
        uint8[] potTokens;
        address[] players;
        uint8 vacancy;
        uint8 currentLevel;
    }

    struct PlayerStats {
        uint gameId;
        address player;
        uint8[] currentHand;
        uint8 currentRoll;
        uint8 currentScore;
        bytes32 currentRollRequestId;
        uint totalBet;
        uint8 currentLevel;
    }

    struct RollRequest {
        uint gameId;
        address player;
        bytes32 requestId;
        uint[] rollResults;
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
        if (playerStats.currentRoll > 3) revert SeigeGame_RollingDiceFailed();
        //bytes32 rollRequestId = getRandomNumbers(length);
        bytes32 rollRequestId = bytes32("1u");
        s_rollRequests[rollRequestId][msg.sender] = RollRequest({
            gameId: gameId,
            player: msg.sender,
            requestId: rollRequestId,
            rollResults: new uint[](0)
        });
        s_playerStats[gameId][msg.sender].currentRollRequestId = rollRequestId;
    }

    function getDiceResults(uint _length) public pure returns (uint[] memory) {
        uint[] memory arr = new uint[](_length);
        for (uint i = 0; i < _length; i++) {
            arr[i] = i;
        }

        return arr;
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
        uint[] memory _array1,
        uint[] memory _array2
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

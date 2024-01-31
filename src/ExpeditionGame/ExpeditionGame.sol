//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {IAssets} from "../IAssets.sol";
import {console} from "forge-std/Test.sol";
import "../ScoreCard.sol";

import {RrpRequesterV0} from "@api3/airnode-protocol/contracts/rrp/requesters/RrpRequesterV0.sol";

contract ExpeditionGame is ScoreCard, RrpRequesterV0 {
    error ExpeditionGame_InvalidGameID(uint gameID);
    error ExpeditionGame_BetIsNotMatched(uint8 tokenID);
    error ExpeditionGame_BetPlacementFailed(uint8 roundNo);
    error ExpeditionGame_RollingDiceFailed();
    error ExpeditionGame_SavingRollFailed();

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
        uint8 numOfPlayers;
        uint plutonsCount;
        uint aurorasCount;
        uint nexosCount;
        address[] players;
        uint8 vacancy;
    }

    struct PlayerStats {
        uint gameId;
        address player;
        uint8[] currentHand;
        uint8 currentRoll;
        uint8 currentScore;
        bytes32 currentRollRequestId;
        uint totalBet;
    }

    struct RollRequest {
        uint gameId;
        address player;
        bytes32 requestId;
        uint[] rollResults;
    }

    uint8 public constant PLUTON_COST = 10;
    uint8 public constant AURORA_COST = 5;
    uint8 public constant NEXOS_COST = 2;
    uint16 public constant THRESHOLD_BET = 500;
    uint8 public constant PLUTON_ID = 1;
    uint8 public constant AURORA_ID = 2;
    uint8 public constant NEXOS_ID = 3;
    uint8 public constant VELAR_ID = 0;
    address public immutable VAULT_ADDRESS;
    uint private s_gameCounter;
    IAssets private s_assets;
    address private airnode; // The address of the QRNG Airnode
    bytes32 private endpointIdUint256; // The endpoint ID for requesting a single random number
    bytes32 private endpointIdUint256Array; // The endpoint ID for requesting an array of random numbers
    address private sponsorWallet; // The wallet that will cover the gas costs of the request
    address private owner;

    mapping(uint => mapping(address => PlayerStats)) private s_stats;
    mapping(bytes32 => mapping(address => RollRequest)) private s_rollRequests;
    mapping(bytes32 => bool) private expectingRequestWithIdToBeFulfilled;
    mapping(uint => Game) private s_games;
    mapping(bytes32 => address) private s_requestIdToPlayer;

    event ExpeditionGame_RequestedUint256Array(
        bytes32 indexed requestId,
        uint256 size
    );
    event ExpeditionGame_ReceivedUint256Array(
        bytes32 indexed requestId,
        uint256[] response
    );
    event ExpeditionGame_WithdrawalRequested(
        address indexed airnode,
        address indexed sponsorWallet
    );
    event ExpeditionGame_RoundCompleted(uint gameId, uint roundNo);

    constructor(address _assets, address _airnode) RrpRequesterV0(_airnode) {
        s_assets = IAssets(_assets);
        s_gameCounter = 0;
        VAULT_ADDRESS = _assets;
        owner = msg.sender;
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

    function setRequestParameters(
        address _airnode,
        bytes32 _endpointIdUint256,
        bytes32 _endpointIdUint256Array,
        address _sponsorWallet
    ) external {
        airnode = _airnode;
        endpointIdUint256 = _endpointIdUint256;
        endpointIdUint256Array = _endpointIdUint256Array;
        sponsorWallet = _sponsorWallet;
    }

    receive() external payable {
        payable(owner).transfer(msg.value);
        emit ExpeditionGame_WithdrawalRequested(airnode, sponsorWallet);
    }

    /// @notice To withdraw funds from the sponsor wallet to the contract.
    // function withdraw() external {
    //     require(msg.sender == owner, "Only owner can withdraw");
    //     airnodeRrp.requestWithdrawal(airnode, sponsorWallet);
    // }

    function rollDice(uint gameId) public onlyAllowedAddresses(gameId) {
        uint length = 5 - s_stats[gameId][msg.sender].currentHand.length;
        Game storage game = s_games[gameId];
        if (game.state != GameState.STARTED)
            revert ExpeditionGame_InvalidGameID(gameId);
        PlayerStats storage playerStats = s_stats[gameId][msg.sender];
        if (playerStats.currentRoll > 3)
            revert ExpeditionGame_RollingDiceFailed();
        bytes32 rollRequestId = getRandomNumbers(length);
        s_rollRequests[rollRequestId][msg.sender] = RollRequest({
            gameId: gameId,
            player: msg.sender,
            requestId: rollRequestId,
            rollResults: new uint[](0)
        });
        s_stats[gameId][msg.sender].currentRollRequestId = rollRequestId;
        s_requestIdToPlayer[rollRequestId] = msg.sender;
    }

    function getRandomNumbers(uint256 size) public returns (bytes32) {
        bytes32 requestId = airnodeRrp.makeFullRequest(
            airnode,
            endpointIdUint256Array,
            address(this),
            sponsorWallet,
            address(this),
            this.getDiceResults.selector,
            // Using Airnode ABI to encode the parameters
            abi.encode(bytes32("1u"), bytes32("size"), size)
        );
        expectingRequestWithIdToBeFulfilled[requestId] = true;
        emit ExpeditionGame_RequestedUint256Array(requestId, size);
        return requestId;
    }

    function getDiceResults(
        bytes32 requestId,
        bytes calldata data
    ) external onlyAirnodeRrp {
        require(
            expectingRequestWithIdToBeFulfilled[requestId],
            "Request ID not known"
        );
        expectingRequestWithIdToBeFulfilled[requestId] = false;
        uint256[] memory qrngUint256Array = abi.decode(data, (uint256[]));
        address player = s_requestIdToPlayer[requestId];
        RollRequest storage rollRequest = s_rollRequests[requestId][player];
        for (uint i = 0; i < qrngUint256Array.length; i++) {
            rollRequest.rollResults.push(qrngUint256Array[i] % 6);
        }
        emit ExpeditionGame_ReceivedUint256Array(requestId, qrngUint256Array);
    }

    function saveRoll(
        uint _gameId,
        bytes32 _rollRequest,
        uint[] memory _hand
    ) public {
        bool isSubsetOfRollResults = isSubset(
            _hand,
            s_rollRequests[_rollRequest][msg.sender].rollResults
        );
        if (!isSubsetOfRollResults) revert ExpeditionGame_SavingRollFailed();
        for (uint i = 0; i < _hand.length; i++) {
            s_stats[_gameId][msg.sender].currentHand.push(uint8(_hand[i]));
        }
        s_stats[_gameId][msg.sender].currentRoll =
            s_stats[_gameId][msg.sender].currentRoll +
            1;
        if (s_stats[_gameId][msg.sender].currentRoll == 3) {
            s_stats[_gameId][msg.sender].currentRoll = 0;
            uint score = getScore(s_stats[_gameId][msg.sender].currentHand);
            s_stats[_gameId][msg.sender].currentScore += uint8(score);
        }
    }

    function getWinner(uint _gameId) public {
        Game storage game = s_games[_gameId];
        uint8 winnerScore = 0;
        address winner;
        for (uint i = 0; i < game.players.length; i++) {
            if (s_stats[_gameId][game.players[i]].currentScore > winnerScore) {
                winnerScore = s_stats[_gameId][game.players[i]].currentScore;
                winner = game.players[i];
            }
        }
        if (game.plutonsCount > 0) {
            s_assets.sendTokens(
                VAULT_ADDRESS,
                winner,
                game.plutonsCount,
                PLUTON_ID
            );
        }
        if (game.aurorasCount > 0) {
            s_assets.sendTokens(
                VAULT_ADDRESS,
                winner,
                game.aurorasCount,
                AURORA_ID
            );
        }
        if (game.nexosCount > 0) {
            s_assets.sendTokens(
                VAULT_ADDRESS,
                winner,
                game.nexosCount,
                NEXOS_ID
            );
        }
        game.state = GameState.FINISHED;
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
        return s_stats[_gameId][_player];
    }

    function updateGame(uint _gameId, Game memory _game) external {
        s_games[_gameId] = _game;
    }

    function updatePlayerStats(
        uint _gameId,
        address _player,
        PlayerStats memory _playerStats
    ) external {
        s_stats[_gameId][_player] = _playerStats;
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

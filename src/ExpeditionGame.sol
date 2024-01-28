//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {IAssets} from "./IAssets.sol";
import {console} from "forge-std/Test.sol";
import {RrpRequesterV0} from "@api3/airnode-protocol/contracts/rrp/requesters/RrpRequesterV0.sol";

contract ExpeditionGame is RrpRequesterV0 {
    error ExpeditionGame_InvalidNumOfRounds(uint8 numOfRounds);
    error ExpeditionGame_InvalidNumOfPlayers(uint8 numOfPlayers);
    error ExpeditionGame_InvalidMinBetValue(uint32 minBetValue);
    error ExpeditionGame_InvalidMaxRiseValue(uint32 maxRiseValue);
    error ExpeditionGame_InvalidGameID(uint gameID);
    error ExpeditionGame_GameIsFull();
    error ExpeditionGame_GameIsNotFull();
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

    event ExpeditionGame_GameCreated(
        uint gameID,
        uint8 numOfRounds,
        uint8 numOfPlayers,
        uint32 minBetValue,
        uint32 maxRiseValue
    );
    event ExpeditionGame_PlayerJoined(uint gameID, address player);
    event ExpeditionGame_RequestedUint256(bytes32 indexed requestId);
    event ExpeditionGame_ReceivedUint256(
        bytes32 indexed requestId,
        uint256 response
    );
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

    constructor(
        address _assets,
        address _airnodeRrp
    ) RrpRequesterV0(_airnodeRrp) {
        s_assets = IAssets(_assets);
        s_gameCounter = 0;
        VAULT_ADDRESS = _assets;
        owner = msg.sender;
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
    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        airnodeRrp.requestWithdrawal(airnode, sponsorWallet);
    }

    function createGame(
        uint8 _numOfRounds,
        uint8 _numOfPlayers,
        uint32 _entryBet,
        uint32 _maxRiseValue
    ) external {
        if (_numOfRounds < 1 || _numOfRounds > 5)
            revert ExpeditionGame_InvalidNumOfRounds(_numOfRounds);
        if (_numOfPlayers < 2 || _numOfPlayers > 5)
            revert ExpeditionGame_InvalidNumOfPlayers(_numOfPlayers);
        if (_entryBet < 3 || _entryBet > THRESHOLD_BET)
            revert ExpeditionGame_InvalidMinBetValue(_entryBet);
        if (_maxRiseValue < 3 || _maxRiseValue > THRESHOLD_BET)
            revert ExpeditionGame_InvalidMaxRiseValue(_maxRiseValue);
        s_gameCounter++;
        s_games[s_gameCounter] = Game({
            gameID: s_gameCounter,
            potValue: 0,
            state: GameState.CREATED,
            entryBet: _entryBet,
            maxRiseValue: _maxRiseValue,
            numOfRounds: _numOfRounds,
            numOfPlayers: _numOfPlayers,
            currentRound: 0,
            roundCompletedPlayers: 0,
            players: new address[](0),
            roundCompleted: false,
            currentRaise: _entryBet
        });
        emit ExpeditionGame_GameCreated(
            s_gameCounter,
            _numOfRounds,
            _numOfPlayers,
            _entryBet,
            _maxRiseValue
        );
    }

    function joinGame(
        uint _gameId,
        uint32 _plutons,
        uint32 _auroras,
        uint32 _nexos
    ) public {
        Game storage game = s_games[_gameId];
        if (game.state != GameState.CREATED || game.state == GameState.FINISHED)
            revert ExpeditionGame_InvalidGameID(_gameId);
        console.log("game.players.length: %d", game.players.length);
        if (game.players.length == game.numOfPlayers)
            revert ExpeditionGame_GameIsFull();
        bool joined = placeBet(msg.sender, _gameId, _plutons, _auroras, _nexos);
        if (!joined) revert ExpeditionGame_BetPlacementFailed(1);
        game.players.push(msg.sender);
        game.numOfPlayers++;
        game.potValue += game.entryBet;
        s_stats[_gameId][msg.sender] = PlayerStats({
            gameId: _gameId,
            player: msg.sender,
            currentHand: new uint8[](0),
            currentRoll: 0,
            currentScore: 0,
            currentRound: 0,
            totalBet: game.entryBet,
            isFolded: false
        });
        emit ExpeditionGame_PlayerJoined(_gameId, msg.sender);
    }

    function startGame(uint _gameId) public {
        Game storage game = s_games[_gameId];
        if (game.state != GameState.CREATED || game.state == GameState.FINISHED)
            revert ExpeditionGame_InvalidGameID(_gameId);
        if (game.numOfPlayers != game.players.length)
            revert ExpeditionGame_GameIsNotFull();
        game.currentRound = 1;
        game.state = GameState.STARTED;
    }

    function placeBet(
        address player,
        uint _gameId,
        uint32 _plutons,
        uint32 _auroras,
        uint32 _nexos
    ) public returns (bool) {
        Game memory currentGame = s_games[_gameId];
        uint currentBet = currentGame.currentRaise;
        uint totalBet = _plutons *
            PLUTON_COST +
            _auroras *
            AURORA_COST +
            _nexos *
            NEXOS_COST;
        if (totalBet != currentBet) revert ExpeditionGame_BetIsNotMatched(0);
        if (_plutons > 0)
            s_assets.sendTokens(player, VAULT_ADDRESS, _plutons, PLUTON_ID);
        if (_auroras > 0)
            s_assets.sendTokens(player, VAULT_ADDRESS, _auroras, AURORA_ID);
        if (_nexos > 0)
            s_assets.sendTokens(player, VAULT_ADDRESS, _nexos, NEXOS_ID);

        return true;
    }

    function rollDice(uint gameId) public {
        uint length = 5 - s_stats[gameId][msg.sender].currentHand.length;
        Game storage game = s_games[gameId];
        if (game.state != GameState.STARTED || game.state == GameState.FINISHED)
            revert ExpeditionGame_InvalidGameID(gameId);
        PlayerStats storage playerStats = s_stats[gameId][msg.sender];
        if (playerStats.isFolded) revert ExpeditionGame_InvalidGameID(gameId);
        if (playerStats.currentRoll > 3)
            revert ExpeditionGame_RollingDiceFailed();
        if (game.roundCompleted) revert ExpeditionGame_RollingDiceFailed();
        if (playerStats.currentRound != game.currentRound)
            revert ExpeditionGame_RollingDiceFailed();
        if (game.roundCompleted = true)
            revert ExpeditionGame_RollingDiceFailed();
        playerStats.currentRoll++;
        if (playerStats.currentRoll == 3) {
            game.roundCompletedPlayers++;
        }
        bytes32 rollRequestId = getRandomNumbers(length);
        s_rollRequests[rollRequestId][msg.sender] = RollRequest({
            gameId: gameId,
            player: msg.sender,
            requestId: rollRequestId,
            rollResults: new uint[](0)
        });
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
    }

    function fold(uint _gameId) public {
        Game storage game = s_games[_gameId];
        if (game.state != GameState.STARTED || game.state == GameState.FINISHED)
            revert ExpeditionGame_InvalidGameID(_gameId);
        PlayerStats storage playerStats = s_stats[_gameId][msg.sender];
        if (playerStats.isFolded) revert ExpeditionGame_InvalidGameID(_gameId);
        playerStats.isFolded = true;
    }

    function startRound(uint _gameId) public {
        Game storage game = s_games[_gameId];

        if (game.state != GameState.STARTED || game.state == GameState.FINISHED)
            revert ExpeditionGame_InvalidGameID(_gameId);
        if (game.roundCompletedPlayers != game.players.length)
            revert ExpeditionGame_InvalidGameID(_gameId);
        game.currentRound++;
        game.roundCompletedPlayers = 0;
        game.roundCompleted = false;
    }

    function endRound() public {}

    function raiseBet(uint _gameId, uint32 _raiseValue) public {
        Game storage game = s_games[_gameId];
        if (game.state != GameState.STARTED || game.state == GameState.FINISHED)
            revert ExpeditionGame_InvalidGameID(_gameId);
        if (game.roundCompletedPlayers != game.players.length)
            revert ExpeditionGame_InvalidGameID(_gameId);
        if (!game.roundCompleted) revert ExpeditionGame_InvalidGameID(_gameId);
        if (_raiseValue > game.maxRiseValue)
            revert ExpeditionGame_InvalidGameID(_gameId);
        game.currentRaise += _raiseValue;
    }

    function getGame(uint _gameId) public view returns (Game memory) {
        return s_games[_gameId];
    }

    function getCurrentGameCounter() public view returns (uint) {
        return s_gameCounter;
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

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IAssets} from "./IAssets.sol";
import {console} from "forge-std/Test.sol";

contract ExpeditionGame {
    error ExpeditionGame_InvalidNumOfRounds(uint8 numOfRounds);
    error ExpeditionGame_InvalidNumOfPlayers(uint8 numOfPlayers);
    error ExpeditionGame_InvalidMinBetValue(uint32 minBetValue);
    error ExpeditionGame_InvalidMaxRiseValue(uint32 maxRiseValue);
    error ExpeditionGame_InvalidGameID(uint gameID);
    error ExpeditionGame_GameIsFull();
    error ExpeditionGame_BetIsNotMatched(uint8 tokenID);
    error ExpeditionGame_BetPlacementFailed(uint8 roundNo);

    enum GameState{
        CREATED,
        STARTED,
        FINISHED
    }


    struct Game{
        uint gameID;
        uint potValue;
        GameState state;
        uint32 entryBet;
        uint32 maxRiseValue;
        uint8 numOfRounds;
        uint8 numOfPlayers;
        uint8 currentRound;
        uint8 currentPlayerIndex;
        address[] players;
        uint32 currentRaise;
    }

    uint8 public constant PLUTON_COST = 10;
    uint8 public constant AURORA_COST = 5;
    uint8 public constant NEXOS_COST = 2;
    uint16 public constant THRESHOLD_BET = 500;
    uint8 public constant VELAR_ID = 0;
    address public immutable VAULT_ADDRESS;
    uint private s_gameCounter;
    IAssets private s_assets;

    mapping(uint => Game) private s_games;

    event ExpeditionGame_GameCreated(uint gameID, uint8 numOfRounds, uint8 numOfPlayers, uint32 minBetValue, uint32 maxRiseValue);
    event ExpeditionGame_PlayerJoined(uint gameID, address player);

    constructor(address _assets){
        s_assets = IAssets(_assets);
        s_gameCounter = 0;
        VAULT_ADDRESS = _assets;
    }

    function createGame(uint8 _numOfRounds, uint8 _numOfPlayers,uint32 _entryBet, uint32 _maxRiseValue) external {
        if(_numOfRounds < 1 || _numOfRounds > 5) revert ExpeditionGame_InvalidNumOfRounds(_numOfRounds);
        if(_numOfPlayers < 2 || _numOfPlayers > 5) revert ExpeditionGame_InvalidNumOfPlayers(_numOfPlayers);
        if(_entryBet < 3 || _entryBet > THRESHOLD_BET) revert ExpeditionGame_InvalidMinBetValue(_entryBet);
        if(_maxRiseValue < 3 || _maxRiseValue > THRESHOLD_BET) revert ExpeditionGame_InvalidMaxRiseValue(_maxRiseValue);
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
            currentPlayerIndex: 0,
            players: new address[](0),
            currentRaise: _entryBet
        });
        emit ExpeditionGame_GameCreated(s_gameCounter, _numOfRounds, _numOfPlayers, _entryBet, _maxRiseValue);
    }

    function joinGame(uint _gameId,uint32 _plutons, uint32 _auroras, uint32 _nexos) public{
        Game storage game = s_games[_gameId];
        if(game.state != GameState.CREATED || game.state == GameState.FINISHED) revert ExpeditionGame_InvalidGameID(_gameId);
        console.log("game.players.length: %d", game.players.length);
        if(game.players.length == game.numOfPlayers) revert ExpeditionGame_GameIsFull();
        bool joined=placeBet(_gameId,_plutons,_auroras,_nexos);
        if(!joined) revert ExpeditionGame_BetPlacementFailed(1);
        game.players.push(msg.sender);
        if(game.players.length == game.numOfPlayers){
            game.state = GameState.STARTED;
        }
        game.potValue += game.entryBet;
        emit ExpeditionGame_PlayerJoined(_gameId, msg.sender);
    }

    function placeBet(uint _gameId, uint32 _plutons, uint32 _auroras, uint32 _nexos)public returns(bool){
        Game memory currentGame = s_games[_gameId];
        uint currentBet = currentGame.currentRaise;
        uint totalBet = _plutons*PLUTON_COST + _auroras*AURORA_COST + _nexos*NEXOS_COST;
        if(totalBet != currentBet) revert ExpeditionGame_BetIsNotMatched(0);
        s_assets.sendTokens(VAULT_ADDRESS, _plutons, 1);
        return true;
    }

    function getGame(uint _gameId) public view returns(Game memory){
        return s_games[_gameId];
    }

    function getCurrentGameCounter() public view returns(uint){
        return s_gameCounter;
    }
}

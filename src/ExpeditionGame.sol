//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IAssets} from "./IAssets.sol";

contract ExpeditionGame {
    error ExpeditionGame_InvalidNumOfRounds(uint8 numOfRounds);
    error ExpeditionGame_InvalidNumOfPlayers(uint8 numOfPlayers);
    error ExpeditionGame_InvalidMinBetValue(uint8 minBetValue);
    error ExpeditionGame_InvalidMaxRiseValue(uint8 maxRiseValue);
    error ExpeditionGame_InvalidGameID(uint gameID);
    error ExpeditionGame_GameIsFull();
    error ExpeditionGame_NotEnoughTokens(uint8 tokenID);

    enum GameState{
        CREATED,
        STARTED,
        FINISHED
    }


    struct Game{
        uint gameID;
        GameState state;
        uint8 numOfRounds;
        uint8 numOfPlayers;
        uint8 entryBet;
        uint8 maxRiseValue;
        uint8 currentRound;
        uint8 currentPLayerIndex;
        uint8 potValue;
        address[] players;
        uint8 currentRaise;
    }

    uint16 public constant THRESHOLD_BET = 500;
    uint8 public constant VELAR_ID = 0;
    uint private s_gameCounter;
    IAssets private s_assets;

    mapping(uint => Game) private s_games;

    event ExpeditionGame_GameCreated(uint gameID, uint8 numOfRounds, uint8 numOfPlayers, uint8 minBetValue, uint8 maxRiseValue);
    event ExpeditionGame_PlayerJoined(uint gameID, address player);

    constructor(address _assets){
        s_assets = IAssets(_assets);
        s_gameCounter = 0;
    }

    function createGame(uint8 _numOfRounds, uint8 _numOfPlayers,uint8 _entryBet, uint8 _maxRiseValue) external {
        if(_numOfRounds < 1 || _numOfRounds > 5) revert ExpeditionGame_InvalidNumOfRounds(_numOfRounds);
        if(_numOfPlayers < 2 || _numOfPlayers > 5) revert ExpeditionGame_InvalidNumOfPlayers(_numOfPlayers);
        if(_entryBet < 3 || _entryBet > THRESHOLD_BET) revert ExpeditionGame_InvalidMinBetValue(_entryBet);
        if(_maxRiseValue < 3 || _maxRiseValue > THRESHOLD_BET) revert ExpeditionGame_InvalidMaxRiseValue(_maxRiseValue);
        s_gameCounter++;
        s_games[s_gameCounter] = Game({
            gameID: s_gameCounter,
            state: GameState.CREATED,
            numOfRounds: _numOfRounds,
            numOfPlayers: _numOfPlayers,
            entryBet: _entryBet,
            maxRiseValue: _maxRiseValue,
            currentRound: 0,
            currentPLayerIndex: 0,
            potValue: 0,
            players: new address[](_numOfPlayers),
            currentRaise: 0
        });
        emit ExpeditionGame_GameCreated(s_gameCounter, _numOfRounds, _numOfPlayers, _entryBet, _maxRiseValue);
    }

    function joinGame(uint _gameId) public{
        Game storage game = s_games[_gameId];
        if(game.state != GameState.CREATED || game.state == GameState.FINISHED) revert ExpeditionGame_InvalidGameID(_gameId);
        if(game.players.length == game.numOfPlayers) revert ExpeditionGame_GameIsFull();
        if(s_assets.getBalance(msg.sender,VELAR_ID)< game.entryBet) revert ExpeditionGame_NotEnoughTokens(VELAR_ID);
        s_assets.sendTokens(address(this), game.entryBet, VELAR_ID);
        game.players.push(msg.sender);
        if(game.players.length == game.numOfPlayers){
            game.state = GameState.STARTED;
        }
        game.potValue += game.entryBet;
        emit ExpeditionGame_PlayerJoined(_gameId, msg.sender);
    }
}

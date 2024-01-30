//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {DeployExpeditionGameManager} from "../../../script/Deployments/DeployEModeManager.s.sol";
import {ExpeditionGameManager} from "../../../src/ExpeditionGame/ExpeditionGameManager.sol";
import {IExpeditionGame} from "../../../src/ExpeditionGame/IExpeditionGame.sol";
import {DeployAssets} from "../../../script/Deployments/DeployAssets.s.sol";
import {ExpeditionGame} from "../../../src/ExpeditionGame/ExpeditionGame.sol";
import {Assets} from "../../../src/Assets.sol";
import {Test, console} from "forge-std/Test.sol";

contract EModeTest is Test {
    DeployExpeditionGameManager deployer;
    ExpeditionGameManager expeditionGameManager;
    ExpeditionGame expeditionGame;
    Assets assets;
    uint8 public constant PLUTON_COST = 10;
    uint8 public constant AURORA_COST = 5;
    uint8 public constant NEXOS_COST = 2;
    uint16 public constant THRESHOLD_BET = 500;
    uint8 public constant PLUTON_ID = 1;
    uint8 public constant AURORA_ID = 2;
    uint8 public constant NEXOS_ID = 3;
    uint8 public constant VELAR_ID = 0;
    address PLAYER_1 = address(0x1);
    address PLAYER_2 = address(0x2);
    address PLAYER_3 = address(0x3);

    function setUp() public {
        deployer = new DeployExpeditionGameManager();
        address EGame;
        (expeditionGameManager, EGame) = deployer.run();
        expeditionGame = ExpeditionGame(payable(EGame));
        assets = Assets(expeditionGameManager.VAULT_ADDRESS());
        vm.prank(PLAYER_1);
        assets.fundVelar();
        vm.prank(PLAYER_1);
        assets.fundVelar();
        vm.prank(PLAYER_2);
        assets.fundVelar();
        vm.prank(PLAYER_2);
        assets.fundVelar();
        assets.mintTokens(PLAYER_2, PLUTON_ID, 10);
        assets.mintTokens(PLAYER_2, AURORA_ID, 10);
        assets.mintTokens(PLAYER_2, NEXOS_ID, 10);
        assets.mintTokens(PLAYER_1, PLUTON_ID, 10);
        assets.mintTokens(PLAYER_1, AURORA_ID, 10);
        assets.mintTokens(PLAYER_1, NEXOS_ID, 10);
    }

    function test_getGame() public {
        IExpeditionGame.Game memory game = expeditionGameManager.getGame(0);
        assertEq(game.gameID, 0);
        assertEq(game.numOfPlayers, 0);
        assertEq(game.entryBet, 0);
        assertEq(game.players.length, 0);
    }

    function test_createGame() public {
        expeditionGameManager.createGame(2, 10, 20);
        IExpeditionGame.Game memory game = expeditionGameManager.getGame(1);
        assertEq(game.gameID, 1);
        assertEq(game.numOfPlayers, 2);
        assertEq(game.entryBet, 10);
    }

    function test_joinGame() public {
        expeditionGameManager.createGame(2, 10, 20);
        vm.prank(PLAYER_1);
        console.log(PLAYER_1);
        console.log(address(assets));
        expeditionGameManager.joinGame(1, 0, 2, 0);
        IExpeditionGame.Game memory game = expeditionGameManager.getGame(1);
        assertEq(game.gameID, 1);
        assertEq(game.entryBet, 10);
        assertEq(game.players.length, game.numOfPlayers);
        assertEq(game.players[0], PLAYER_1);
        assertEq(game.vacancy, game.numOfPlayers - 1);
        assertEq(game.potValue, 10);
        vm.stopPrank();
    }

    function test_joinGameCreatesNewPlayerStats() public {
        vm.startPrank(PLAYER_1);
        expeditionGameManager.createGame(2, 10, 20);
        expeditionGameManager.joinGame(1, 0, 2, 0);
        IExpeditionGame.PlayerStats memory playerStats = expeditionGameManager
            .getPLayerStats(1, PLAYER_1);
        assertEq(playerStats.player, PLAYER_1);
    }

    function test_startGame() public {
        vm.prank(PLAYER_1);
        expeditionGameManager.createGame(2, 10, 20);
        vm.prank(PLAYER_2);
        expeditionGameManager.joinGame(1, 0, 2, 0);
        vm.startPrank(PLAYER_1);
        expeditionGameManager.joinGame(1, 1, 0, 0);
        expeditionGameManager.startGame(1);
        vm.stopPrank();
        IExpeditionGame.Game memory game = expeditionGameManager.getGame(1);
        assertEq(game.potValue, 20);
    }

    function test_rollDice() public {
        vm.prank(PLAYER_1);
        expeditionGameManager.createGame(2, 10, 20);
        vm.prank(PLAYER_2);
        expeditionGameManager.joinGame(1, 0, 2, 0);
        IExpeditionGame.Game memory game = expeditionGameManager.getGame(1);
        console.log(game.vacancy);
        vm.startPrank(PLAYER_1);
        expeditionGameManager.joinGame(1, 1, 0, 0);
        expeditionGameManager.startGame(1);
        expeditionGame.rollDice(1);
        vm.stopPrank();
        IExpeditionGame.PlayerStats memory playerStats = expeditionGameManager
            .getPLayerStats(1, PLAYER_1);
        assertEq(playerStats.currentRoll, 0);
    }

    function test_saveDice() public {
        vm.prank(PLAYER_1);
        expeditionGameManager.createGame(2, 10, 20);
        vm.prank(PLAYER_2);
        expeditionGameManager.joinGame(1, 0, 2, 0);
        IExpeditionGame.Game memory game = expeditionGameManager.getGame(1);
        console.log(game.vacancy);
        vm.startPrank(PLAYER_1);
        expeditionGameManager.joinGame(1, 1, 0, 0);
        expeditionGameManager.startGame(1);
        expeditionGame.rollDice(1);
        uint[] memory hand = expeditionGame.getDiceResults(1);
        expeditionGame.saveRoll(1, "", hand);
        expeditionGame.rollDice(1);
        hand = expeditionGame.getDiceResults(3);
        expeditionGame.saveRoll(1, "", hand);
        expeditionGame.rollDice(1);
        hand = expeditionGame.getDiceResults(1);
        expeditionGame.saveRoll(1, "", hand);
        vm.stopPrank();
        IExpeditionGame.PlayerStats memory playerStats = expeditionGameManager
            .getPLayerStats(1, PLAYER_1);
        assertEq(playerStats.currentHand[0], 0);
    }

    function test_score() public {
        vm.prank(PLAYER_1);
        expeditionGameManager.createGame(2, 10, 20);
        vm.prank(PLAYER_2);
        expeditionGameManager.joinGame(1, 0, 2, 0);
        IExpeditionGame.Game memory game = expeditionGameManager.getGame(1);
        console.log(game.vacancy);
        vm.startPrank(PLAYER_1);
        expeditionGameManager.joinGame(1, 1, 0, 0);
        expeditionGameManager.startGame(1);
        expeditionGame.rollDice(1);
        uint[] memory hand = expeditionGame.getDiceResults(1);
        expeditionGame.saveRoll(1, "", hand);
        expeditionGame.rollDice(1);
        hand = expeditionGame.getDiceResults(3);
        expeditionGame.saveRoll(1, "", hand);
        expeditionGame.rollDice(1);
        hand = expeditionGame.getDiceResults(1);
        expeditionGame.saveRoll(1, "", hand);
        vm.stopPrank();
        IExpeditionGame.PlayerStats memory playerStats = expeditionGameManager
            .getPLayerStats(1, PLAYER_1);
        assertEq(playerStats.currentScore, 15);
    }
}

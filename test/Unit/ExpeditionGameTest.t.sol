//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IAssets} from "../../src/IAssets.sol";
import {ExpeditionGame} from "../../src/ExpeditionGame.sol";
import {DeployExpeditionGame} from "../../script/Deployments/DeployExpeditionGame.s.sol";
import {Assets} from "../../src/Assets.sol";
import {DeployAssets} from "../../script/Deployments/DeployAssets.s.sol";
import {Test, console} from "forge-std/Test.sol";

contract ExpeditionGameTest is Test {
    IAssets assets;
    ExpeditionGame game;
    Assets assetContract;
    address PLAYER1 = address(1);
    address PLAYER2 = address(2);
    address PLAYER3 = address(3);
    address PLAYER4 = address(4);
    address PLAYER5 = address(5);

    function setUp() public {
        DeployAssets assetDeployer = new DeployAssets();
        assetContract = assetDeployer.run();
        vm.prank(PLAYER2);
        assetContract.fundVelar();
        DeployExpeditionGame gameDeployer = new DeployExpeditionGame();
        game = gameDeployer.run();
    }

    function testCreateExpeditionGameIncreasesCounterBy1() public {
        uint oldcounter = game.getCurrentGameCounter();
        game.createGame(3, 4, 10, 20);
        uint newCounter = game.getCurrentGameCounter();
        assertEq(oldcounter + 1, newCounter);
    }

    function testCreateExpedtionGameCreatesNewGameMapping() public {
        game.createGame(3, 4, 10, 20);
        ExpeditionGame.Game memory newGame = game.getGame(1);
        assert(newGame.gameID == game.getCurrentGameCounter());
        assert(newGame.state == ExpeditionGame.GameState.CREATED);
        assert(newGame.numOfRounds == 3);
        assert(newGame.numOfPlayers == 4);
        assert(newGame.entryBet == 10);
        assert(newGame.maxRiseValue == 20);
    }

    function testJoinGameAddsPlayerToGame() public {
        vm.prank(PLAYER1);
        game.createGame(3, 4, 10, 20);
        vm.startPrank(PLAYER2);
        assetContract.fundVelar();
        console.log("Player 2 balance: ", assetContract.balanceOf(PLAYER2, 0));
        assetContract.mintTokens(2, 10);
        game.joinGame(1, 0, 2, 0);
        console.log(game.getGame(1).potValue);
        assertEq(game.getGame(1).players.length, 1);
        assertEq(game.getGame(1).players[0], PLAYER2);
        vm.stopPrank();
    }
}

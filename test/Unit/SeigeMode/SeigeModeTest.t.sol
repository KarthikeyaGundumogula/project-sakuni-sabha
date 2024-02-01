//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test, console} from "forge-std/Test.sol";
import {Assets} from "../../../src/Assets.sol";
import {SeigeGame} from "../../../src/SeigeMode/SeigeGame.sol";
import {SeigeGameManager} from "../../../src/SeigeMode/SeigeGameManager.sol";
import {DeploySModeManager} from "../../../script/Deployments/DeploySModeManager.s.sol";

contract SModeTest is Test {
    SeigeGameManager t_smodeManager;
    SeigeGame t_sGame;
    Assets t_assets;

    address PLAYER_1 = address(0x1);
    address PLAYER_2 = address(0x2);

    function setUp() public {
        DeploySModeManager deployer = new DeploySModeManager();
        address assets;
        address sGame;
        (t_smodeManager, sGame, assets) = deployer.run();
        t_sGame = SeigeGame(payable(sGame));
        t_assets = Assets(assets);
    }

    function getTokens() public {
        vm.startPrank(PLAYER_1);
        t_assets.fundVelar();
        t_assets.fundVelar();
        t_assets.mintTokens(PLAYER_1, t_assets.PLUTON_ID(), 100);
        t_assets.mintTokens(PLAYER_1, t_assets.AURORA_ID(), 100);
        t_assets.mintTokens(PLAYER_1, t_assets.NEXOS_ID(), 100);
        vm.stopPrank();
        vm.startPrank(PLAYER_2);
        t_assets.fundVelar();
        t_assets.fundVelar();
        t_assets.mintTokens(PLAYER_2, t_assets.PLUTON_ID(), 100);
        t_assets.mintTokens(PLAYER_2, t_assets.AURORA_ID(), 100);
        t_assets.mintTokens(PLAYER_2, t_assets.NEXOS_ID(), 100);
        vm.stopPrank();
    }

    function test_sModeDeployment() public {
        assertEq(address(t_assets), t_sGame.VAULT_ADDRESS());
    }

    function test_createGame() public {
        getTokens();
        vm.startPrank(PLAYER_1);
        t_smodeManager.createGame(2, 10, 100);
        vm.stopPrank();
        assertEq(t_sGame.s_gameCounter(), 1);
        SeigeGame.Game memory game = t_sGame.getGame(1);
        assertEq(game.gameID, 1);
        assertEq(game.numOfPlayers, 2);
        assertEq(game.entryBet, 10);
        assertEq(game.maxRise, 100);
        assertEq(game.currentRise, 0);
    }

    function test_joinGame() public {
        getTokens();
        vm.startPrank(PLAYER_1);
        t_smodeManager.createGame(2, 10, 100);
        uint8[] memory tokens = new uint8[](10);
        for (uint8 i = 0; i < 10; i++) {
            tokens[0] = 1;
        }
        t_smodeManager.joinGame(1, tokens);
        vm.stopPrank();
        SeigeGame.Game memory game = t_sGame.getGame(1);
        assertEq(game.potValue, 10);
        assertEq(game.vacancy, 1);
    }

    function test_startGame() public {
        getTokens();
        vm.startPrank(PLAYER_1);
        t_smodeManager.createGame(2, 10, 100);
        uint8[] memory tokens = new uint8[](10);
        for (uint8 i = 0; i < 10; i++) {
            tokens[0] = 1;
        }
        t_smodeManager.joinGame(1, tokens);
        vm.stopPrank();
        vm.startPrank(PLAYER_2);
        t_smodeManager.joinGame(1, tokens);
        vm.stopPrank();
        SeigeGame.Game memory game = t_sGame.getGame(1);
        assertEq(abi.encodePacked(game.players[0]), abi.encodePacked(PLAYER_1));
        assertEq(abi.encodePacked(game.players[1]), abi.encodePacked(PLAYER_2));
        assert(uint8(game.state) == uint(SeigeGame.GameState.STARTED));
    }

    function test_rollDice() public {
        getTokens();
        vm.startPrank(PLAYER_1);
        t_smodeManager.createGame(2, 10, 100);
        uint8[] memory tokens = new uint8[](10);
        for (uint8 i = 0; i < 10; i++) {
            tokens[0] = 1;
        }
        t_smodeManager.joinGame(1, tokens);
        vm.stopPrank();
        vm.startPrank(PLAYER_2);
        t_smodeManager.joinGame(1, tokens);
        t_sGame.rollDice(1);
        bytes32 reqId = t_sGame
            .getRollRequests(PLAYER_2, bytes32("1u"))
            .requestId;
        assertEq(reqId, bytes32("1u"));
        vm.stopPrank();
    }

    function test_getDiceResults() public {
        getTokens();
        vm.startPrank(PLAYER_1);
        t_smodeManager.createGame(2, 10, 100);
        uint8[] memory tokens = new uint8[](10);
        for (uint8 i = 0; i < 10; i++) {
            tokens[0] = 1;
        }
        t_smodeManager.joinGame(1, tokens);
        vm.stopPrank();
        vm.startPrank(PLAYER_2);
        t_smodeManager.joinGame(1, tokens);
        t_sGame.rollDice(1);
        uint8[] memory arr = t_sGame.getDiceResults(5);
        uint8[] memory res = t_sGame
            .getRollRequests(PLAYER_2, bytes32("1u"))
            .rollResults;
        assertEq(arr[0], res[0]);
        vm.stopPrank();
    }

    function test_saveDice() public {
        getTokens();
        vm.startPrank(PLAYER_1);
        t_smodeManager.createGame(2, 10, 100);
        uint8[] memory tokens = new uint8[](10);
        for (uint8 i = 0; i < 10; i++) {
            tokens[0] = 1;
        }
        t_smodeManager.joinGame(1, tokens);
        vm.stopPrank();
        vm.startPrank(PLAYER_2);
        t_smodeManager.joinGame(1, tokens);
        t_sGame.rollDice(1);
        uint8[] memory arr = t_sGame.getDiceResults(5);
        uint8[] memory selectedHand = new uint8[](2);
        selectedHand[0] = arr[0];
        selectedHand[1] = arr[1];
        t_sGame.saveDice(1, selectedHand);
        uint8[] memory resHand = t_sGame.getPLayerStats(1, PLAYER_2).currentHand;
        assertEq(resHand[0], selectedHand[0]);
        vm.stopPrank();
    }
}

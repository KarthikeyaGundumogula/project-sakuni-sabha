//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Assets} from "../../src/Assets.sol";
import {Test, console} from "forge-std/Test.sol";
import {DeployAssets} from "../../script/Deployments/DeployAssets.s.sol";

contract AssetsTest is Test {
    uint8 public constant VELAR_ID = 0;
    //Tokens
    uint8 public constant PLUTON_ID = 1;
    uint8 public constant AURORA_ID = 2;
    uint8 public constant NEXOS_ID = 3;
    //Assets
    uint8 public constant IMPERIAL_APEX_ID = 4;
    uint8 public constant CITADEL_ID = 5;
    uint8 public constant GRANDEUR_ID = 6;
    uint8 public constant FORTRESS_ID = 7;
    uint8 public constant CASTLE_ID = 8;
    uint8 public constant STRONGHOLD_ID = 9;
    uint8 public constant BASTION_ID = 10;
    //COSTS
    uint32 public constant IMPERIAL_APEX_COST = 100000;
    uint32 public constant CITADEL_COST = 75000;
    uint32 public constant GRANDEUR_COST = 50000;
    uint16 public constant FORTRESS_COST = 30000;
    uint16 public constant CASTLE_COST = 20000;
    uint16 public constant STRONGHOLD_COST = 10000;
    uint16 public constant BASTION_COST = 7500;
    uint8 public constant PLUTON_COST = 10;
    uint8 public constant AURORA_COST = 5;
    uint8 public constant NEXOS_COST = 2;
    uint8 public constant VELAR_FUND_AMOUNT = 100;
    Assets assets;
    address USER = address(0x1);

    function setUp() public {
        DeployAssets deployer = new DeployAssets();
        assets = deployer.run();
    }

    function testURIs() public {
        assertEq(assets.uri(IMPERIAL_APEX_ID), "Imperial_Apex");
        assertEq(assets.uri(CITADEL_ID), "Citadel");
        assertEq(assets.uri(GRANDEUR_ID), "Grandeur");
        assertEq(assets.uri(FORTRESS_ID), "Fortress");
        assertEq(assets.uri(CASTLE_ID), "Castle");
        assertEq(assets.uri(STRONGHOLD_ID), "Stronghold");
        assertEq(assets.uri(BASTION_ID), "Bastion");
    }

    function testFundVelar() public {
        vm.prank(USER);
        assets.fundVelar();
        assertEq(assets.balanceOf(USER, VELAR_ID), VELAR_FUND_AMOUNT);
    }

    function testFundTokensSendsTokensToUser() public {
        uint8 fundAmount = 20;
        vm.startPrank(USER);
        assets.fundVelar();
        assets.mintTokens(NEXOS_ID, fundAmount);
        assertEq(assets.balanceOf(USER, NEXOS_ID), fundAmount);
        vm.stopPrank();
    }

    function testFundTokensSendsVelarsToTheContract() public {
        uint8 fundAmount = 20;
        vm.startPrank(USER);
        assets.fundVelar();
        assets.mintTokens(NEXOS_ID, fundAmount);
        assertEq(
            assets.balanceOf(address(assets), VELAR_ID),
            fundAmount * NEXOS_COST
        );
        vm.stopPrank();
    }

    function testFundTokensDeductsVelarsFromUser() public {
        uint8 fundAmount = 20;
        vm.startPrank(USER);
        assets.fundVelar();
        assets.mintTokens(NEXOS_ID, fundAmount);
        assertEq(
            assets.balanceOf(USER, VELAR_ID),
            VELAR_FUND_AMOUNT - (fundAmount * NEXOS_COST)
        );
        vm.stopPrank();
    }

    function testFundTokensRevertsIfUserDoesNotHaveEnoughVelars() public {
        uint8 fundAmount = 200;
        vm.startPrank(USER);
        assets.fundVelar();
        vm.expectRevert();
        assets.mintTokens(NEXOS_ID, fundAmount);
        vm.stopPrank();
    }

    function testSendTokensToTheContract() public {
        vm.startPrank(USER);
        assets.fundVelar();
        assets.sendTokens(USER, address(assets), 10, VELAR_ID);
        assertEq(assets.balanceOf(address(assets), VELAR_ID), 10);
    }
}

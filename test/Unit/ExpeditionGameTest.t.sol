//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IAssets} from "../../src/IAssets.sol";
import {ExpeditionGame} from "../../src/ExpeditionGame.sol";
import {Assets} from "../../src/Assets.sol";
import {DeployAssets} from "../../script/Deployments/DeployAssets.s.sol";
import {Test,console} from "forge-std/Test.sol";

contract ExpeditionGameTest is Test{

    IAssets assets;
    ExpeditionGame game;
    Assets assetContract;

    function setUp() public {
        DeployAssets deployer = new DeployAssets();
        assetContract = deployer.run();
        game = new ExpeditionGame(address(assetContract));
        assets = IAssets(address(assetContract));
    }
}
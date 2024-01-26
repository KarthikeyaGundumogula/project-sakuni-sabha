//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IAssets} from "../../src/IAssets.sol";
import {ExpeditionGame} from "../../src/ExpeditionGame.sol";
import {Assets} from "../../src/Assets.sol";
import {Test,console} from "forge-std/Test.sol";

contract ExpeditionGameTest is Test{

    IAssets assets;
    ExpeditionGame game;
    Assets assetContract;

    function setUp() public {
        vm.startBroadcast();
        assetContract = new Assets(
            "Imperial_Apex",
            "Citadel",
            "Grandeur_URI",
            "Fortress_URI",
            
        );

    }
}
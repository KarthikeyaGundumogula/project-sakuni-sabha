//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {Assets} from "../../src/Assets.sol";

contract DeployAssets is Script {
    Assets assets;
    function run() external returns(Assets){
        assets = new Assets(
            "Imperial_Apex",
            "Citadel",
            "Grandeur",
            "Fortress",
            "Castle",
            "Stronghold",
            "Bastion"
        );

        return assets;
    }
}
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {ExpeditionGame} from "../../src/ExpeditionGame/ExpeditionGame.sol";
import {DeployAssets} from "./DeployAssets.s.sol";
import {Assets} from "../../src/Assets.sol";

contract DeployExpeditionGame is Script {
    ExpeditionGame expeditionGame;
    address AIRNODE_RRP = address(0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd);

    function run() external returns (ExpeditionGame) {
        DeployAssets assetDeployer = new DeployAssets();
        Assets assets = assetDeployer.run();
        expeditionGame = new ExpeditionGame(address(assets));
        return expeditionGame;
    }
}

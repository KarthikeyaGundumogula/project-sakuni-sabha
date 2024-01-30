//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {DeployExpeditionGame} from "./DeployExpeditionGame.s.sol";
import {ExpeditionGameManager} from "../../src/ExpeditionGame/ExpeditionGameManager.sol";
import {DeployAssets} from "./DeployAssets.s.sol";
import {ExpeditionGame} from "../../src/ExpeditionGame/ExpeditionGame.sol";
import {Assets} from "../../src/Assets.sol";

contract DeployExpeditionGameManager is Script {
    ExpeditionGameManager expeditionGameManager;
    address AIRNODE_RRP = address(0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd);

    function run() external returns (ExpeditionGameManager,address) {
        vm.startBroadcast();
        DeployExpeditionGame expeditionGameDeployer = new DeployExpeditionGame();
        ExpeditionGame expeditionGame = expeditionGameDeployer.run();
        DeployAssets assetDeployer = new DeployAssets();
        Assets assets = assetDeployer.run();
        expeditionGameManager = new ExpeditionGameManager(
            address(expeditionGame),
            address(assets)
        );
        vm.stopBroadcast();
        return (expeditionGameManager, address(expeditionGame));
    }
}

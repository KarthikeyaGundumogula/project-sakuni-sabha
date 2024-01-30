//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {ExpeditionGame} from "../../src/ExpeditionGame/ExpeditionGame.sol";
import {DeployExpeditionGame} from "../Deployments/DeployExpeditionGame.s.sol";

contract EModeInteractions is Script {
    ExpeditionGame expeditionGame;

    function run() external {
        DeployExpeditionGame expeditionGameDeployer = new DeployExpeditionGame();
        expeditionGame = expeditionGameDeployer.run();
    }
}

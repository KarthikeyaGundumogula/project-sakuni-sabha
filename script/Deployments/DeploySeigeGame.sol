// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;

import {SeigeGame} from "../../src/SeigeMode/SeigeGame.sol";
import {DeployAssets} from "./DeployAssets.s.sol";
import {Assets} from "../../src/Assets.sol";
import {Script} from "forge-std/Script.sol";

contract DeploySeigeGame is Script {
    SeigeGame public seigeGame;

    function run() external returns (SeigeGame,address) {
        DeployAssets deployAssets = new DeployAssets();
        Assets assets = deployAssets.run();

        seigeGame = new SeigeGame(address(assets));
        return (seigeGame,address(assets));
    }
}

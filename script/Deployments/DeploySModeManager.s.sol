//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {DeploySeigeGame} from "./DeploySeigeGame.sol";
import {Script} from "forge-std/Script.sol";
import {SeigeGame} from "../../src/SeigeMode/SeigeGame.sol";
import {SeigeGameManager} from "../../src/SeigeMode/SeigeGameManager.sol";

contract DeploySModeManager is Script {
  SeigeGameManager smodeManager;
  SeigeGame seigeMode;
  function run() external returns(SeigeGameManager,address sMode,address assets){
    DeploySeigeGame deployer = new DeploySeigeGame();
    (seigeMode,assets) = deployer.run();
    smodeManager = new SeigeGameManager(address(seigeMode),assets);
    return (smodeManager,address(seigeMode),assets);
  }
}
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {Assets} from "../../src/Assets.sol";
import {DeployAssets} from "../Deployments/DeployAssets.s.sol";

contract AssetInteractions is Script{
    Assets assets;
    
    function run() external {
        DeployAssets assetDeployer = new DeployAssets();
        assets = assetDeployer.run();
    }

    function mintPlutons() public {
      assets.mintTokens(1,100);
    }
    function mintAuroras() public {
      assets.mintTokens(2,100);
    }
    function mintNexos() public {
      assets.mintTokens(3,100);
    }
    function mintImperialApex() public {
      assets.mintTokens(4,100);
    }
    function mintCitadel() public {
      assets.mintTokens(5,100);
    }
    function mintGrandeur() public {
      assets.mintTokens(6,100);
    }
    function mintFortress() public {
      assets.mintTokens(7,100);
    }
    function mintCastle() public {
      assets.mintTokens(8,100);
    }
    function mintStronghold() public {
      assets.mintTokens(9,100);
    }
    function mintBastion() public {
      assets.mintTokens(10,100);
    }
}
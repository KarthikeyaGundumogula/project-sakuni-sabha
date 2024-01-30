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

    function getPlutons(address _sender) public {
        assets.mintTokens(_sender, 1, 100);
    }

    function getAuroras(address _sender) public {
        assets.mintTokens(_sender, 2, 100);
    }

    function getNexos(address _sender) public {
        assets.mintTokens(_sender, 3, 100);
    }

    function getImperialApex(address _sender) public {
        assets.mintTokens(_sender, 4, 100);
    }

    function getCitadel(address _sender) public {
        assets.mintTokens(_sender, 5, 100);
    }

    function getGrandeur(address _sender) public {
        assets.mintTokens(_sender, 6, 100);
    }

    function getFortress(address _sender) public {
        assets.mintTokens(_sender, 7, 100);
    }

    function getCastle(address _sender) public {
        assets.mintTokens(_sender, 8, 100);
    }

    function getStronghold(address _sender) public {
        assets.mintTokens(_sender, 9, 100);
    }

    function getBastion(address _sender) public {
        assets.mintTokens(_sender, 10, 100);
    }
}
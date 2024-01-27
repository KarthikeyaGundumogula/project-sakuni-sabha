//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import {console} from "forge-std/Test.sol";

contract Assets is ERC1155URIStorage, ERC1155Holder {
    error Assets_InvalidTokenID(uint8 tokenID);
    error Assets_NotEnoughTokens(uint8 tokenID);

    uint8 public constant VELAR_ID = 0;
    //Tokens
    uint8 public constant PLUTON_ID = 1;
    uint8 public constant AURORA_ID = 2;
    uint8 public constant NEXOS_ID = 3;
    //Assets
    uint8 public constant IMPERIAL_APEX_ID = 4;
    uint8 public constant CITADEL_ID = 5;
    uint8 public constant GRANDEUR_ID = 6;
    uint8 public constant FORTRESS_ID = 7;
    uint8 public constant CASTLE_ID = 8;
    uint8 public constant STRONGHOLD_ID = 9;
    uint8 public constant BASTION_ID = 10;
    //COSTS
    uint32 public constant IMPERIAL_APEX_COST = 100000;
    uint32 public constant CITADEL_COST = 75000;
    uint32 public constant GRANDEUR_COST = 50000;
    uint16 public constant FORTRESS_COST = 30000;
    uint16 public constant CASTLE_COST = 20000;
    uint16 public constant STRONGHOLD_COST = 10000;
    uint16 public constant BASTION_COST = 7500;
    uint8 public constant PLUTON_COST = 10;
    uint8 public constant AURORA_COST = 5;
    uint8 public constant NEXOS_COST = 2;

    mapping(uint8 => uint32) public costs;

    constructor(
        string memory IMPERIAL_APEX_URI,
        string memory CITADEL_URI,
        string memory GRANDEUR_URI,
        string memory FORTRESS_URI,
        string memory CASTLE_URI,
        string memory STRONGHOLD_URI,
        string memory BASTION_URI
    ) ERC1155("") {
        _setURI(IMPERIAL_APEX_ID, IMPERIAL_APEX_URI);
        _setURI(CITADEL_ID, CITADEL_URI);
        _setURI(GRANDEUR_ID, GRANDEUR_URI);
        _setURI(FORTRESS_ID, FORTRESS_URI);
        _setURI(CASTLE_ID, CASTLE_URI);
        _setURI(STRONGHOLD_ID, STRONGHOLD_URI);
        _setURI(BASTION_ID, BASTION_URI);
        costs[IMPERIAL_APEX_ID] = IMPERIAL_APEX_COST;
        costs[CITADEL_ID] = CITADEL_COST;
        costs[GRANDEUR_ID] = GRANDEUR_COST;
        costs[FORTRESS_ID] = FORTRESS_COST;
        costs[CASTLE_ID] = CASTLE_COST;
        costs[STRONGHOLD_ID] = STRONGHOLD_COST;
        costs[BASTION_ID] = BASTION_COST;
        costs[PLUTON_ID] = PLUTON_COST;
        costs[AURORA_ID] = AURORA_COST;
        costs[NEXOS_ID] = NEXOS_COST;
    }

    function fundVelar() external {
        _mint(msg.sender, VELAR_ID, 100, "");
    }

    function mintTokens( uint8 _tokenID,uint _amount) external{
        if(balanceOf(msg.sender, VELAR_ID)  < _amount * costs[_tokenID]) {
            revert Assets_NotEnoughTokens(_tokenID);
        }
        _safeTransferFrom(msg.sender, address(this), VELAR_ID, _amount * costs[_tokenID], "");
        _mint(msg.sender, _tokenID, _amount, "");
    }

    function sendTokens(address _to, uint _amount, uint8 _tokenId) external{
        _safeTransferFrom(msg.sender, _to, _tokenId, _amount, "");
    }

    function getBalance(address _address, uint8 _tokenID) external view returns(uint){
        return balanceOf(_address, _tokenID);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, ERC1155Holder)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

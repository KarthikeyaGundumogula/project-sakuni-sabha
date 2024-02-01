//SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

interface IAssets {
    function mintTokens(uint8 _tokenID, uint _amount) external;

    function depositToVelars( uint totalValue) external ;

    function sendTokens(
        address _from,
        address _to,
        uint _amount,
        uint8 _tokenId
    ) external;

    function getBalance(
        address _address,
        uint8 _tokenID
    ) external view returns (uint);
}

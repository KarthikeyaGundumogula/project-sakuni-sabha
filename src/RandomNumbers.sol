//SPDX-License-Identifier: MIT
pragma solidity 0.8.18;
import "@api3/airnode-protocol/contracts/rrp/requesters/RrpRequesterV0.sol";

/**
 * RANDOM_NUMBER_CONTRACT_ADDRESS = "0x0bf49Ec915D5f2225f6f80e22FBe6445FDFe7616"
 * SPONSOR_WALLET_ADDRESS = "0xA824Dcf25DD7C7c58f7B35a78a57837E8F86840a"
 */

contract RandomNumbers is RrpRequesterV0 {
    event RequestedUint256(bytes32 indexed requestId);
    event ReceivedUint256(bytes32 indexed requestId, uint256 response);
    event RequestedUint256Array(bytes32 indexed requestId, uint256 size);
    event ReceivedUint256Array(bytes32 indexed requestId, uint256[] response);
    event WithdrawalRequested(
        address indexed airnode,
        address indexed sponsorWallet
    );

    address private airnode; // The address of the QRNG Airnode
    bytes32 private endpointIdUint256; // The endpoint ID for requesting a single random number
    bytes32 private endpointIdUint256Array; // The endpoint ID for requesting an array of random numbers
    address private sponsorWallet; // The wallet that will cover the gas costs of the request
    uint256 private _qrngUint256; // The random number returned by the QRNG Airnode
    uint256[] private _qrngUint256Array; // The array of random numbers returned by the QRNG Airnode
    address private owner;

    mapping(bytes32 => bool) private expectingRequestWithIdToBeFulfilled;
    mapping(bytes32 => uint256) private requestIdToRandomNumber;
    mapping(bytes32 => uint256[]) private requestIdToRandomNumberArray;

    constructor(address _airnodeRrp) RrpRequesterV0(_airnodeRrp) {
        owner = msg.sender;
    }

    function setRequestParameters(
        address _airnode,
        bytes32 _endpointIdUint256,
        bytes32 _endpointIdUint256Array,
        address _sponsorWallet
    ) external {
        airnode = _airnode;
        endpointIdUint256 = _endpointIdUint256;
        endpointIdUint256Array = _endpointIdUint256Array;
        sponsorWallet = _sponsorWallet;
    }

    receive() external payable {
        payable(owner).transfer(msg.value);
        emit WithdrawalRequested(airnode, sponsorWallet);
    }

    function makeRequestUint256() external returns (bytes32) {
        bytes32 requestId = airnodeRrp.makeFullRequest(
            airnode,
            endpointIdUint256,
            address(this),
            sponsorWallet,
            address(this),
            this.fulfillUint256.selector,
            ""
        );
        expectingRequestWithIdToBeFulfilled[requestId] = true;
        emit RequestedUint256(requestId);
        return requestId;
    }

    /// @notice Called by the Airnode through the AirnodeRrp contract to
    /// fulfill the request
    function fulfillUint256(
        bytes32 requestId,
        bytes calldata data
    ) external onlyAirnodeRrp {
        require(
            expectingRequestWithIdToBeFulfilled[requestId],
            "Request ID not known"
        );
        expectingRequestWithIdToBeFulfilled[requestId] = false;
        uint256 qrngUint256 = abi.decode(data, (uint256));
        _qrngUint256 = qrngUint256;
        requestIdToRandomNumber[requestId] = qrngUint256;
        emit ReceivedUint256(requestId, qrngUint256);
    }

    /// @notice Requests a `uint256[]`
    /// @param size Size of the requested array
    function makeRequestUint256Array(uint256 size) external returns (bytes32) {
        bytes32 requestId = airnodeRrp.makeFullRequest(
            airnode,
            endpointIdUint256Array,
            address(this),
            sponsorWallet,
            address(this),
            this.fulfillUint256Array.selector,
            // Using Airnode ABI to encode the parameters
            abi.encode(bytes32("1u"), bytes32("size"), size)
        );
        expectingRequestWithIdToBeFulfilled[requestId] = true;
        emit RequestedUint256Array(requestId, size);
        return requestId;
    }

    /// @notice Called by the Airnode through the AirnodeRrp contract to
    /// fulfill the request
    function fulfillUint256Array(
        bytes32 requestId,
        bytes calldata data
    ) external onlyAirnodeRrp {
        require(
            expectingRequestWithIdToBeFulfilled[requestId],
            "Request ID not known"
        );
        expectingRequestWithIdToBeFulfilled[requestId] = false;
        uint256[] memory qrngUint256Array = abi.decode(data, (uint256[]));
        _qrngUint256Array = qrngUint256Array;
        requestIdToRandomNumberArray[requestId] = qrngUint256Array;
        emit ReceivedUint256Array(requestId, qrngUint256Array);
    }

    /// @notice Getter functions to check the returned value.
    function getRandomNumberByRequestId(
        bytes32 _requestId
    ) public view returns (uint256) {
        return requestIdToRandomNumber[_requestId];
    }

    function getRandomNumberArrayByRequestId(
        bytes32 _requestId
    ) public view returns (uint256[] memory) {
        return requestIdToRandomNumberArray[_requestId];
    }

    /// @notice To withdraw funds from the sponsor wallet to the contract.
    function withdraw() external {
        airnodeRrp.requestWithdrawal(airnode, sponsorWallet);
    }
}

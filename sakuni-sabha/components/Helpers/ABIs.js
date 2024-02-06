export const Assets_ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "IMPERIAL_APEX_URI",
        type: "string",
      },
      {
        internalType: "string",
        name: "CITADEL_URI",
        type: "string",
      },
      {
        internalType: "string",
        name: "GRANDEUR_URI",
        type: "string",
      },
      {
        internalType: "string",
        name: "FORTRESS_URI",
        type: "string",
      },
      {
        internalType: "string",
        name: "CASTLE_URI",
        type: "string",
      },
      {
        internalType: "string",
        name: "STRONGHOLD_URI",
        type: "string",
      },
      {
        internalType: "string",
        name: "BASTION_URI",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "tokenID",
        type: "uint8",
      },
    ],
    name: "Assets_InvalidTokenID",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "tokenID",
        type: "uint8",
      },
    ],
    name: "Assets_NotEnoughTokens",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "totalValue",
        type: "uint256",
      },
    ],
    name: "depositToVelars",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "fundVelar",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "_tokenID",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "mintTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155BatchReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_tokenId",
        type: "uint8",
      },
    ],
    name: "sendTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [],
    name: "AURORA_COST",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "AURORA_ID",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BASTION_COST",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BASTION_ID",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CASTLE_COST",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CASTLE_ID",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CITADEL_COST",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CITADEL_ID",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    name: "costs",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "FORTRESS_COST",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "FORTRESS_ID",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "_tokenID",
        type: "uint8",
      },
    ],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "GRANDEUR_COST",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "GRANDEUR_ID",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "IMPERIAL_APEX_COST",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "IMPERIAL_APEX_ID",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NEXOS_COST",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NEXOS_ID",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PLUTON_COST",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PLUTON_ID",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STRONGHOLD_COST",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STRONGHOLD_ID",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VELAR_ID",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export const ExpeditionGame_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_assets",
        type: "address",
      },
      {
        internalType: "address",
        name: "_airnode",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "tokenID",
        type: "uint8",
      },
    ],
    name: "ExpeditionGame_BetIsNotMatched",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "roundNo",
        type: "uint8",
      },
    ],
    name: "ExpeditionGame_BetPlacementFailed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameID",
        type: "uint256",
      },
    ],
    name: "ExpeditionGame_InvalidGameID",
    type: "error",
  },
  {
    inputs: [],
    name: "ExpeditionGame_RollingDiceFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "ExpeditionGame_SavingRollFailed",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "response",
        type: "uint256[]",
      },
    ],
    name: "ExpeditionGame_ReceivedUint256Array",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "size",
        type: "uint256",
      },
    ],
    name: "ExpeditionGame_RequestedUint256Array",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "roundNo",
        type: "uint256",
      },
    ],
    name: "ExpeditionGame_RoundCompleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "airnode",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sponsorWallet",
        type: "address",
      },
    ],
    name: "ExpeditionGame_WithdrawalRequested",
    type: "event",
  },
  {
    inputs: [],
    name: "AURORA_COST",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "AURORA_ID",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NEXOS_COST",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NEXOS_ID",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PLUTON_COST",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PLUTON_ID",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "THRESHOLD_BET",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VAULT_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VELAR_ID",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "airnodeRrp",
    outputs: [
      {
        internalType: "contract IAirnodeRrpV0",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentGameCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "getDiceResults",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
    ],
    name: "getGame",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "gameID",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "potValue",
            type: "uint256",
          },
          {
            internalType: "enum ExpeditionGame.GameState",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "uint32",
            name: "entryBet",
            type: "uint32",
          },
          {
            internalType: "uint8",
            name: "numOfPlayers",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "plutonsCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "aurorasCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nexosCount",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "players",
            type: "address[]",
          },
          {
            internalType: "uint8",
            name: "vacancy",
            type: "uint8",
          },
        ],
        internalType: "struct ExpeditionGame.Game",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_player",
        type: "address",
      },
    ],
    name: "getPLayerStats",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "gameId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "player",
            type: "address",
          },
          {
            internalType: "uint8[]",
            name: "currentHand",
            type: "uint8[]",
          },
          {
            internalType: "uint8",
            name: "currentRoll",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "currentScore",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "currentRollRequestId",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "totalBet",
            type: "uint256",
          },
        ],
        internalType: "struct ExpeditionGame.PlayerStats",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "size",
        type: "uint256",
      },
    ],
    name: "getRandomNumbers",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_player",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_rollRequest",
        type: "bytes32",
      },
    ],
    name: "getRollRequests",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "gameId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "player",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "requestId",
            type: "bytes32",
          },
          {
            internalType: "uint256[]",
            name: "rollResults",
            type: "uint256[]",
          },
        ],
        internalType: "struct ExpeditionGame.RollRequest",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8[]",
        name: "numbers",
        type: "uint8[]",
      },
    ],
    name: "getScore",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
    ],
    name: "getWinner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "incrementGameCounter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_array1",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_array2",
        type: "uint256[]",
      },
    ],
    name: "isSubset",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
    ],
    name: "rollDice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_rollRequest",
        type: "bytes32",
      },
      {
        internalType: "uint256[]",
        name: "_hand",
        type: "uint256[]",
      },
    ],
    name: "saveRoll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum ScoreCard.Combination",
        name: "",
        type: "uint8",
      },
    ],
    name: "scores",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_airnode",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_endpointIdUint256",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_endpointIdUint256Array",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_sponsorWallet",
        type: "address",
      },
    ],
    name: "setRequestParameters",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "gameID",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "potValue",
            type: "uint256",
          },
          {
            internalType: "enum ExpeditionGame.GameState",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "uint32",
            name: "entryBet",
            type: "uint32",
          },
          {
            internalType: "uint8",
            name: "numOfPlayers",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "plutonsCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "aurorasCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nexosCount",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "players",
            type: "address[]",
          },
          {
            internalType: "uint8",
            name: "vacancy",
            type: "uint8",
          },
        ],
        internalType: "struct ExpeditionGame.Game",
        name: "_game",
        type: "tuple",
      },
    ],
    name: "updateGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_player",
        type: "address",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "gameId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "player",
            type: "address",
          },
          {
            internalType: "uint8[]",
            name: "currentHand",
            type: "uint8[]",
          },
          {
            internalType: "uint8",
            name: "currentRoll",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "currentScore",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "currentRollRequestId",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "totalBet",
            type: "uint256",
          },
        ],
        internalType: "struct ExpeditionGame.PlayerStats",
        name: "_playerStats",
        type: "tuple",
      },
    ],
    name: "updatePlayerStats",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
export const ExpeditionGameManager_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_expeditionGame",
        type: "address",
      },
      {
        internalType: "address",
        name: "_assets",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "roundNo",
        type: "uint8",
      },
    ],
    name: "ExpeditionGame_BetIsNotMatched",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "roundNo",
        type: "uint8",
      },
    ],
    name: "ExpeditionGame_BetPlacementFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "ExpeditionGame_GameIsFull",
    type: "error",
  },
  {
    inputs: [],
    name: "ExpeditionGame_GameIsNotFull",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameID",
        type: "uint256",
      },
    ],
    name: "ExpeditionGame_InvalidGameID",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "maxRiseValue",
        type: "uint32",
      },
    ],
    name: "ExpeditionGame_InvalidMaxRiseValue",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "minBetValue",
        type: "uint32",
      },
    ],
    name: "ExpeditionGame_InvalidMinBetValue",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "numOfPlayers",
        type: "uint8",
      },
    ],
    name: "ExpeditionGame_InvalidNumOfPlayers",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "numOfRounds",
        type: "uint8",
      },
    ],
    name: "ExpeditionGame_InvalidNumOfRounds",
    type: "error",
  },
  {
    inputs: [],
    name: "ExpeditionGame_NotAllowedAddress",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "betValue",
        type: "uint256",
      },
    ],
    name: "ExpeditionGame_BetPlaced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "numOfPlayers",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "minBetValue",
        type: "uint32",
      },
    ],
    name: "ExpeditionGame_GameCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameID",
        type: "uint256",
      },
    ],
    name: "ExpeditionGame_GameStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "ExpeditionGame_PlayerJoined",
    type: "event",
  },
  {
    inputs: [],
    name: "AURORA_COST",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "AURORA_ID",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NEXOS_COST",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NEXOS_ID",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PLUTON_COST",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PLUTON_ID",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "THRESHOLD_BET",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VAULT_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VELAR_ID",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_numOfPlayers",
        type: "uint8",
      },
      {
        internalType: "uint32",
        name: "_entryBet",
        type: "uint32",
      },
    ],
    name: "createGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "_plutons",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "_auroras",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "_nexos",
        type: "uint32",
      },
    ],
    name: "joinGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "_plutons",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "_auroras",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "_nexos",
        type: "uint32",
      },
    ],
    name: "placeBet",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "s_assets",
    outputs: [
      {
        internalType: "contract IAssets",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_expeditionGame",
    outputs: [
      {
        internalType: "contract IExpeditionGame",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
    ],
    name: "startGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export const SeigeGame_ABI = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "getDiceResults",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "size",
        type: "uint256",
      },
    ],
    name: "getRandomNumbers",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "incrementGameCounter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
    ],
    name: "rollDice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "_hand",
        type: "uint256[]",
      },
    ],
    name: "saveDice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_assets",
        type: "address",
      },
      {
        internalType: "address",
        name: "_airnode",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
    ],
    name: "SeigeGame_InvalidGameID",
    type: "error",
  },
  {
    inputs: [],
    name: "SeigeGame_InvalidRollRequest",
    type: "error",
  },
  {
    inputs: [],
    name: "SeigeGame_RollingDiceFailed",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "response",
        type: "uint256[]",
      },
    ],
    name: "ExpeditionGame_ReceivedUint256Array",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "size",
        type: "uint256",
      },
    ],
    name: "ExpeditionGame_RequestedUint256Array",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "hand",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint8[]",
        name: "newHand",
        type: "uint8[]",
      },
    ],
    name: "SeigeGame_RollSaved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "airnode",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sponsorWallet",
        type: "address",
      },
    ],
    name: "SeigeGame_WithdrawalRequested",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_airnode",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_endpointIdUint256",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_endpointIdUint256Array",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_sponsorWallet",
        type: "address",
      },
    ],
    name: "setRequestParameters",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "gameID",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "potValue",
            type: "uint256",
          },
          {
            internalType: "enum SeigeGame.GameState",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "uint32",
            name: "entryBet",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "maxRise",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "currentRise",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "numOfPlayers",
            type: "uint8",
          },
          {
            internalType: "uint8[]",
            name: "potTokens",
            type: "uint8[]",
          },
          {
            internalType: "address[]",
            name: "players",
            type: "address[]",
          },
          {
            internalType: "uint8",
            name: "vacancy",
            type: "uint8",
          },
          {
            internalType: "enum SeigeGame.GameLevel",
            name: "currentLevel",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "roundCompletedPlayers",
            type: "uint8",
          },
        ],
        internalType: "struct SeigeGame.Game",
        name: "_game",
        type: "tuple",
      },
    ],
    name: "updateGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_player",
        type: "address",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "gameId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "player",
            type: "address",
          },
          {
            internalType: "uint8[]",
            name: "currentHand",
            type: "uint8[]",
          },
          {
            internalType: "uint8",
            name: "currentRoll",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "currentScore",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "currentRollRequestId",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "totalBet",
            type: "uint256",
          },
          {
            internalType: "enum SeigeGame.GameLevel",
            name: "currentLevel",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "isFolded",
            type: "bool",
          },
        ],
        internalType: "struct SeigeGame.PlayerStats",
        name: "_playerStats",
        type: "tuple",
      },
    ],
    name: "updatePlayerStats",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    inputs: [],
    name: "airnodeRrp",
    outputs: [
      {
        internalType: "contract IAirnodeRrpV0",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentGameCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
    ],
    name: "getCurrentLevelWinner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
    ],
    name: "getGame",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "gameID",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "potValue",
            type: "uint256",
          },
          {
            internalType: "enum SeigeGame.GameState",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "uint32",
            name: "entryBet",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "maxRise",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "currentRise",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "numOfPlayers",
            type: "uint8",
          },
          {
            internalType: "uint8[]",
            name: "potTokens",
            type: "uint8[]",
          },
          {
            internalType: "address[]",
            name: "players",
            type: "address[]",
          },
          {
            internalType: "uint8",
            name: "vacancy",
            type: "uint8",
          },
          {
            internalType: "enum SeigeGame.GameLevel",
            name: "currentLevel",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "roundCompletedPlayers",
            type: "uint8",
          },
        ],
        internalType: "struct SeigeGame.Game",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_player",
        type: "address",
      },
    ],
    name: "getPLayerStats",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "gameId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "player",
            type: "address",
          },
          {
            internalType: "uint8[]",
            name: "currentHand",
            type: "uint8[]",
          },
          {
            internalType: "uint8",
            name: "currentRoll",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "currentScore",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "currentRollRequestId",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "totalBet",
            type: "uint256",
          },
          {
            internalType: "enum SeigeGame.GameLevel",
            name: "currentLevel",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "isFolded",
            type: "bool",
          },
        ],
        internalType: "struct SeigeGame.PlayerStats",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_rollRequest",
        type: "bytes32",
      },
    ],
    name: "getRollRequests",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8[]",
        name: "numbers",
        type: "uint8[]",
      },
    ],
    name: "getScore",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_array1",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_array2",
        type: "uint256[]",
      },
    ],
    name: "isSubset",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_gameCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum ScoreCard.Combination",
        name: "",
        type: "uint8",
      },
    ],
    name: "scores",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VAULT_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export const SeigeGameManager_ABI = [
  {
    inputs: [
      {
        internalType: "uint32",
        name: "numOfPlayers",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "entryBet",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "maxRise",
        type: "uint32",
      },
    ],
    name: "createGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_player",
        type: "address",
      },
      {
        internalType: "uint8[]",
        name: "_betTokens",
        type: "uint8[]",
      },
    ],
    name: "depositTokens",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
    ],
    name: "foldGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "uint8[]",
        name: "_potTokens",
        type: "uint8[]",
      },
    ],
    name: "joinGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "uint8[]",
        name: "_potTokens",
        type: "uint8[]",
      },
    ],
    name: "raiseBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_seigeGameAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_assets",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "SeigeGame_GameIsFull",
    type: "error",
  },
  {
    inputs: [],
    name: "SeigeGame_InvalidBet",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
    ],
    name: "SeigeGame_InvalidGameID",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalValue",
        type: "uint256",
      },
    ],
    name: "SeigeGame_BetRaised",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "numOfPlayers",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "entryBet",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "maxRise",
        type: "uint32",
      },
    ],
    name: "SeigeGame_GameCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "SeigeGame_PlayerFolded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "SeigeGame_PlayerJoined",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
    ],
    name: "startLevel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "assets",
    outputs: [
      {
        internalType: "contract IAssets",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_player",
        type: "address",
      },
      {
        internalType: "uint8[]",
        name: "_betTokens",
        type: "uint8[]",
      },
    ],
    name: "checkPlayersBalance",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "seigeGame",
    outputs: [
      {
        internalType: "contract ISeigeGame",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

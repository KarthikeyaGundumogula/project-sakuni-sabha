import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { ethers, Contract, getDefaultProvider } from "ethers";
import { Assets_Address } from "../Helpers/Addresses";
import { Assets_ABI } from "../Helpers/ABIs";
import { RPC_URL } from "../Helpers/Constants";

const TokenBalances = (walletAddress) => {
  const [balances, setBalances] = useState({});
  const [tokens, setTokens] = useState([]);
  const tokenIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    const fetchBalances = async () => {
      const tokens = [
        "Velars",
        "Plutons",
        "Auroras",
        "Nexos",
        "Imperial Apex",
        "Citadel",
        "Grandeur",
        "Fortress",
        "Castle",
        "Stronghold",
        "Bastion",
      ];
      setTokens(tokens);
      const balances = {};
      for (let index of tokenIds) {
        balances[index] = 0;
      }
      setBalances(balances);
    };

    fetchBalances();
  }, []);

  const getBalances = async () => {
    console.log("getting balances");
    const provider = getDefaultProvider(RPC_URL);
    const assets = new Contract(Assets_Address, Assets_ABI, provider);
    const balances = {};
    let bal;
    for (let id of tokenIds) {
      bal = await assets.balanceOf(walletAddress.walletAddress, id);
      balances[id] = ethers.formatUnits(bal, 18);
    }

    setBalances(balances);
  };
  return (
    <Flex
      justify="space-between"
      wrap="wrap"
      height={55}
      alignItems={"center"}
      width={"98%"}
      mx={"auto"}
      mt={5}
    >
      {Object.entries(balances).map(([tokenId, balance]) => (
        <Text
          key={tokenId}
          color="#00FB0D"
          fontSize={"18"}
          onClick={getBalances}
        >
          <Text as="span" color="appWorkspace" fontWeight={"bold"}>
            {tokens[tokenId]}:
          </Text>{" "}
          {balance}
        </Text>
      ))}
    </Flex>
  );
};

export default TokenBalances;

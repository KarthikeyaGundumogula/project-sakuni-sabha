import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { ethers, Contract } from "ethers";
import { Assets_Address } from "../Helpers/Addresses";
import { Assets_ABI } from "../Helpers/ABIs";
import { useMoonEthers } from "../Hooks/ethers";
import { useMoonSDK } from "../Hooks/moon";

const TokenBalances = (walletAddress) => {
  const [balances, setBalances] = useState({});
  const [tokens, setTokens] = useState([]);
  const { moonProvider } = useMoonEthers();
  const { ethereum } = window;
  const { moon } = useMoonSDK();
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
      const assets = new Contract(Assets_Address, Assets_ABI, moonProvider);
      console.log("walletAddress", assets);
      console.log("walletAddress", walletAddress.walletAddress);
      const balances = {};

      setBalances(balances);
    };

    fetchBalances();
  }, []);

  const getBalances = async () => {
    const assets = new Contract(Assets_Address, Assets_ABI, moonProvider);
    console.log("walletAddress", assets);
    console.log("walletAddress", walletAddress);
    const balances = {};

    for (let id of tokenIds) {
      balances[id] = await assets.balanceOf(walletAddress, id);
    }
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

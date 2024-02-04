import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";

const TokenBalances = () => {
  const [balances, setBalances] = useState({});
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchBalances = async () => {
      const tokenIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
      const balances = {};

      for (let id of tokenIds) {
        balances[id] = id * 100;
      }
      setTokens(tokens);

      setBalances(balances);
    };

    fetchBalances();
  }, []);

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
        <Text key={tokenId} color="#00FB0D" fontSize={"18"}>
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

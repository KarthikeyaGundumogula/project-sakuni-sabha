import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Table, Thead, Tbody, Tr, Th, Text } from "@chakra-ui/react";
import UserGamesRow from "../../components/Dashboard/UserGamesRow";
import GetVelars from "../../components/Dashboard/GetVelarsModal";
import BuyAssetModal from "../../components/Dashboard/BuyAssetModal";
import BuyTokenModal from "../../components/Dashboard/BuyTokenModal";
import CreateGameModal from "../../components/Dashboard/CreateGameModal";
import TokenBalances from "../../components/Dashboard/Balances";
import { useMoonSDK } from "../../components/Hooks/moon";
import { ethers } from "ethers";

const Dashboard = () => {
  const { moon, initialize, disconnect } = useMoonSDK();
  const [walletAddress, setWalletAddress] = useState("0x000");
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    async function getDetails() {
      await initialize();
    }
    getDetails();
  }, []);

  const getAddress = async () => {
    const accounts = await moon.listAccounts();
    console.log("User's wallet address", accounts.data.keys[0]);
    setWalletAddress(accounts.data.keys[0]);
    const bal = await moon
      .getAccountsSDK()
      .getBalance(accounts.data.keys[0], { chainId: "1891" });
    console.log("User's wallet balance", bal.data.data.balance);
    setBalance(ethers.formatEther(bal.data.data.balance.toString(), 9));
  };
  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
          gap: "10px",
          height: "70px",
        }}
      >
        <BuyTokenModal />
        <BuyAssetModal />
        <GetVelars />
        <CreateGameModal />
      </div>
      <Text color={"AppWorkspace"} align={"center"} onClick={getAddress}>
        {walletAddress}
      </Text>
      <Text color={"AppWorkspace"} align={"center"} onClick={getAddress}>
        {balance}
      </Text>
      <TokenBalances walletAddress={walletAddress} />
      <Table
        variant="simple"
        width={"60%"}
        mx={"auto"}
        alignItems={"center"}
        mt={10}
      >
        <Thead>
          <Tr>
            <Th color={"AppWorkspace"} textAlign={"center"}>
              Field 1
            </Th>
            <Th color={"AppWorkspace"} textAlign={"center"}>
              Field 2
            </Th>
            <Th color={"AppWorkspace"} textAlign={"center"}>
              Field 3
            </Th>
            <Th color={"AppWorkspace"} textAlign={"center"}>
              Field 4
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <UserGamesRow />
        </Tbody>
      </Table>
    </div>
  );
};

export default Dashboard;

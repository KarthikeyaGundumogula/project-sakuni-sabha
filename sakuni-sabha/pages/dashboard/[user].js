import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Text,
  Modal,
  Box,
  ModalContent,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import UserGamesRow from "../../components/Dashboard/UserGamesRow";
import GetVelars from "../../components/Dashboard/GetVelarsModal";
import BuyAssetModal from "../../components/Dashboard/BuyAssetModal";
import BuyTokenModal from "../../components/Dashboard/BuyTokenModal";
import CreateGameModal from "../../components/Dashboard/CreateGameModal";
import TokenBalances from "../../components/Dashboard/Balances";
import { useMoonSDK } from "../../components/Hooks/moon";
import { ethers, getDefaultProvider, Contract, formatEther } from "ethers";
import { RPC_URL } from "../../components/Helpers/Constants";
import { ExpeditionGame } from "../../components/Helpers/Addresses";
import { ExpeditionGame_ABI } from "../../components/Helpers/ABIs";

const Dashboard = () => {
  const { moon, initialize, disconnect } = useMoonSDK();
  const [walletAddress, setWalletAddress] = useState("0x000");
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getDetails() {
      await initialize();
    }
    getDetails();
  }, []);

  const getAddress = async () => {
    try {
      setIsLoading(true);
      const accounts = await moon.getAccountsSDK().listAccounts();
      console.log(accounts.data.data.keys[0]);
      setWalletAddress(accounts.data.data.keys[0]);
      const bal = await moon
        .getAccountsSDK()
        .getBalance(accounts.data.data.keys[0], { chainId: "1891" });
      setBalance(ethers.formatEther(bal.data.data.balance.toString(), 9));
      const provider = new getDefaultProvider(RPC_URL);
      const EGame = new Contract(ExpeditionGame, ExpeditionGame_ABI, provider);
      const counter = await EGame.getCurrentGameCounter();
      console.log(formatEther(counter));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
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
        {"{"} {balance} {"}"}
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
              Game ID
            </Th>
            <Th color={"AppWorkspace"} textAlign={"center"}>
              Pot Size
            </Th>
            <Th color={"AppWorkspace"} textAlign={"center"}>
              Score
            </Th>
            <Th color={"AppWorkspace"} textAlign={"center"}>
              Status
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <UserGamesRow walletAddress={walletAddress.walletAddress} />
        </Tbody>
      </Table>
      <Modal isOpen={isLoading} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={4}
            backgroundColor={"#081223"}
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="#00fb0d"
              size="xl"
            />
          </Box>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Dashboard;

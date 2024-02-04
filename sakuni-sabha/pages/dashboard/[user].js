import React from "react";
import Header from "@/components/Header";
import { Table, Thead, Tbody, Tr, Th, Text } from "@chakra-ui/react";
import UserGamesRow from "@/components/Dashboard/UserGamesRow";
import { Button } from "@chakra-ui/react";
import GetVelars from "@/components/Dashboard/GetVelarsModal";
import BuyAssetModal from "@/components/Dashboard/BuyAssetModal";
import BuyTokenModal from "@/components/Dashboard/BuyTokenModal";
import CreateGameModal from "@/components/Dashboard/CreateGameModal";
import TokenBalances from "@/components/Dashboard/Balances";

const Dashboard = () => {
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
      <Text color={"AppWorkspace"} align={"center"}>
        0x192346577383746
      </Text>
      <TokenBalances />
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

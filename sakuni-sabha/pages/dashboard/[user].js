import React from "react";
import Header from "@/components/Header";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <Table variant="simple" width={"60%"} mx={"auto"}>
        <Thead>
          <Tr>
            <Th color={"AppWorkspace"}>Field 1</Th>
            <Th color={"AppWorkspace"}>Field 2</Th>
            <Th color={"AppWorkspace"}>Field 3</Th>
            <Th color={"AppWorkspace"}>Field 4</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Data 1</Td>
            <Td>Data 2</Td>
            <Td>Data 3</Td>
            <Td>Data 4</Td>
          </Tr>
          {/* Add more rows here */}
        </Tbody>
      </Table>
      *
    </div>
  );
};

export default Dashboard;

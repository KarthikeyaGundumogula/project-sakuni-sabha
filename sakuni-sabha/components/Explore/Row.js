import React from "react";
import { Tr, Td, Badge } from "@chakra-ui/react";
import GameModal from "./GameModal";

const GameRow = () => {
  function getStatusColor(status) {
    switch (status) {
      case "Completed":
        return "green";
      case "Started":
        return "orange";
      case "Created":
        return "blue";
      default:
        return "gray";
    }
  }
  return (
    <Tr>
      <Td color="AppWorkspace" textAlign={"center"}>
        1
      </Td>
      <Td color="AppWorkspace" textAlign={"center"}>
        20
      </Td>
      <Td color="AppWorkspace" textAlign={"center"}>
        30
      </Td>
      <Td color="AppWorkspace" textAlign={"center"}>
        4
      </Td>
      <Td color="AppWorkspace" textAlign={"center"}>
        <Badge colorScheme={getStatusColor("Started")}>Seige</Badge>
      </Td>
      <Td color="AppWorkspace" textAlign={"center"}>
        <Badge colorScheme={getStatusColor("Started")}>Completed</Badge>
      </Td>
      <Td>
        <GameModal />
      </Td>
    </Tr>
  );
};

export default GameRow;

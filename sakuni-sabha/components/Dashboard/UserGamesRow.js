import React from "react";
import { Tr, Td, Badge } from "@chakra-ui/react";

const UserGamesRow = () => {
  function getStatusColor(status) {
    switch (status) {
      case "Win":
        return "green";
      case "Folded":
        return "orange";
      default:
        return "red";
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
        <Badge colorScheme={getStatusColor("Win")}>Completed</Badge>
      </Td>
    </Tr>
  );
};

export default UserGamesRow;

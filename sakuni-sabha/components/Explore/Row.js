import React, { useEffect, useState } from "react";
import { Tr, Td, Badge, Spinner } from "@chakra-ui/react";
import GameModal from "./GameModal";

const GameRow = ({ game, mode }) => {
  const [gameId, setGameId] = useState(0);
  const [entryFee, setEntryFee] = useState(0);
  const [maxRaise, setMaxRaise] = useState(0);
  const [players, setPlayers] = useState(0);
  const [vacancy, setVacancy] = useState(0);
  const [status, setStatus] = useState("Created");
  const [type, setType] = useState("Expedition");
  useEffect(() => {
    setGameId(game[0].toString());
    setEntryFee(game[3].toString());
    if (game[2] == 0) {
      setStatus("Created");
    } else if (game[2] == 1) {
      setStatus("Started");
    } else {
      setStatus("Completed");
    }
    setPlayers(game[4].toString());
    setType(mode);
    setVacancy(game[9].toString());
    if (mode === "Expedition") {
      setMaxRaise("----");
    }
  }, [game]);
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
        {gameId}
      </Td>
      <Td color="AppWorkspace" textAlign={"center"}>
        {entryFee}
      </Td>
      <Td color="AppWorkspace" textAlign={"center"}>
        {maxRaise}
      </Td>
      <Td color="AppWorkspace" textAlign={"center"}>
        {players}
      </Td>
      <Td color="AppWorkspace" textAlign={"center"}>
        {vacancy}
      </Td>
      <Td color="AppWorkspace" textAlign={"center"}>
        <Badge colorScheme={getStatusColor("Started")}>{type}</Badge>
      </Td>
      <Td color="AppWorkspace" textAlign={"center"}>
        <Badge colorScheme={getStatusColor("Started")}>{status}</Badge>
      </Td>
      <Td>
        <GameModal game={game} />
      </Td>
    </Tr>
  );
};

export default GameRow;

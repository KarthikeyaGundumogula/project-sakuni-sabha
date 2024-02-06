import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  Spinner,
} from "@chakra-ui/react";
import GameRow from "./Row";
import { useMoonSDK } from "../Hooks/moon";
import { useState, useEffect } from "react";
import { ExpeditionGame } from "../Helpers/Addresses";
import { ExpeditionGame_ABI } from "../Helpers/ABIs";
import { getDefaultProvider, Contract } from "ethers";
import { RPC_URL } from "../Helpers/Constants";

const GamesTable = () => {
  const { moon } = useMoonSDK();
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      const provider = getDefaultProvider(RPC_URL);
      const contract = new Contract(
        ExpeditionGame,
        ExpeditionGame_ABI,
        provider
      );
      const gameCounter = await contract.getCurrentGameCounter();
      const games = [];
      for (let i = 1; i <= gameCounter; i++) {
        const game = await contract.getGame(i);
        games.push(game);
      }
      setGames(games);
      setIsLoading(false);
    };
    fetchGames();
  }, []);
  return (
    <Box>
      <TableContainer width={"90%"} mx="auto" marginTop={0}>
        <Table size={"sm"} colorScheme={"whatsapp"}>
          <Thead>
            <Tr>
              <Th width={50} color="#00FB0D" fontSize={16} textAlign="center">
                Game-ID
              </Th>
              <Th width={50} color="#00FB0D" fontSize={16} textAlign="center">
                Entry-Fee
              </Th>
              <Th width={50} color="#00FB0D" fontSize={16} textAlign="center">
                Max-Raise
              </Th>
              <Th width={50} color="#00FB0D" fontSize={16} textAlign="center">
                Num-Of-Players
              </Th>
              <Th width={50} color="#00FB0D" fontSize={16} textAlign="center">
                Vacancy
              </Th>
              <Th width={50} color="#00FB0D" fontSize={16} textAlign="center">
                Mode
              </Th>
              <Th width={50} color="#00FB0D" fontSize={16} textAlign="center">
                Status
              </Th>
              <Th
                width={50}
                color="#00FB0D"
                fontSize={16}
                textAlign="center"
              ></Th>
            </Tr>
          </Thead>
          <Tbody>
            {games.map((game, index) => (
              <GameRow key={index} game={game} mode={"Expedition"} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
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
    </Box>
  );
};

export default GamesTable;

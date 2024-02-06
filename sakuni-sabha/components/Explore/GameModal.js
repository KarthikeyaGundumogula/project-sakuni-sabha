import React, { useState, useEffect, useRef, use } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Text,
  Flex,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ExpeditionGameManager, ExpeditionGame } from "../Helpers/Addresses";
import { ExpeditionGameManager_ABI, ExpeditionGame_ABI } from "../Helpers/ABIs";
import { Contract, getDefaultProvider } from "ethers";
import { useMoonSDK } from "../Hooks/moon";
import { RPC_URL } from "../Helpers/Constants";

const GameModal = ({ game }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { moon } = useMoonSDK();
  const [isLoading, setIsLoading] = useState(false);
  const plutonsRef = useRef();
  const aurorasRef = useRef();
  const nexosRef = useRef();
  const [gameId, setGameId] = useState(0);
  const [gamePot, setGamePot] = useState(0);
  const [bet, setBet] = useState(0);
  const [isJoined, setIsJoined] = useState(false);
  useEffect(() => {
    setGameId(game[0].toString());
    setGamePot(game[1].toString());
    setBet(game[3].toString());
  }, []);

  async function checkIfJoined() {
    const account = await moon.getAccountsSDK().listAccounts();
    const provider = getDefaultProvider(RPC_URL);
    const contract = new Contract(ExpeditionGame, ExpeditionGame_ABI, provider);

    const player = await contract.getPLayerStats(
      gameId,
      account.data.data.keys[0]
    );
    if (player[0].toString() === gameId) {
      return true;
    }
    return false;
  }
  const joinGameHandler = async () => {
    setIsLoading(true);
    console.log("sending tx");
    const account = await moon.getAccountsSDK().listAccounts();
    const join = await checkIfJoined();
    if (join) {
      setIsJoined(true);
      setIsLoading(false);
      onClose();
      return;
    }
    const contract = new Contract(
      ExpeditionGameManager,
      ExpeditionGameManager_ABI
    );
    const data = contract.interface.encodeFunctionData("joinGame", [
      gameId,
      plutonsRef.current.value,
      aurorasRef.current.value,
      nexosRef.current.value,
    ]);
    const raw_tx = await moon
      .getAccountsSDK()
      .signTransaction(account.data.data.keys[0], {
        to: ExpeditionGameManager,
        data: data,
        gasPrice: "1000000000",
        gas: "250000",
        nonce: "0",
        chain_id: "1891",
        encoding: "utf-8",
        value: "0",
      });
    const res = await moon
      .getAccountsSDK()
      .broadcastTx(account.data.data.keys[0], {
        rawTransaction: raw_tx.data.data.transactions[0].raw_transaction,
        chainId: "1891",
      });
    setIsJoined(true);
    setIsLoading(false);
    onClose();
  };

  const openGameHandler = async () => {
    setIsLoading(true);
    if (game[9].toString() == 0) {
      const account = await moon.getAccountsSDK().listAccounts();
      const contract = new Contract(
        ExpeditionGameManager,
        ExpeditionGameManager_ABI
      );
      const data = contract.interface.encodeFunctionData("startGame", [gameId]);
      const raw_tx = await moon
        .getAccountsSDK()
        .signTransaction(account.data.data.keys[0], {
          to: ExpeditionGameManager,
          data: data,
          gasPrice: "1000000000",
          gas: "250000",
          nonce: "0",
          chain_id: "1891",
          encoding: "utf-8",
          value: "0",
        });
      const res = await moon
        .getAccountsSDK()
        .broadcastTx(account.data.data.keys[0], {
          rawTransaction: raw_tx.data.data.transactions[0].raw_transaction,
          chainId: "1891",
        });
    }
    setIsLoading(false);
    router.push(`/explore/${gameId}`);
  };
  return (
    <>
      <Button size="md" onClick={onOpen}>
        Join
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          backgroundColor="#081223"
          color="white"
          fontSize={25}
          fontFamily={"sans-serif"}
          fontWeight={"bold"}
        >
          <ModalHeader color={"white"}>Game Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex alignItems={"center"}>
              <Text color="white">Game ID: </Text>{" "}
              <Text color="#00fb0d">{gameId}</Text>
            </Flex>
            <Flex alignItems={"center"}>
              <Text color="white">Game Pot Value: </Text>{" "}
              <Text color="#00fb0d">{gamePot}</Text>
            </Flex>
            <Flex alignItems={"center"}>
              <Text color="white">Place Bet:</Text>{" "}
              <Text color="#00fb0d">{bet}</Text>
            </Flex>
            <Input
              placeholder="Enter Plutons Amount"
              margin={2}
              ref={plutonsRef}
            />
            <Input
              placeholder="Enter Auroras Amount"
              margin={2}
              ref={aurorasRef}
            />
            <Input placeholder="Enter Nexos Amount" margin={2} ref={nexosRef} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {!isJoined ? (
              <Button colorScheme={"teal"} onClick={joinGameHandler}>
                Join Game
              </Button>
            ) : (
              <Button colorScheme={"teal"} onClick={openGameHandler}>
                Open Game
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
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
    </>
  );
};

export default GameModal;

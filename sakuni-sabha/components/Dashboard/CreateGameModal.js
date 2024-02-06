import React, { useRef, useState } from "react";
import { Contract } from "ethers";
import { ExpeditionGameManager } from "../Helpers/Addresses";
import { ExpeditionGameManager_ABI } from "../Helpers/ABIs";
import { useMoonSDK } from "../Hooks/moon";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  Text,
  Stack,
  useDisclosure,
  Spinner,
  Box,
} from "@chakra-ui/react";

const CreateGameModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const numOfPlayers = useRef();
  const maxRise = useRef();
  const entryBet = useRef();
  const initialRef = useRef();
  const [mode, setMode] = useState("EMode");
  const [isLoading, setIsLoading] = useState(false);
  const { moon } = useMoonSDK();

  const setModeHandler = (e) => {
    setMode(e.target.value);
    console.log(mode);
  };

  const createGameHandler = async () => {
    setIsLoading(true);
    console.log("sending tx");
    const account = await moon.getAccountsSDK().listAccounts();
    const contract = new Contract(
      ExpeditionGameManager,
      ExpeditionGameManager_ABI
    );
    const data = contract.interface.encodeFunctionData("createGame", [
      numOfPlayers.current.value,
      entryBet.current.value,
    ]);
    const raw_tx = await moon
      .getAccountsSDK()
      .signTransaction(account.data.data.keys[0], {
        to: ExpeditionGameManager,
        data: data,
        gasPrice: "1000000000",
        gas: "200000",
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
    setIsLoading(false);
  };
  return (
    <>
      <Button onClick={onOpen}>Create Game</Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          backgroundColor="#081223"
          color="white"
          fontSize={25}
          fontFamily={"sans-serif"}
          fontWeight={"bold"}
        >
          <ModalHeader>Create Game</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Select
                placeholder="Select Mode"
                color="#00FB0D"
                onChange={setModeHandler}
              >
                <option value="EMode">Expedition Mode</option>
                <option value="SMode">Seige Mode</option>
              </Select>
              <Input ref={entryBet} placeholder="Entry Bet" color={"#00fb0d"} />
              <Input ref={maxRise} placeholder="Max Raise" color={"#00fb0d"} />
              <Input
                ref={numOfPlayers}
                placeholder="Number of Players"
                color={"#00fb0d"}
              />
              <Text>Velars: 100</Text>{" "}
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={createGameHandler}>
              Create Game
            </Button>
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

export default CreateGameModal;

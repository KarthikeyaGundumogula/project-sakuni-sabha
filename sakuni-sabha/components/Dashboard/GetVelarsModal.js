import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Stack,
  useDisclosure,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { Assets_Address } from "../Helpers/Addresses";
import { Assets_ABI } from "../Helpers/ABIs";
import { Contract } from "ethers";
import { useMoonSDK } from "../Hooks/moon";

const GetVelarsModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const { moon } = useMoonSDK();
  const [isLoading, setIsLoading] = useState(false);

  const getVelarsHandler = async () => {
    setIsLoading(true);
    console.log("sending tx");
    const account = await moon.getAccountsSDK().listAccounts();
    const contract = new Contract(Assets_Address, Assets_ABI);
    console.log(account.data.data.keys[0]);
    const data = contract.interface.encodeFunctionData("fundVelar", []);
    const raw_tx = await moon
      .getAccountsSDK()
      .signTransaction(account.data.data.keys[0], {
        to: Assets_Address,
        data: data,
        gasPrice: "1000000000",
        gas: "200000",
        nonce: "0",
        chain_id: "1891",
        encoding: "utf-8",
        value: "0",
      });
    console.log(raw_tx.data.data.transactions[0].raw_transaction);
    const res = await moon
      .getAccountsSDK()
      .broadcastTx(account.data.data.keys[0], {
        rawTransaction: raw_tx.data.data.transactions[0].raw_transaction,
        chainId: "1891",
      });
    console.log(res);
    setIsLoading(false);
  };
  return (
    <>
      <Button onClick={onOpen}>Fund Velars</Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          backgroundColor="#081223"
          color="white"
          fontSize={25}
          fontFamily={"sans-serif"}
          fontWeight={"bold"}
        >
          <ModalHeader>Buy Tokens</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Text>Velars: 100</Text>{" "}
              {/* Replace 100 with the actual balance */}
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={getVelarsHandler}>Fund Velar</Button>
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

export default GetVelarsModal;

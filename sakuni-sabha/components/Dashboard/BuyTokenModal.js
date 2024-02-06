import React from "react";
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
import { Assets_Address } from "../Helpers/Addresses";
import { Assets_ABI } from "../Helpers/ABIs";
import { Contract, getDefaultProvider } from "ethers";
import { useMoonSDK } from "../Hooks/moon";
import { RPC_URL } from "../Helpers/Constants";

const BuyTokenModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const { moon } = useMoonSDK();
  const [isLoading, setIsLoading] = React.useState(false);
  const [velars, setVelars] = React.useState("1000");
  const [tokenId, setTokenId] = React.useState(0);
  const amountRef = React.useRef();

  const buyTokensHandler = async () => {
    setIsLoading(true);
    console.log("sending tx");
    const account = await moon.getAccountsSDK().listAccounts();
    const provider = getDefaultProvider(RPC_URL);
    let contract1 = new Contract(Assets_Address, Assets_ABI, provider);
    let bal = await contract1.balanceOf(account.data.data.keys[0], 0);
    setVelars(bal.toString());
    const contract = new Contract(Assets_Address, Assets_ABI);
    const data = contract.interface.encodeFunctionData("mintTokens", [
      account.data.data.keys[0],
      tokenId,
      amountRef.current.value,
    ]);
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
    const res = await moon
      .getAccountsSDK()
      .broadcastTx(account.data.data.keys[0], {
        rawTransaction: raw_tx.data.data.transactions[0].raw_transaction,
        chainId: "1891",
      });
    bal = await contract1.balanceOf(account.data.data.keys[0], 0);
    setVelars(bal.toString());
    setIsLoading(false);
  };
  const setTokenIdHandler = (e) => {
    setTokenId(e.target.value);
  };

  return (
    <>
      <Button onClick={onOpen}>Buy Tokens</Button>

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
              <Input ref={amountRef} placeholder="Amount" color={"#00fb0d"} />
              <Select
                placeholder="Select option"
                color="#00FB0D"
                onClick={setTokenIdHandler}
              >
                <option value="1">Plutons (10VLR)</option>
                <option value="2">Auroras (5VLR)</option>
                <option value="3">Nexos (3VLR)</option>
              </Select>
              <Text>Velars: {velars}</Text>{" "}
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={buyTokensHandler}>Buy</Button>
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

export default BuyTokenModal;

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
} from "@chakra-ui/react";
import { Assets_Address } from "../Helpers/Addresses";
import { Assets_ABI } from "../Helpers/ABIs";
import { Contract, getDefaultProvider } from "ethers";
import { useMoonSDK } from "../Hooks/moon";
import { RPC_URL } from "../Helpers/Constants";

const BuyAssetModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const { moon } = useMoonSDK();
  const [isLoading, setIsLoading] = React.useState(false);
  const [velars, setVelars] = React.useState("1000");
  const [tokenId, setTokenId] = React.useState(0);
  const amountRef = React.useRef();

  const buyAssetsHandler = async () => {
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
  const setTokensHandler = (e) => {
    setTokenId(e.target.value);
  };

  return (
    <>
      <Button onClick={onOpen}>Buy Assets</Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          backgroundColor="#081223"
          color="white"
          fontSize={25}
          fontFamily={"sans-serif"}
          fontWeight={"bold"}
        >
          <ModalHeader>Buy Assets</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Input ref={amountRef} placeholder="Amount" color={"#00fb0d"} />
              <Select
                placeholder="Select option"
                color="#00FB0D"
                onClick={setTokensHandler}
              >
                <option value="4">Imperial Apex(100000VLR)</option>
                <option value="5">Citadel (75000VLR)</option>
                <option value="6">Grandeur (50000VLR)</option>
                <option value="7">Fortress (25000)</option>
                <option value="8">Castle (20000VLR)</option>
                <option value="9">Stronghold (10000)</option>
                <option value="10">Bastion (7500)</option>
              </Select>
              <Text>Velars: {velars}</Text>{" "}
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={buyAssetsHandler}>Buy Assets</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BuyAssetModal;

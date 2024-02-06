import {
  Box,
  Flex,
  Text,
  Button,
  Input,
  Modal,
  Spinner,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { useMoonSDK } from "../../components/Hooks/moon";
import { getDefaultProvider, Contract } from "ethers";
import { ExpeditionGame } from "../../components/Helpers/Addresses";
import { ExpeditionGame_ABI } from "../../components/Helpers/ABIs";
import { RPC_URL } from "../../components/Helpers/Constants";
import { useRouter } from "next/router";

const GamePage = () => {
  const { moon } = useMoonSDK();
  const router = useRouter();
  const [gameLogs, setGameLogs] = useState([]);
  const [player, setPlayer] = useState([]);
  const [diceLength, setDiceLength] = useState(5);
  const [inputValues, setInputValues] = useState(Array(diceLength).fill(""));
  const [rollResults, setRollResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInputValues(Array(diceLength).fill(""));
  }, [diceLength]);

  const handleChange = (index) => (event) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);
  };
  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      const provider = getDefaultProvider(RPC_URL);
      const contract = new Contract(
        ExpeditionGame,
        ExpeditionGame_ABI,
        provider
      );
      const game = await contract.getGame(router.query.game);
      let log = [];
      for (let i = 0; i < 10; i++) {
        log[i] = game[i].toString();
      }
      setGameLogs(log);
      setIsLoading(false);
    };
    fetchGames();
  }, []);
  const getPlayer = async () => {
    console.log("getting player");
    const account = await moon.getAccountsSDK().listAccounts();
    const provider = getDefaultProvider(RPC_URL);
    const contract = new Contract(ExpeditionGame, ExpeditionGame_ABI, provider);
    const player = await contract.getPLayerStats(
      router.query.game,
      account.data.data.keys[0]
    );
    let playerStats = [];
    playerStats[0] = player[player.length - 4].toString();
    const slice = player.slice(2, player.length - 4);
    playerStats[1] = slice.flat().join("");
    playerStats[2] = player[player.length - 2].toString();
    setPlayer(playerStats);
    console.log(playerStats[1]);
    setDiceLength(5 - playerStats[1].length);
    console.log(inputValues);
  };
  const rollHandler = async () => {
    setIsLoading(true);
    console.log("rolling");
    console.log(gameLogs[0]);
    const account = await moon.getAccountsSDK().listAccounts();
    console.log(account.data.data.keys[0]);
    const contract = new Contract(ExpeditionGame, ExpeditionGame_ABI);
    const data = contract.interface.encodeFunctionData("rollDice", [
      router.query.game,
    ]);
    const raw_tx = await moon
      .getAccountsSDK()
      .signTransaction(account.data.data.keys[0], {
        to: ExpeditionGame,
        data: data,
        gasPrice: "1000000000",
        gas: "300000",
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
    console.log(res);
    await sleep(30000);
    const provider = getDefaultProvider(RPC_URL);
    const c2 = new Contract(ExpeditionGame, ExpeditionGame_ABI, provider);
    const player = await c2.getPLayerStats(
      gameLogs[0],
      account.data.data.keys[0]
    );
    const roll = await c2.getRollRequests(
      account.data.data.keys[0],
      player[player.length - 2]
    );
    console.log(roll[3]);
    let results = [];
    for (let i = 0; i < roll[3].length; i++) {
      results.push(roll[3][i].toString());
    }
    setRollResults(results);
    console.log(results);
    setIsLoading(false);
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const saveHandler = async () => {
    console.log("saving");
    setIsLoading(true);
    const provider = getDefaultProvider(RPC_URL);
    const c2 = new Contract(ExpeditionGame, ExpeditionGame_ABI, provider);
    const account = await moon.getAccountsSDK().listAccounts();
    const player = await c2.getPLayerStats(
      gameLogs[0],
      account.data.data.keys[0]
    );
    const rollReq = player[player.length - 2];
    console.log(account.data.data.keys[0]);
    let saveValues = [];
    for (let i = 0; i < inputValues.length; i++) {
      if (inputValues[i] !== "") {
        saveValues.push(inputValues[i]);
      }
    }
    const contract = new Contract(ExpeditionGame, ExpeditionGame_ABI);
    const data = contract.interface.encodeFunctionData("saveRoll", [
      router.query.game,
      rollReq,
      saveValues,
    ]);
    const raw_tx = await moon
      .getAccountsSDK()
      .signTransaction(account.data.data.keys[0], {
        to: ExpeditionGame,
        data: data,
        gasPrice: "1000000000",
        gas: "300000",
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
    console.log(res);
    setIsLoading(false);
  };
  const foldHandler = () => {};
  return (
    <Box>
      <Header />
      <Flex
        justify="space-between"
        align="center"
        p={4}
        width={"60%"}
        mx={"auto"}
      >
        <Flex alignItems={"center"} onClick={getPlayer}>
          <Text color="white" fontWeight="bold" fontSize={26}>
            Current Roll:{" "}
          </Text>{" "}
          <Text color="#00fb0d" fontWeight="bold" fontSize={26}>
            {player[0]}
          </Text>
        </Flex>
        <Flex alignItems={"center"}>
          <Text color="white" fontWeight="bold" fontSize={26}>
            Game Pot Value:{" "}
          </Text>{" "}
          <Text color="#00fb0d" fontWeight="bold" fontSize={26}>
            {gameLogs[1]}
          </Text>
        </Flex>
        <Flex alignItems={"center"}>
          <Text color="white" fontWeight="bold" fontSize={26}>
            Mode:{" "}
          </Text>{" "}
          <Text color="#00fb0d" fontWeight="bold" fontSize={26}>
            {"Expedition"}
          </Text>
        </Flex>
      </Flex>
      <Box color="#00fb0d" maxH={"30px"} ml={"76%"} textAlign={"center"}>
        {gameLogs.map((log, index) => (
          <Text key={index}>{log}</Text>
        ))}
      </Box>
      <Flex alignItems={"center"} justify={"center"}>
        <Text color="white" fontSize={32} fontWeight={"bold"}>
          Current Hand:{" "}
        </Text>{" "}
        <Text color="#00fb0d" fontSize={32} fontWeight={"bold"}>
          {player[1]}
        </Text>
      </Flex>
      <Flex justify="center" align={"center"} h="20vh">
        {Array.from({ length: diceLength }).map((_, index) => (
          <Box
            key={index}
            w={"60px"}
            h={"60px"}
            bg="#00838f"
            m={2}
            borderRadius={12}
            border="3px solid"
            borderColor={"#00E5FF"}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text color="white" fontSize={"30"} fontWeight={"bold"}>
              {rollResults[index] || "0"}
            </Text>
          </Box>
        ))}
      </Flex>
      <Flex justify="center" align={"center"} h="10vh">
        {Array.from({ length: diceLength }).map((_, index) => (
          <Input
            key={index}
            w={"60px"}
            h={"60px"}
            bg="white"
            m={2}
            borderRadius={12}
            border="3px solid"
            borderColor={"#00E5FF"}
            display="flex"
            justifyContent="center"
            alignItems="center"
            value={inputValues[index] || ""}
            onChange={handleChange(index)}
          />
        ))}
      </Flex>
      <Flex justify="center" p={4} gap={20} marginTop={"10"}>
        <Button onClick={rollHandler}>Roll</Button>
        <Button onClick={saveHandler}>Save</Button>
        <Button onClick={foldHandler}>Fold</Button>
      </Flex>
      <Flex justify={"center"}>
        <Button colorScheme={"teal"} m={"30"}>
          Get Winner
        </Button>
      </Flex>
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

export default GamePage;

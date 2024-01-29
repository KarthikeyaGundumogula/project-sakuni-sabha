import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Header from "@/components/Header";

const GamePage = () => {
  const [logs, setLogs] = useState([
    "log1",
    "log2",
    "log3",
    "log4",
    "log5",
    "log6",
    "log7",
    "log8",
    "log9",
    "log10",
  ]);

  useEffect(() => {
    // Subscribe to the game log event
    const handleLog = (log) => {
      setLogs((prevLogs) => {
        // If there are already 10 logs, remove the first one
        if (prevLogs.length === 10) {
          return [...prevLogs.slice(1), log];
        } else {
          return [...prevLogs, log];
        }
      });
    };

    handleLog("log11");
  }, []);
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
        <Flex alignItems={"center"}>
          <Text color="white" fontWeight="bold" fontSize={26}>
            Current Round:{" "}
          </Text>{" "}
          <Text color="#00fb0d" fontWeight="bold" fontSize={26}>
            {100}
          </Text>
        </Flex>
        <Flex alignItems={"center"}>
          <Text color="white" fontWeight="bold" fontSize={26}>
            Game Pot Value:{" "}
          </Text>{" "}
          <Text color="#00fb0d" fontWeight="bold" fontSize={26}>
            {100}
          </Text>
        </Flex>
        <Flex alignItems={"center"}>
          <Text color="white" fontWeight="bold" fontSize={26}>
            Completed-Players:{" "}
          </Text>{" "}
          <Text color="#00fb0d" fontWeight="bold" fontSize={26}>
            {100}
          </Text>
        </Flex>
      </Flex>
      <Box color="#00fb0d" maxH={"30px"} ml={"90%"}>
        {logs.map((log, index) => (
          <Text key={index}>{log}</Text>
        ))}
      </Box>
      <Flex alignItems={"center"} justify={"center"}>
        <Text color="white" fontSize={32} fontWeight={"bold"}>
          Current Hand:{" "}
        </Text>{" "}
        <Text
          color="#00fb0d"
          fontSize={32}
          fontWeight={"bold"}
        >{`${10},${20},${30}`}</Text>
      </Flex>
      <Flex justify="center" align={"center"} h="40vh">
        {Array.from({ length: 5 }).map((_, index) => (
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
              5
            </Text>
          </Box>
        ))}
      </Flex>
      <Flex justify="center" p={4} gap={20} marginTop={""}>
        <Button>Roll</Button>
        <Button>Save</Button>
        <Button>Fold</Button>
      </Flex>
    </Box>
  );
};

export default GamePage;

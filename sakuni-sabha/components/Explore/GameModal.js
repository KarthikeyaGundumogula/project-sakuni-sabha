import React from "react";
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
  Text,
  Flex,
} from "@chakra-ui/react";

const GameModal = ({ game }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              <Text color="#00fb0d">{1}</Text>
            </Flex>
            <Flex alignItems={"center"}>
              <Text color="white">Game Pot Value: </Text>{" "}
              <Text color="#00fb0d">{100}</Text>
            </Flex>
            <Flex alignItems={"center"}>
              <Text color="white">Game Status: </Text>
              {"  "}
              <Text color="#00fb0d">{"Created"}</Text>
            </Flex>
            <Flex alignItems={"center"}>
              <Text color="white">Entry Bet:</Text>{" "}
              <Text color="#00fb0d">{20}</Text>
            </Flex>
            <Flex alignItems={"center"}>
              <Text color="white">Max Raise Value:</Text>{" "}
              <Text color="#00fb0d">{30}</Text>
            </Flex>
            <Flex alignItems={"center"}>
              <Text color="white">Number Of Players:</Text>{" "}
              <Text color="#00fb0d">{5}</Text>
            </Flex>
            <Flex alignItems={"center"}>
              <Text color="white">Game Vacancy:</Text>{" "}
              <Text color="#00fb0d">{3}</Text>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme={"teal"}>Join Game</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GameModal;

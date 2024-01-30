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

const CreateGameModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();

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
          <ModalHeader>Buy Tokens</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Input
                ref={initialRef}
                placeholder="Entry Bet"
                color={"#00fb0d"}
              />
              <Input
                ref={initialRef}
                placeholder="Max Raise"
                color={"#00fb0d"}
              />
              <Input
                ref={initialRef}
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
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateGameModal;

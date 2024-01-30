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

const BuyAssetModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();

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
              <Input ref={initialRef} placeholder="Amount" color={"#00fb0d"} />
              <Select placeholder="Select option" color="#00FB0D">
                <option value="option1">Imperial Apex(100000VLR)</option>
                <option value="option2">Citadel (75000VLR)</option>
                <option value="option3">Grandeur (50000VLR)</option>
                <option value="option4">Fortress (25000)</option>
                <option value="option5">Castle (20000VLR)</option>
                <option value="option6">Stronghold (10000)</option>
                <option value="option7">Bastion (7500)</option>
              </Select>
              <Text>Velars: 100</Text>{" "}
              {/* Replace 100 with the actual balance */}
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

export default BuyAssetModal;

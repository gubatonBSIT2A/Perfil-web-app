import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  HStack,
} from "@chakra-ui/react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../utils/init-firebase";
import { DeleteIcon } from "@chakra-ui/icons";

export default function DeleteEstablishment({ data }) {
  //destructure data
  const { id, name, } = data;
  const { isOpen, onOpen, onClose } = useDisclosure();

  //delete data from firebase
  async function deleteData(values) {
    const collectionRef = doc(db, "establishments", id);
    await deleteDoc(collectionRef);
  }
  return (
    <>
      <Button
        w="194px"
        variant="ghost"
        rightIcon={<DeleteIcon />}
        justifyContent="space-between"
        fontWeight="normal"
        fontSize="sm"
        colorScheme="red"
        onClick={() => {
          onOpen();
        }}
      >
        Delete Establishment
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"md"}>
        {""}
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Delete Establishment </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <HStack>
              <Text>Are you sure you want to delete </Text>
              <Text fontWeight={"bold"}>{name} </Text> 
              <Text>?</Text>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button w={"100%"} colorScheme="red" onClick={deleteData}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

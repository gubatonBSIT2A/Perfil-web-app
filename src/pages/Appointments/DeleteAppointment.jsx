import {
  IconButton,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Text,
  ModalFooter,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { db } from "../../utils/init-firebase";
import { doc, deleteDoc } from "firebase/firestore";
export default function DeleteAppointment({ data }) {
  const {id} = data;
  const { isOpen, onOpen, onClose } = useDisclosure();
  async function deleteData(values) {
    const collectionRef = doc(db, "appointments", id);
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
        Delete
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"md"}>
        {""}
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Delete Establishment </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text>Are you sure on deleting this appointment?</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              w={"100%"}
              colorScheme="red"
              onClick={() => {
                deleteData();
                onClose();
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

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
} from "@chakra-ui/react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../utils/init-firebase";
import { DeleteIcon } from "@chakra-ui/icons";

export default function DeleteExaminePatient({ data }) {
  //destructure data
  const { id } = data;
  const { isOpen, onOpen, onClose } = useDisclosure();

  //delete data from firebase
  async function deleteData(values) {
    const collectionRef = doc(db, "exam-results", id);
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
          <ModalHeader>Delete Examined Patient</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text>Are you sure on deleting this entry?</Text>
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

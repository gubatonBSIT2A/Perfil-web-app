import React from "react";
import {
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalHeader,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { BsFilePost } from "react-icons/bs";
import { Form, Field, Formik } from "formik";
import { db } from "../../utils/init-firebase";
import { collection, addDoc } from "firebase/firestore";
import { AddIcon } from "@chakra-ui/icons";
export default function CreateExamination({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const initialRef = React.useRef(null);
  async function newExamination(values) {
    const collectionRef = collection(db, "examinations");
    await addDoc(collectionRef, {
      name: values.name,
      establishment: data.establishment,
      appointment: data.id,
    });
  }
  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        justifyContent="space-between"
        colorScheme="green"
        onClick={() => {
          onOpen();
        }}
      >
        Create Examination
      </Button>
      <Modal
        size={"xl"}
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader borderBottomWidth="1px">Create Examination</ModalHeader>
          <Formik
            initialValues={{
              description: "",
            }}
            onSubmit={(values, actions) => {
              newExamination(values)
                .then(() => {
                  toast({
                    title: "Success",
                    description: "Examination created successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                  actions.setSubmitting(false);
                  onClose();
                })
                .catch((err) => {
                  toast({
                    title: "Error",
                    description: "Examination name is required",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                  actions.setSubmitting(false);
                });
            }}
          >
            {(props) => (
              <Form>
                <ModalBody>
                  <Stack spacing={3} pt={"5"}>
                    <Field name="name">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <FormLabel htmlFor="name">
                            Examination Name
                          </FormLabel>
                          <Input
                            fontSize={20}
                            ref={initialRef}
                            {...field}
                            id="name"
                          />
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Stack>
                </ModalBody>
                <ModalFooter>
                  <Button
                    w={"100%"}
                    colorScheme="blue"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}

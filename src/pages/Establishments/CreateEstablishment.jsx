import { AddIcon } from "@chakra-ui/icons";
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
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import React from "react";
import { Form, Field, Formik } from "formik";
import { db } from "../../utils/init-firebase";
import { collection, addDoc } from "firebase/firestore";
import { Colors } from "../../ColorConstants";
export default function CreateEstablishment() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const field = React.useRef();

  async function newEstablishment(values) {
    const collectionRef = collection(db, "establishments");
    const color = Math.floor(Math.random() * Colors.length);
    await addDoc(collectionRef, {
      name: values.name,
      owner: values.owner,
      location: values.location,
      color: Colors[color],
    });
  }
  return (
    <>
      <Button leftIcon={<AddIcon />} onClick={onOpen} colorScheme="green">
        Establishment
      </Button>
      <Modal size={"md"} isOpen={isOpen} initialFocusRef={field} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader borderBottomWidth="1px">
            Create New Establishment
          </ModalHeader>
          <Formik
            initialValues={{}}
            onSubmit={(values, actions) => {
              newEstablishment(values)
                .then(() => {
                  toast({
                    title: "Success",
                    description: "Establishment created successfully",
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
                    description: "All fields are required",
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
                  <Stack spacing={2}>
                    <Box>
                      <Field name="name">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel htmlFor="name">
                              Establishment Name
                            </FormLabel>
                            <Input {...field} id="name" />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box>
                      <Field name="owner">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.owner && form.touched.owner}
                          >
                            <FormLabel htmlFor="owner">Owner</FormLabel>
                            <Input {...field} id="owner" />
                            <FormErrorMessage>
                              {form.errors.owner}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box>
                      <Field name="location">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.location && form.touched.location
                            }
                          >
                            <FormLabel htmlFor="location">Location</FormLabel>
                            <Input {...field} id="location" />
                            <FormErrorMessage>
                              {form.errors.location}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                  </Stack>
                </ModalBody>
                <ModalFooter borderTopWidth="1px">
                  <Button
                    w={'100%'}
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

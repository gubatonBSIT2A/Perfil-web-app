import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useAuth } from "../../contexts/AuthContext";


export default function Create() {
  const { manualLogin } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const toast = useToast();
  const firstField = React.useRef();

  return (
    <>
      <Button
        ref={btnRef}
        leftIcon={<AddIcon />}
        colorScheme="green"
        onClick={onOpen}
      >
         worker
      </Button>
      <Modal isOpen={isOpen} initialFocusRef={firstField} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader borderBottomWidth="1px">
            Add new Social Worker
          </ModalHeader>
          <Formik
            initialValues={{
              displayName: "",
              email: "",
              password: "",
            }}
            onSubmit={(values, actions) => {
              manualLogin(values)
                .then(() => {
                  toast({
                    title: "Success",
                    description: "User created successfully",
                    status: "success",
                    duration: 9000,
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
                    duration: 9000,
                    isClosable: true,
                  }, console.log(err));
                  actions.setSubmitting(false);
                });
            }}
          >
            {(props) => (
              <Form>
                <ModalBody>
                  <Stack spacing={4}>
                    <Box>
                      <Field name="displayName">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.displayName &&
                              form.touched.displayName
                            }
                          >
                            <FormLabel htmlFor="displayName">Name</FormLabel>
                            <Input {...field} id="displayName" />
                            <FormErrorMessage>
                              {form.errors.displayName}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Field name="email">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.email && form.touched.email}
                        >
                          <FormLabel htmlFor="email">Email Address</FormLabel>
                          <Input {...field} id="email" />
                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="password">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.password && form.touched.password}
                        >
                          <FormLabel htmlFor="password">Password</FormLabel>
                          <Input  {...field} id="password" />
                          <FormErrorMessage>
                            {form.errors.password}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Stack>
                </ModalBody>

                <ModalFooter borderTopWidth="1px">
                  <Button
                    mr={3}
                    colorScheme="blue"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
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

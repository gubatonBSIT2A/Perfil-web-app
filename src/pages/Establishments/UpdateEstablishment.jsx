import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  VStack,
  Input,
  FormErrorMessage,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormLabel,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { Form, Formik, Field } from "formik";
import { db } from "../../utils/init-firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function UpdateEstablishment({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const field = React.useRef();

  async function updateData(values) {
    const documentId = JSON.parse(JSON.stringify(values.id));
    const collectionRef = doc(db, "establishments", documentId);
    await updateDoc(collectionRef, {
      ...values,
    });
  }

  return (
    <>
      <Button
        w="194px"
        variant="ghost"
        rightIcon={<EditIcon />}
        justifyContent="space-between"
        fontWeight="normal"
        fontSize="sm"
        colorScheme="yellow"
        onClick={() => {
          onOpen();
        }}
      >
        Update Details
      </Button>

      <Modal
        initialFocusRef={field}
        isOpen={isOpen}
        onClose={onClose}
        size={"sm"}
      >
        {" "}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Establishment Details</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              ...data,
            }}
            onSubmit={(values, actions) => {
              updateData(values)
                .then(() => {
                  toast({
                    title: "Success",
                    description: "Establishment Updated Successfully",
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                  });
                  actions.setSubmitting(false);
                  onClose();
                })
                .catch((error) => {
                  toast({
                    title: "Error",
                    description: error.message,
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
                  <FormControl>
                    <VStack align={"left"}>
                      <Field name="name">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel htmlFor="name">
                              EstablishmentName
                            </FormLabel>
                            <Input {...field} id="name" placeholder="name" />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="owner">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.owner && form.touched.owner}
                          >
                            <FormLabel htmlFor="owner">owner Address</FormLabel>
                            <Input {...field} id="owner" placeholder="owner" />
                            <FormErrorMessage>
                              {form.errors.owner}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="location">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.location && form.touched.location
                            }
                          >
                            <FormLabel htmlFor="location">
                              location Address
                            </FormLabel>
                            <Input
                              {...field}
                              id="location"
                              placeholder="location"
                            />
                            <FormErrorMessage>
                              {form.errors.location}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </VStack>
                  </FormControl>
                </ModalBody>
                <ModalFooter borderTopWidth="1px">
                  <Button
                   w={'100%'}
                    isLoading={props.isSubmitting}
                    type="submit"
                    colorScheme="blue"
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

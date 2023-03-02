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
  FormControl,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { Form, Formik, Field } from "formik";
import { db } from "../../utils/init-firebase";
import { doc, updateDoc } from "firebase/firestore";
export default function UpdateAnnouncement({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const initialRef = React.useRef(null);
  async function updateData(values) {
    const documentId = JSON.parse(JSON.stringify(values.id));
    const collectionRef = doc(db, "announcements", documentId);
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
        Update
      </Button>

      <Modal
        size={"xl"}
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        {" "}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Announcement</ModalHeader>
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
                    description: "Announcement Updated Successfully",
                    status: "success",
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
                    <VStack align={"left"} spacing={3} pt={"5"}>
                      <Field name="title">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.title && form.touched.title}
                          >
                            <Input
                              variant={"unstyled"}
                              ref={initialRef}
                              {...field}
                              id="title"
                              placeholder="title"
                            />
                            <FormErrorMessage>
                              {form.errors.title}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="description">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.description &&
                              form.touched.description
                            }
                          >
                            <Textarea
                            variant={"filled"}
                              {...field}
                              id="description"
                              placeholder="description"
                            />
                            <FormErrorMessage>
                              {form.errors.description}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </VStack>
                  </FormControl>
                </ModalBody>
                <ModalFooter >
                  <Button
                     w={"100%"}
                    isLoading={props.isSubmitting}
                    type="submit"
                    colorScheme="blue"
                    
                  >
                    Save
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

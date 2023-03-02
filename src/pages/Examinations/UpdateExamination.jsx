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
  useToast,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { Form, Formik, Field } from "formik";
import { db } from "../../utils/init-firebase";
import { doc, updateDoc } from "firebase/firestore";
export default function UpdateExamination({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const initialRef = React.useRef(null);
  async function updateData(values) {
    const documentId = JSON.parse(JSON.stringify(values.id));
    const collectionRef = doc(db, "examinations", documentId);
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
          <ModalHeader>Update Examination</ModalHeader>
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
                    description: "Examination Updated Successfully",
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
                      <Field name="name">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <Input
                              variant={"unstyled"}
                              ref={initialRef}
                              {...field}
                              id="name"
                              placeholder="name"
                            />
                            <FormErrorMessage>
                              {form.errors.name}
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

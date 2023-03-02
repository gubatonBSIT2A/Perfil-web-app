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
  Textarea,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { BsFilePost } from "react-icons/bs";
import { Form, Field, Formik } from "formik";
import { db } from "../../utils/init-firebase";
import { collection, addDoc } from "firebase/firestore";
export default function CreateAnnouncement({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  //date today converted to unix timestamp
  const dateCreated = Math.floor(new Date().getTime() / 1000);

  const initialRef = React.useRef(null);
  async function newAnnouncement(values) {
    const collectionRef = collection(db, "announcements");
    await addDoc(collectionRef, {
      title: values.title,
      description: values.description,
      establishment: data.id,
      dateCreated: dateCreated,
    });
  }
  return (
    <>
      <Button
        w="194px"
        variant="ghost"
        rightIcon={<BsFilePost />}
        justifyContent="space-between"
        fontWeight="normal"
        fontSize="sm"
        colorScheme="green"
        onClick={() => {
          onOpen();
        }}
      >
        Create Announcement
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
          <ModalHeader borderBottomWidth="1px">Create Announcement</ModalHeader>
          <Formik
            initialValues={{
              description: "",
            }}
            onSubmit={(values, actions) => {
              newAnnouncement(values)
                .then(() => {
                  toast({
                    title: "Success",
                    description: "Announcement created successfully",
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
                    description: "title is required",
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
                    <Field name="title">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.title && form.touched.title}
                        >
                          <Input
                            fontSize={20}
                            ref={initialRef}
                            placeholder="Title"
                            {...field}
                            id="title"
                            variant={"unstyled"}
                          />
                          <FormErrorMessage>
                            {form.errors.title}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="description">
                      {({ field, form }) => (
                        <FormControl>
                          <Textarea
                            variant={"filled"}
                            placeholder={"Optional description"}
                            {...field}
                            id="description"
                          />
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
                    Post
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

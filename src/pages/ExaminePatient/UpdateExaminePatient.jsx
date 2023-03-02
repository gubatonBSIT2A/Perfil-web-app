import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  VStack,
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
  Box,
  Text,
  FormLabel,
} from "@chakra-ui/react";
import FormikControl from "../components/Fields/FormikControl";
import { EditIcon } from "@chakra-ui/icons";
import { Form, Formik, Field } from "formik";
import { db } from "../../utils/init-firebase";
import * as Yup from "yup";
import { doc, updateDoc } from "firebase/firestore";

export default function UpdateExaminePatient({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const resultType = [
    { key: "Positive", value: "Positive" },
    { key: "Negative", value: "Negative" },
  ];
  const diseaseType = [
    { key: "Gonorrhea", value: "Gonorrhea" },
    { key: "Syphilis", value: "Syphilis" },
    { key: "Trichomonas", value: "Trichomonasa" },
    { key: "Bacterial Vaginosis", value: "Bacterial Vaginosis" },
    { key: "Nan-Gono Inf", value: "Nan-Gono Inf" },
    { key: "Genital Herpes", value: "Genital Herpes" },
    { key: "Genital Warts", value: "Genital Warts" },
    { key: "Other specify to", value: "Other specify to" },
  ];
  console.log(data)
  async function updateData(values) {
    const documentId = JSON.parse(JSON.stringify(values.id));
    const collectionRef = doc(db, "exam-results", documentId);
    await updateDoc(collectionRef, {
      ...values,
    });
  }
  const validationSchema = Yup.object({
    examinedBy: Yup.string().required("Examined By is Required"),
    result: Yup.string().required("Required"),
    //if result is positive, diagnosis is required
    //  else nullable
    diagnosis: Yup.array().when("result", {
      is: "Positive",
      then: Yup.array().required("Diagnosis is Required"),
      otherwise: Yup.array().nullable(),
    }),
    receipt: Yup.string().when("diagnosis", {
      is: (diagnosis) =>
        diagnosis &&
        (diagnosis.includes("Gonorrhea") ||
          diagnosis.includes("Syphilis") ||
          diagnosis.includes("Trichomonas") ||
          diagnosis.includes("Bacterial Vaginosis") ||
          diagnosis.includes("Nan-Gono Inf") ||
          diagnosis.includes("Genital Herpes") ||
          diagnosis.includes("Genital Warts")),
      then: Yup.string().required("Medical Prescription is Required"),
      otherwise: Yup.string().nullable(),
    }),
    remarks: Yup.string().when("diagnosis", {
      // check if diagnosis is not empty and has a value of other specify
      // to then log to the console if true or false if true require remarks
      is: (diagnosis) => diagnosis && diagnosis.includes("Other specify to"),
      then: Yup.string().required("Remarks is Required"),
      otherwise: Yup.string().nullable(),
    }),
  });
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

      <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
        {" "}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Examined Patient Result</ModalHeader>
          <ModalCloseButton />
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              ...data,
            }}
            onSubmit={(values, actions) => {
              updateData(values)
                .then(() => {
                  toast({
                    title: "Success",
                    description: "Result Updated Successfully",
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
                    <VStack align={"left"} spacing={10} pt={"5"}>
                      <Box>
                        <FormLabel>Patient's Name</FormLabel>
                        <Text>
                          {data.patientFirstName} {data.patientMiddleName}{" "}
                          {data.patientLastName}
                        </Text>
                      </Box>
                      <FormikControl
                        control="input"
                        name="examinedBy"
                        label="Examined By"
                      />
                      <FormikControl
                        control="select"
                        name="result"
                        label="Result"
                        options={resultType}
                      />
                      {props.values.result === "Positive" ? (
                        <FormikControl
                          control="checkbox"
                          name="diagnosis"
                          label="Diagnosis (Check Appropriate disease)"
                          options={diseaseType}
                        />
                      ) : null}
                      {props.values.diagnosis &&
                        (props.values.diagnosis.includes("Gonorrhea") ||
                          props.values.diagnosis.includes("Syphilis") ||
                          props.values.diagnosis.includes("Trichomonas") ||
                          props.values.diagnosis.includes(
                            "Bacterial Vaginosis"
                          ) ||
                          props.values.diagnosis.includes("Nan-Gono Inf") ||
                          props.values.diagnosis.includes("Genital Herpes") ||
                          props.values.diagnosis.includes("Genital Warts")) ? (
                        <Field name="receipt">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.receipt && form.touched.receipt
                              }
                            >
                              <FormLabel htmlFor="receipt">
                                Medical Prescription
                              </FormLabel>
                              <Textarea
                                {...field}
                                id="receipt"
                                placeholder="enter medical prescription"
                              />
                              <FormErrorMessage>
                                {form.errors.receipt}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      ) : null}
                      {/* if Other specify to will be unchecked set remarks value '' */}
                      {props.values.diagnosis &&
                        props.values.diagnosis.includes("Other specify to")
                        ? null
                        : (props.values.remarks = "")}
                      {props.values.diagnosis &&
                        props.values.diagnosis.includes("Other specify to") ? (
                        <Field name="remarks">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.remarks && form.touched.remarks
                              }
                            >
                              <FormLabel htmlFor="remarks">Remarks</FormLabel>
                              <Textarea
                                {...field}
                                id="remarks"
                                placeholder="Remarks"
                              />
                              <FormErrorMessage>
                                {form.errors.remarks}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      ) : null}
                    </VStack>
                  </FormControl>
                </ModalBody>
                <ModalFooter>
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

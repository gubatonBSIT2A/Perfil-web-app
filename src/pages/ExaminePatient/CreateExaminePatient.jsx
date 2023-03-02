import React, { useState, useEffect } from "react";
import {
  Button,
  useToast,
  FormErrorMessage,
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
  FormLabel,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Form, Formik, Field } from "formik";
import { db } from "../../utils/init-firebase";
import {
  addDoc,
  query,
  collection,
  onSnapshot,
  where,
  getDocs,
} from "firebase/firestore";
import { AddIcon } from "@chakra-ui/icons";
import FormikControl from "../components/Fields/FormikControl";
export default function CreateExaminePatient({ data }) {
  const toast = useToast();
  const { establishment, appointment, id, name } = data;
  const { isOpen, onOpen, onClose } = useDisclosure();
  // dateExamined equals to the current date
  const dateExamined = new Date();
  // dona equal to dateExamined + 14 days
  const dona = new Date(dateExamined.getTime() + 14 * 24 * 60 * 60 * 1000);
  //convert dateExamined and dona to unix
  const dateExaminedConverted = Math.floor(dateExamined / 1000);
  const donaConverted = Math.floor(dona / 1000);
  //patient data
  const [patient, setPatient] = useState([]);
  const [indivPatient, setIndivPatient] = useState([]);
  const Patients = () => {
    //fetch patient data from firestore
    const usersCollectionRef = collection(db, "patients");
    //fetch patient where establishment id is equal to the 
    //current establishment id
    const establishmentRef = query(
      usersCollectionRef,
      where("establishment", "==", establishment)
    );
    onSnapshot(establishmentRef, (snapshot) => {
      let patientData = [];
      snapshot.docs.forEach((doc) => {
        patientData.push({ ...doc.data(), id: doc.id });
      });
      setPatient(patientData);
    });
  };

  const IndivPatient = () => {
    const usersCollectionRef = collection(db, "patients");
    const resultsRef = query(
      usersCollectionRef,
      where("refId", "==", data.patientId),
      // where("appointmentId", "==", data.appointmentId)
    );
    onSnapshot(resultsRef, (snapshot) => {
      let patientData = [];
      snapshot.docs.forEach((doc) => {
        patientData.push({ ...doc.data(), id: doc.id });
      });
      setIndivPatient(patientData);
    });
  }

  const indivPatientOptions = indivPatient.map((patient) => ({
    key: `${patient.firstName} ${patient.middleName} ${patient.lastName}`,
    value: [
      `${patient.id}`,
      `${patient.firstName}`,
      `${patient.middleName}`,
      `${patient.lastName}`,
      `${patient.gender}`,
      `${patient.highestEducation}`,
      `${patient.city}`,
      `${patient.barangay}`,
      `${patient.civilStatus}`,
      //convert patient.birthday from String to date and subtract it to the 
      //current date to get the age
      `${new Date().getFullYear() - new Date(patient.birthday).getFullYear()}`,
    ],
  }));
  // console.log(indivPatientOptions)


  //map patient data to select
  const patientOptions = patient.map((patient) => ({
    key: `${patient.firstName} ${patient.middleName} ${patient.lastName}`,
    //value are in an array string of patient id and patient name
    value: [
      `${patient.id}`,
      `${patient.firstName}`,
      `${patient.middleName}`,
      `${patient.lastName}`,
      `${patient.gender}`,
      `${patient.highestEducation}`,
      `${patient.city}`,
      `${patient.barangay}`,
      `${patient.civilStatus}`,
      //convert patient.birthday from String to date and subtract it to the 
      //current date to get the age
      `${new Date().getFullYear() - new Date(patient.birthday).getFullYear()}`,
    ],
  }));

  // result type constants
  const resultType = [
    { key: "Positive", value: "Positive" },
    { key: "Negative", value: "Negative" },
  ];

  const diseaseType = [
    { key: "Gonorrhea", value: "Gonorrhea" },
    { key: "Syphilis", value: "Syphilis" },
    { key: "Trichomonas", value: "Trichomonas" },
    { key: "Bacterial Vaginosis", value: "Bacterial Vaginosis" },
    { key: "Nan-Gono Inf", value: "Nan-Gono Inf" },
    { key: "Genital Herpes", value: "Genital Herpes" },
    { key: "Genital Warts", value: "Genital Warts" },
    { key: "Other specify to", value: "Other specify to" },
  ];

  const initialRef = React.useRef(null);

  async function newExam(values) {
    const collectionRef = collection(db, "exam-results");

    const checkIfDocExist = query(
      collectionRef,
      where("patientId", "==", values.patient.split(",")[0].trim()),
      where("appointmentId", "==", id)
    );


    const snapshot = await getDocs(checkIfDocExist);

    if (snapshot.empty) {
      try {
        const docRef = await addDoc(collectionRef, {
          establishmentId: establishment,
          appointmentId: id,
          // appointmentId: data.patientCategory === "Individual Positive Patient" ? data.appointmentId : id,
          dateExamined: dateExaminedConverted,
          dona: donaConverted,
          examinationName: "Gram Stain",
          //parse patient value to get patient id, first name, middle name 
          //and last name and assign each to an object
          patientId: values.patient.split(",")[0].trim(),
          patientFirstName: values.patient.split(",")[1].trim(),
          patientMiddleName: values.patient.split(",")[2].trim(),
          patientLastName: values.patient.split(",")[3].trim(),
          patientGender: values.patient.split(",")[4].trim(),
          patientHighestEducation: values.patient.split(",")[5].trim(),
          patientCity: values.patient.split(",")[6].trim(),
          patientBarangay: values.patient.split(",")[7].trim(),
          patientCivilStatus: values.patient.split(",")[8].trim(),
          patientAge: values.patient.split(",")[9].trim(),
          examinedBy: values.examinedBy,
          result: values.result,
          diagnosis: values.diagnosis,
          receipt: values.receipt,
          remarks: values.remarks,
        });
        toast({
          title: "Patient result added.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      } catch (e) {
        toast({
          title: "Error adding patient result.",
          status: "error",
          duration: 3000,
          isClosable: true,

        }
        );
        // console.log(e)
      }
    } else {
      toast({
        title: "Patient result already exist.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }
  }
  const validationSchema = Yup.object({
    patient: Yup.string().required("Patient is Required"),
    examinedBy: Yup.string().required("Examined By is Required"),
    result: Yup.string().required("Result is Required"),
    //if result is positive, diagnosis is required else nullable
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
      // check if diagnosis is not empty and has a value of other specify to
      // then log to the console if true or false if true require remarks
      is: (diagnosis) => diagnosis && diagnosis.includes("Other specify to"),
      then: Yup.string().required("Remarks is Required"),
      otherwise: Yup.string().nullable(),
    }),
  });

  useEffect(() => {
    Patients();
    IndivPatient();
  }, []);
  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        colorScheme="green"
        onClick={() => {
          onOpen();
        }}
      >
        Patient Result
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
          <ModalHeader borderBottomWidth="1px">Add Patient result</ModalHeader>
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              patient: "",
              examinedBy: "",
              result: "",
              diagnosis: "",
              remarks: "",
              receipt: "",
            }}
            onSubmit={(values, actions) => {
              newExam(values);
            }}

          // log all values
          // onSubmit={(values) => {
          //   console.log(values);
          //   console.log(data)
          // }}
          >
            {(props) => (
              <Form>
                <ModalBody>
                  <Stack spacing={3} pt={"5"}>
                    <FormikControl
                      control="select"
                      name="patient"
                      label="Patient"
                      options={
                        //if patientCategory is = "Individual Positive Patient" use indivPatient else use patientData
                        data.patientCategory === "Individual Positive Patient" ? indivPatientOptions : patientOptions
                      }
                    />
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
                    {/* if result === Positive show checkbox else hide */}
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
                        props.values.diagnosis.includes("Bacterial Vaginosis") ||
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
                    {/* if Other Specify to is checked show */}
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

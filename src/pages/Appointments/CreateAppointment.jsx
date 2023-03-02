import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  FormErrorMessage,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormLabel,
  Stack,
  FormControl,
  useToast,
  Box,
  Input,
} from "@chakra-ui/react";
import FormikControl from "../components/Fields/FormikControl";
import * as Yup from "yup";
import { BsFilePost } from "react-icons/bs";
import { Form, Formik } from "formik";
import { db } from "../../utils/init-firebase";
import {
  addDoc,
  query,
  collection,
  onSnapshot,
  where,
  getDocs,
} from "firebase/firestore";
import { Colors } from "../../ColorConstants";
export default function CreateAnnouncement({ data }) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [positivePatients, setPositivePatients] = useState([])

  const appointmentTypes = [
    { key: 'All', value: 'All' },
    // { key: 'Positive Patients Only', value: 'Positive Patients Only' },
    { key: 'Individual Positive Patient', value: 'Individual Positive Patient' },
  ]

  const PositivePatients = () => {
    // fetch data from exam-results collection where result is 
    // Positive and where establishmentId is equal to data.id
    const examResultsRef = collection(db, "exam-results");
    const examRef = query(examResultsRef,
      where("result", "==", "Positive"),
      where("establishmentId", "==", data.id)
    );
    onSnapshot(examRef, (snapshot) => {
      let positivePatients = [];
      snapshot.docs.forEach((doc) => {
        positivePatients.push({ ...doc.data(), id: doc.id });
      });
      setPositivePatients(positivePatients);
    });
    //log positive patients
    // console.log(positivePatients)
  }


  const positivepatientOptions = positivePatients.map((positivePatient) => {
    const date = new Date(positivePatient.dateExamined * 1000);
    const formattedDate = date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });

    return {
      key: `${positivePatient.patientFirstName} ${positivePatient.patientMiddleName} ${positivePatient.patientLastName} ${formattedDate}`,
      value: [
        `${positivePatient.patientId}`,
        `${positivePatient.patientFirstName}`,
        `${positivePatient.patientMiddleName}`,
        `${positivePatient.patientLastName}`,
        `${positivePatient.result}`,
        `${positivePatient.appointmentId}`,
        `${positivePatient.dateExamined}`
      ],
    };
  });
  async function newAppointment(values) {
    const color = Math.floor(Math.random() * Colors.length);
    const collectionRef = collection(db, "appointments");

    const checkIfDocExist = query(
      collectionRef,
      where("establishment", "==", data.id),
      where("title", "==", values.title),
      where("start", "==", values.start),
      where("end", "==", values.end)
    );
    const snapshot = await getDocs(checkIfDocExist);
    if (snapshot.empty) {
      try {
        const docRef = await addDoc(collectionRef, {
          title: values.title,
          start: values.start.getTime(),
          end: values.end.getTime(),
          establishment: data.id,
          patientCategory: values.patientCategory,
          //if patientCategory is equal to Individual Positive Patient
          //then add patientId, patientFirstName, patientMiddleName, patientLastName, results, appointmentId
          //else add null
          patientId: values.patientCategory === "Individual Positive Patient" ? values.positivePatients.split(",")[0].trim() : null,
          patientFirstName: values.patientCategory === "Individual Positive Patient" ? values.positivePatients.split(",")[1].trim() : null,
          patientMiddleName: values.patientCategory === "Individual Positive Patient" ? values.positivePatients.split(",")[2].trim() : null,
          patientLastName: values.patientCategory === "Individual Positive Patient" ? values.positivePatients.split(",")[3].trim() : null,
          results: values.patientCategory === "Individual Positive Patient" ? values.positivePatients.split(",")[4].trim() : null,
          appointmentId: values.patientCategory === "Individual Positive Patient" ? values.positivePatients.split(",")[5].trim() : null,
          dateExamined: values.patientCategory === "Individual Positive Patient" ? values.positivePatients.split(",")[6].trim() : null,
          backgroundColor: Colors[color],

        });
        toast({
          title: "Appointment created.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      } catch (e) {
        toast({
          title: "Error adding appointment.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        // console.log(e)
      }
    } else {
      toast({
        title: "Appointment already exist.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }
  }

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    patientCategory: Yup.string().required("Required"),
    // if patientCategory is equal to Individual Positive Patient 
    //then positivePatient is required else not required
    positivePatients: Yup.string().when("patientCategory", {
      is: "Individual Positive Patient",
      then: Yup.string().required("Required"),
      otherwise: Yup.string().nullable(),
    }),
    start: Yup.date().required("Required"),
    end: Yup.date().required("Required"),
  });

  useEffect(() => {
    PositivePatients();
  }, [])

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
        Create Appointment
      </Button>
      <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader borderBottomWidth="1px">Create Appointment</ModalHeader>
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              title: "",
              patientCategory: "",
              positivePatients: "",
              start: new Date(),
              end: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
            }}
            onSubmit={(values, actions) => {
              newAppointment(values);
            }}
          // onSubmit={(values, actions) => {
          //   console.log(values);
          // }}
          >
            {(props) => (
              <Form>
                <ModalBody>
                  <Stack spacing={3} pt={"5"}>
                    <FormikControl
                      control="input"
                      name="title"
                      label="Appointment Title"
                    />
                    <FormikControl
                      control="radio"
                      name="patientCategory"
                      label="Category of Patient"
                      options={appointmentTypes}
                    />
                    {/* if patientCategory is equal to Individual 
                    Positive Patient show select else hide*/}
                    {props.values.patientCategory === "Individual Positive Patient" ? (
                      <FormikControl
                        control="select"
                        name="positivePatients"
                        label="Select Positive Patient"
                        options={positivepatientOptions}
                      />
                    ) : null}

                    <FormikControl
                      control="date"
                      name="start"
                      label="Start Date"
                    />
                    <FormikControl
                      control="date"
                      name="end"
                      label="End Date"
                    />

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

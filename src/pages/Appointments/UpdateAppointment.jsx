import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Stack,
  useToast,
} from "@chakra-ui/react";
import FormikControl from "../components/Fields/FormikControl";
import { EditIcon } from "@chakra-ui/icons";
import { Form, Formik } from "formik";
import { db } from "../../utils/init-firebase";
import {
  doc, updateDoc,
  query,
  collection,
  onSnapshot,
  where,
} from "firebase/firestore";
export default function UpdateAppointment({ data }) {
  const { id, end, start } = data;
// convert start from milliseconds to date
  const startDate = new Date(start.seconds * 1000);
  const endDate = new Date(end.seconds * 1000);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [positivePatients, setPositivePatients] = useState([])

  const appointmentTypes = [
    { key: 'All', value: 'All' },
    // { key: 'Positve Patients Only', value: 'Positve Patients Only' },
    { key: 'Individual Positive Patient', value: 'Individual Positive Patient' },
  ]

  const PositivePatients = () => {
    // fetch data from exam-results collection where result is 
    // Positive and where establishmentId is equal to data.id
    const examResultsRef = collection(db, "exam-results");
    const examRef = query(examResultsRef,
      where("result", "==", "Positive"),
      where("establishmentId", "==", data.establishment)
    );
    onSnapshot(examRef, (snapshot) => {
      let positivePatients = [];
      snapshot.docs.forEach((doc) => {
        positivePatients.push({ ...doc.data(), id: doc.id });
      });
      setPositivePatients(positivePatients);
    });


  }
  // console.log(positivePatients)
  const positivepatientOptions = positivePatients.map((positivePatient) => ({
    key: `${positivePatient.patientFirstName} ${positivePatient.patientMiddleName} ${positivePatient.patientLastName}`,
    value: [
      // `${positivePatient.dateExamined}`,
      // `${positivePatient.diagnosis}`,
      // `${positivePatient.dona}`,
      // `${positivePatient.establishmentId}`,
      // `${positivePatient.examinationName}`,
      // `${positivePatient.examinedBy}`,
      // `${positivePatient.patientAge}`,
      // `${positivePatient.patientBarangay}`,
      // `${positivePatient.patientCity}`,
      // `${positivePatient.patientCivilStatus}`,
      // `${positivePatient.patientGender}`,
      // `${positivePatient.patientHighestEducation}`,
      `${positivePatient.patientId}`,
      // `${positivePatient.receipt}`,
      // `${positivePatient.remarks}`,
      `${positivePatient.patientFirstName}`,
      `${positivePatient.patientMiddleName}`,
      `${positivePatient.patientLastName}`,
      `${positivePatient.result}`,
      `${positivePatient.appointmentId}`,
    ],
  }));
  const toast = useToast();
  const initialRef = React.useRef(null);

  async function updateData(values) {
    const documentId = JSON.parse(JSON.stringify(id));
    const collectionRef = doc(db, "appointments", documentId);


    await updateDoc(collectionRef, {
      //convert start to milliseconds
      start: new Date(values.start).getTime(),
      end: new Date(values.end).getTime(),
       ...values
    });
  }

  useEffect(() => {
    PositivePatients();
    // console.log(data)
  }, [])

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
              positivePatients: `${data.patientFirstName} ${data.patientMiddleName} ${data.patientLastName}`,
              start: startDate,
              end: endDate,
              ...data
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
          // onSubmit={(values, actions) => {
          //   console.log('start date ' + new Date(values.start).getTime());
          //   console.log('end date ' + new Date(values.end).getTime());
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
                    {/* if patientCategory is equal to Individual Positive
                     Patient show select else hide*/}
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

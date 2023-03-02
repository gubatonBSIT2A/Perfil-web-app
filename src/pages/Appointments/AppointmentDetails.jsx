import React, { useState, useEffect } from "react";
import {
  Box,
  Stack, SimpleGrid,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Spacer,
  Text,
  Icon,
  VStack,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "../../components/layouts/Layout";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import { db } from "../../utils/init-firebase";
import { BsCalendarRange, BsFiles } from "react-icons/bs";
import CreateExamination from "../Examinations/CreateExamination";
import ExaminePatient from "../ExaminePatient/ExaminePatient";
import CreateExaminePatient from "../ExaminePatient/CreateExaminePatient";
import Examinations from "../Examinations/Examinations";
export default function AppointmentDetails() {
  const { state } = useLocation();
  const [data] = useState(() => {
    return (
      state?.details ||
      JSON.parse(window.localStorage.getItem("appointment")) ||
      {}
    );
  });

  const [patient, setPatient] = useState([]);
  const [noOfExaminedPatients, setNoOfExaminedPatients] = useState([]);
  const [noOfPositivePatients, setNoOfPositivePatients] = useState([])
  const [indivPatient, setIndivPatient] = useState([]);
  //fetch all patients
  const patientCollectionRef = collection(db, "patients");
  //fetch all examination results
  const examinationResultsCollectionRef = collection(db, "exam-results");

  //patients that belonged to the establishment
  const patientData = () => {
    //fetch patients that is belonged to the establishment
    const establishmentRef = query(
      patientCollectionRef,
      where("establishment", "==", data.establishment)
    );
    onSnapshot(establishmentRef, (snapshot) => {
      let patientData = [];
      snapshot.docs.forEach((doc) => {
        patientData.push({ ...doc.data(), id: doc.id });
      });
      setPatient(patientData);
    });
  };


  const countExamEntry = () => {
    //count all the documents in the exam-results collections that has the same examination id
    const examRef = query(
      examinationResultsCollectionRef,
      where("appointmentId", "==", data.id)
    );
    onSnapshot(examRef, (snapshot) => {
      let count = [];
      snapshot.docs.forEach((doc) => {
        count.push({ ...doc.data(), id: doc.id });
      });
      setNoOfExaminedPatients(count);
    });
  };

  const countPositiveInEntry = () => {
    //count all the documents in the exam-results collections that has the same examination id
    const examRef = query(
      examinationResultsCollectionRef,
      where("appointmentId", "==", data.id),
      where("result", "==", "Positive")
    );
    onSnapshot(examRef, (snapshot) => {
      let count = [];
      snapshot.docs.forEach((doc) => {
        count.push({ ...doc.data(), id: doc.id });
      });
      setNoOfPositivePatients(count);
    });
  };

  const getIndivPatientData = () => {
    const examRef = query(
      examinationResultsCollectionRef,
      where("appointmentId", "==", data.appointmentId),
      where("patientId", "==", data.patientId)
    );
    onSnapshot(examRef, (snapshot) => {
      let count = [];
      snapshot.docs.forEach((doc) => {
        count.push({ ...doc.data(), id: doc.id });
      });
      setIndivPatient(count);
    });
  };
  useEffect(() => {
    countPositiveInEntry();
    countExamEntry();
    patientData();
    getIndivPatientData();
    window.localStorage.setItem("appointment", JSON.stringify(data));
    window.localStorage.removeItem("examination");
  }, [data]);
  var startToMill = new Date(data.start);
  var endToMill = new Date(data.end);
  var startDateToString = startToMill.toDateString();
  var endDateToString = endToMill.toDateString();

  return (
    <Layout>
      <Flex
        align={{ base: "left", md: "center" }}
        flexDirection={{ base: "column", md: "row" }}
        pb={5}
      >
        <Heading> Appointment </Heading>
        <Spacer />

        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink color={"blue"}>
              {" "}
              <Link to={"/establishments"}> Establishments</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink color={"blue"}>
              <Link to={"/establishments/details"}>Details</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Appointment</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>
      <Box mt={2} w="100%" py={5} px={10} bg={'white'} borderRadius="lg">
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          align={{ base: "left", md: "center" }}
        >
          <Stack>
            <Text color={"black"}>Appointment Name</Text>
            <Text color={"black"} fontWeight={"bold"}>
              {data ? data.title : "error"}
            </Text>
          </Stack>
          <Spacer />
          <Stack>
            <Text color={"black"}>Appointment Date</Text>
            <Text color={"black"} fontWeight={"bold"}>
              {data ? startDateToString + " - " + endDateToString : "error"}
            </Text>
          </Stack>
          <Spacer />
          <Stack>
            <Text color={"black"}>Patient Category</Text>
            <Text color={"black"} fontWeight={"bold"}>
              {data ? data.patientCategory : "error"}
            </Text>
          </Stack>

        </Flex>
      </Box>
      <Flex mt={5}>
        <SimpleGrid w={"full"} pb={5} columns={{ md: 1, lg: data.patientCategory === "All" ? 3 : 4 }} spacing="24px">
          <Box bg={"white"} width={"100%"} p={5} borderRadius={"lg"}>
            <Stack>
              <Text color={"black"}>
                {data.patientCategory === "All" ? "Examination Name" : "Patient Name"}
              </Text>
              <Text color={"black"} fontWeight={"bold"}>
                {data.patientCategory === "All" ?
                  "Gram Stain"
                  : `${data.patientFirstName} ${data.patientMiddleName} ${data.patientLastName}`
                }
              </Text>
            </Stack>
          </Box>

          {data.patientCategory === "All" ? null :
            <Box bg={"white"} width={"100%"} p={5} borderRadius={"lg"}>
              <Stack>
                <Text color={"black"}>
                  Date Examined
                </Text>
                <Text color={"black"} fontWeight={"bold"}>
                  {new Date(data.dateExamined * 1000).toLocaleDateString(
                    "en-US",
                    {
                      month: '2-digit',
                      day: '2-digit',
                      year: 'numeric'

                    }
                  )}
                </Text>
              </Stack>
            </Box>}
          <Box width={"100%"} p={5} borderRadius={"lg"} bg={"white"}>
            <Stack>
              <Text color={"black"}>
                {data.patientCategory === "All" ? "No. of Examined Patients" : "Diagnosis"}
              </Text>
              <Text color={"black"} fontWeight={"bold"}>
                {data.patientCategory === "All" ? `${noOfExaminedPatients.length} / ${patient.length}` :
                  // map indivPatient.diagnosis that is in an array to ul

                  <Box px={5}>
                    {
                      indivPatient.map((patient) => {
                        return <ul>
                          {/* map patient.diagnosis */}
                          {patient.diagnosis.map((diagnosis) => {
                            return <li>{diagnosis}</li>
                          })}
                        </ul>
                      })
                    }
                  </Box>
                }

              </Text>
            </Stack>
          </Box>
          <Box width={"100%"} p={5} bg={"white"} borderRadius={"lg"}>
            <Stack>
              <Text color={"black"}>
                {data.patientCategory === "All" ? "No. of Positve cases" : "Medical Prescription"}
              </Text>
              <Text color={"black"} fontWeight={"bold"}>
                {data.patientCategory === "All" ?
                  noOfPositivePatients.length :

                  indivPatient.map((patient) => {
                    return patient.receipt
                  }
                  )
                }
              </Text>
            </Stack>
          </Box>
        </SimpleGrid>
      </Flex>
      <Flex>
        <ExaminePatient addButton={
          <CreateExaminePatient data={data} />
        } data={data} />
      </Flex>
    </Layout>
  );
}

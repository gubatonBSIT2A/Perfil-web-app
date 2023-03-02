import React, { useState, useEffect } from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Spacer,
  Text,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "../../components/layouts/Layout";
import ExaminePatient from "../ExaminePatient/ExaminePatient";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import { db } from "../../utils/init-firebase";
import CreateExaminePatient from "../ExaminePatient/CreateExaminePatient";
export default function ExaminationDetails() {
  const { state } = useLocation();

  const [data] = useState(() => {
    return (
      state?.details ||
      JSON.parse(window.localStorage.getItem("examination")) ||
      {}
    );
  });
  const [patient, setPatient] = useState([]);
  const [noOfExaminedPatients, setNoOfExaminedPatients] = useState([]);
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
      where("examinationId", "==", data.id)
    );
    onSnapshot(examRef, (snapshot) => {
      let count = [];
      snapshot.docs.forEach((doc) => {
        count.push({ ...doc.data(), id: doc.id });
      });
      setNoOfExaminedPatients(count);
    });
  };
  useEffect(() => {
    countExamEntry();
    patientData();
    window.localStorage.setItem("examination", JSON.stringify(data));
  }, [data]);
  return (
    <Layout>
      <Flex
        pb={5}
        align={{ base: "left", md: "center" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Heading> Examination </Heading>
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
          <BreadcrumbItem>
            <BreadcrumbLink color={"blue"}>
              <Link to={"/establishments/details/appointment"}>
                Appointment
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Examination</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>
      <Flex>
        <SimpleGrid w={"full"} pb={5} columns={{ md: 1, lg: 3 }} spacing="24px">
          <Box bg={"white"} width={"100%"} p={5} borderRadius={"lg"}>
            <Stack>
              <Text color={"black"}>Examination Name</Text>
              <Text color={"black"} fontWeight={"bold"}>
                {data.name}
              </Text>
            </Stack>
          </Box>
          <Box width={"100%"} p={5} borderRadius={"lg"} bg={"white"}>
            <Stack>
              <Text color={"black"}>No. of Examined Patients</Text>
              <Text color={"black"} fontWeight={"bold"}>
               {noOfExaminedPatients.length}
              </Text>
            </Stack>
          </Box>
          <Box width={"100%"} p={5} bg={"white"} borderRadius={"lg"}>
            <Stack>
              <Text color={"black"}> Total No. of Patients</Text>
              <Text color={"black"} fontWeight={"bold"}>
                {patient.length}
              </Text>
            </Stack>
          </Box>
        </SimpleGrid>
      </Flex>
      <Flex>
        <ExaminePatient addButton={<CreateExaminePatient data={data} />} data={data} />
      </Flex>
    </Layout>
  );
}

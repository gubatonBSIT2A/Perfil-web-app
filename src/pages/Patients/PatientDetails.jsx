import React, { useState } from "react";
import { Layout } from "../../components/layouts/Layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Grid,
  Heading,
  Spacer,
  GridItem,
  VStack,
  Text,
  Wrap,
  WrapItem,
  Avatar,
  IconButton,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { InfoIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import { db } from "../../utils/init-firebase";
import PatientProfileTile from "../../components/ui/PatientProfileTile";
import DataTable from "react-data-table-component";
import { useMemo } from "react";
import PateintExamResultDetails from "./PateintExamResultDetails";
export default function PatientDetails() {
  const { state } = useLocation();
  const [data, setData] = useState(() => {
    return (
      state?.details || JSON.parse(window.localStorage.getItem("patient")) || {}
    );
  });
  //trimming first name, middle name, last name to remove whitespaces
  const trimmedFirstName = data.firstName.trim();
  const trimmedMiddleName = data.middleName.trim();
  const trimmedLastName = data.lastName.trim();
  //data.birthday converted to date format
  const birthdate = new Date(data.birthday);
  //get current year
  const currentYear = new Date().getFullYear();
  //get age
  const age = currentYear - birthdate.getFullYear();
  const timestamp = data.dateIssued;
  //get establishment name
  const [establishmentName, setEstablishmentName] = useState([]);
  const getEstablishmentName = () => {
    const establishmentRef = collection(db, "establishments");
    const establishmentQuery = query(
      establishmentRef,
      where("__name__", "==", data.establishment)
    );
    onSnapshot(establishmentQuery, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setEstablishmentName(doc.data().name);
      });
    });
  };
  //convert timestamp to date
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  const dateString = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(date);
  //
  //get patient exam-results using patient id
  const [filterText, setFilterText] = useState("");

  const [examResults, setExamResults] = useState([]);
  const getExamResults = () => {
    const examResultsRef = collection(db, "exam-results");
    const examResultsQuery = query(
      examResultsRef,
      where("patientId", "==", data.id)
    );
    onSnapshot(examResultsQuery, (snapshot) => {
      let examResults = [];
      snapshot.docs.forEach((doc) => {
        examResults.push({ ...doc.data(), id: doc.id });
      });
      setExamResults(examResults);
    });
  };
  const columns = useMemo(
    () => [
      {
        name: "Date Examined",
        selector: (row) => new Date(row.dateExamined * 1000).toDateString(),
        sortable: true,
      },
      {
        name: "Date of Next Appt",
        selector: (row) => new Date(row.dona * 1000).toDateString(),
        sortable: true,
      },
      {
        name: "Examination",
        selector: (row) => row.examinationName,
      },
      {
        name: "Examined By",
        selector: (row) => row.examinedBy,
      },
      {
        name: "Result",
        selector: (row) => row.result,
        sortable: true,
      },
      {
        name: "Action",
        selector: (exam) => <PateintExamResultDetails exam={exam} />,
        // sortable: true,
      },
    ],
    []
  );

  useEffect(() => {
    getExamResults();
    getEstablishmentName();
    window.localStorage.setItem("patient", JSON.stringify(data));
  }, [data]);
  return (
    <Layout>
      <Flex
        pb={5}
        align={{ base: "left", md: "center" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Heading> Patient Details </Heading>
        <Spacer />

        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink color={"blue"}>
              <Link to={"/patients"}>Patients</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Patient Details</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>

      <Grid templateColumns="repeat(12, 1fr)" gap={5}>
        <GridItem colSpan={4}>
          <Box borderRadius={"lg"} bg={"white"} p={5}>
            <VStack>
              <Wrap>
                <WrapItem>
                  <Avatar
                    size="xl"
                    name={trimmedFirstName + " " + trimmedLastName}
                  />
                </WrapItem>
              </Wrap>
              <Text py={"5"} fontSize={25} fontWeight={"bold"}>
                {trimmedFirstName +
                  " " +
                  trimmedMiddleName +
                  " " +
                  trimmedLastName}
              </Text>

              <Box w={"full"} px={10}>
                <PatientProfileTile label="Age" value={age} />
                <PatientProfileTile label="Gender" value={data.gender} />
                <PatientProfileTile
                  label="Civil Status"
                  value={data.civilStatus}
                />
                <PatientProfileTile label="Birthday" value={data.birthday} />
              </Box>
            </VStack>
          </Box>
        </GridItem>
        <GridItem colSpan={8}>
          <Box borderRadius={"lg"} bg={"white"} p={5}>
            <Tabs variant="soft-rounded" colorScheme="blue">
              <TabList>
                <Tab>Other details</Tab>
                <Tab>Social Hygiene Examination</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <PatientProfileTile
                    label="Father's Name"
                    value={data.fathersName}
                  />
                  <PatientProfileTile
                    label="Mother's Name"
                    value={data.mothersName}
                  />
                  <PatientProfileTile
                    label="Ethnicity"
                    value={data.ethnicity}
                  />
                  <PatientProfileTile label="Religion" value={data.religion} />
                  <PatientProfileTile
                    label="Nationality"
                    value={data.nationality}
                  />
                  <PatientProfileTile label="Date Created" value={dateString} />

                 
                  <PatientProfileTile label="Email" value={data.email} />
                  <PatientProfileTile
                    label="Phone Number"
                    value={data.phoneNumber}
                  />
                  <PatientProfileTile
                    label="Address"
                    value={data.barangay + ", " + data.city}
                  />

                  <PatientProfileTile
                    label="Work Place"
                    value={establishmentName}
                  />
                </TabPanel>
                <TabPanel>
                  <DataTable
                    highlightOnHover
                    pagination
                    direction="ltr"
                    responsive
                    striped
                    columns={columns}
                    data={examResults.filter((value) => {
                      if (filterText === "") {
                        return value;
                      } else if (
                        value.dateExamined &&
                        value.dateExamined
                          .toLowerCase()
                          .includes(filterText.toLowerCase())
                      ) {
                        return value;
                      } else if (
                        value.dona &&
                        value.dona
                          .toLowerCase()
                          .includes(filterText.toLowerCase())
                      ) {
                        return value;
                      } else if (
                        value.examinationName &&
                        value.examinationName
                          .toLowerCase()
                          .includes(filterText.toLowerCase())
                      ) {
                        return value;
                      } else if (
                        value.result &&
                        value.result
                          .toLowerCase()
                          .includes(filterText.toLowerCase())
                      ) {
                        return value;
                      }
                    })}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </GridItem>
      </Grid>
    </Layout>
  );
}

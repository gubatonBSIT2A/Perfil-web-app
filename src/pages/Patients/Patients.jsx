import {
  Box,
  Flex,
  Heading,
  HStack,
  Spacer,
  Input,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState, useMemo } from "react";
import { Layout } from "../../components/layouts/Layout";
import { collection, onSnapshot } from "firebase/firestore";
import DataTable from "react-data-table-component";
import { db } from "../../utils/init-firebase";
import {  ViewIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
export default function Patients() {
  const [filterText, setFilterText] = useState("");
  const [patient, setPatient] = useState([]);
  const Patients = () => {
    const usersCollectionRef = collection(db, "patients");
    onSnapshot(usersCollectionRef, (snapshot) => {
      let patientData = [];
      snapshot.docs.forEach((doc) => {
        patientData.push({ ...doc.data(), id: doc.id });
      });
      setPatient(patientData);
    });
  };
  useEffect(() => {
    Patients();
    window.localStorage.removeItem("patient");
  }, []);

  const columns = useMemo(
    () => [
      {
        name: "First Name",
        selector: (row) => row.firstName,
        sortable: true,
      },
      {
        name: "Middle Name",
        selector: (row) => row.middleName,
        sortable: true,
      },
      {
        name: "Last Name",
        selector: (row) => row.lastName,
        sortable: true,
      },

      {
        name: "Actions",
        cell: (details) => (
          <HStack>
            <Link
              to={{
                pathname: "/patients/details",
                state: { details },
              }}
            >
              <Tooltip placement='auto' label='View patient profile'>
                <IconButton colorScheme={'teal'} icon={<ViewIcon />} />
              </Tooltip>
            </Link>
          </HStack>
        ),
      },
    ],
    []
  );
  return (
    <Layout>
      <Flex mb={5}>
        <Heading>Patients</Heading>
      </Flex>
      <Box bg={"white"} p={10} borderRadius="lg">
        <Flex pb={5}>
          <Box>{/* <Create /> */}</Box>
          <Spacer />
          <Box>
            <Input
              type="text"
              placeholder="Search List"
              onChange={(e) => setFilterText(e.target.value)}
            />
          </Box>
        </Flex>
        <DataTable
          highlightOnHover
          pagination
          direction="ltr"
          responsive
          striped
          columns={columns}
          data={patient.filter((value) => {
            if (filterText === "") {
              return value;
            } else if (
              value.firstName &&
              value.firstName.toLowerCase().includes(filterText.toLowerCase())
            ) {
              return value;
            } else if (
              value.middleName &&
              value.middleName.toLowerCase().includes(filterText.toLowerCase())
            ) {
              return value;
            } else if (
              value.lastName &&
              value.lastName.toLowerCase().includes(filterText.toLowerCase())
            ) {
              return value;
            }
          })}
        />
      </Box>
    </Layout>
  );
}

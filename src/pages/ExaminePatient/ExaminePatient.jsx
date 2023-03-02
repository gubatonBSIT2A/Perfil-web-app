import React, { useEffect, useState, useMemo } from "react";
import UpdateExaminePatient from "./UpdateExaminePatient";
import DeleteExaminePatient from "./DeleteExaminePatient";
import { db } from "../../utils/init-firebase";
import {
  query,
  collection,
  where,
  onSnapshot,
} from "firebase/firestore";
import {
  Input,
  Box,
  Flex,
  Spacer,
} from "@chakra-ui/react";

import Actions from "../../components/ui/KebabMenu";
import DataTable from "react-data-table-component";
export default function ExaminePatient({ data, addButton }) {
  const [exam, setExam] = useState([]);
  const [positiveListOnly, setpositiveListOnly] = useState([])
  const [indivPatient, setIndivPatient] = useState([])
  const [filterText, setFilterText] = useState("");


  const Data = () => {
    const examResultsRef = collection(db, "exam-results");
    const examRef = query(examResultsRef, where("appointmentId", "==", data.id),);
    onSnapshot(examRef, (snapshot) => {
      let exams = [];
      snapshot.docs.forEach((doc) => {
        exams.push({ ...doc.data(), id: doc.id });
      });
      setExam(exams);
    });
  };

  const positiveList = () => {
    const examResultsRef = collection(db, "exam-results");
    const positiveRef = query(examResultsRef,
      where("result", "==", "Positive"),
      where("establishmentId", "==", data.establishment)
    );
    onSnapshot(positiveRef, (snapshot) => {
      let positive = [];
      snapshot.docs.forEach((doc) => {
        positive.push({ ...doc.data(), id: doc.id });
      });
      setpositiveListOnly(positive);
    });
  };


  useEffect(() => {
    Data();
    positiveList();
    // indivPatientData();
  }, []);

  const columns = useMemo(
    () => [
      {
        name: "Date Examined",
        selector: (row) => (new Date(row.dateExamined * 1000)).toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric'
        }),
        sortable: false,
      },
      {
        name: "Patient Name",
        selector: (row) => row.patientFirstName + " " + row.patientMiddleName + " " + row.patientLastName,
        sortable: true,
      },
      {
        name: "Result",
        selector: (row) => row.result,
        sortable: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <Actions>
            <UpdateExaminePatient data={row} />
            <DeleteExaminePatient data={row} />
          </Actions>
        ),
      },
    ],
    []
  );

  return (
    <Box w={'100%'} backgroundColor={'white'} borderWidth='1px' p={10} borderRadius='lg'>
      <Flex pb={5}>
        {addButton}
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
        data={
          exam.filter((value) => {
            if (filterText === "") {
              return value;
            } else if (
              value.patientFirstName && value.patientFirstName
                .toLowerCase()
                .includes(filterText.toLowerCase())
            ) {
              return value;
            } else if (
              value.patientMiddleName && value.patientMiddleName
                .toLowerCase()
                .includes(filterText.toLowerCase())
            ) {
              return value;
            } else if (
              value.patientLastName && value.patientLastName
                .toLowerCase()
                .includes(filterText.toLowerCase())
            ) {
              return value;
            }
          })
        }
      />
    </Box>
  );
}

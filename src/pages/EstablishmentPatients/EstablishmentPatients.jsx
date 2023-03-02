import React, { useState, useEffect, useMemo } from "react";
import { Stack, Box, Flex, Text } from "@chakra-ui/react";
import EstablishmentPatientTile from "../../components/ui/EstablishmentPatientTile";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import { db } from "../../utils/init-firebase";
export default function EstablishmentPatients({ refId }) {
  const [patient, setPatient] = useState([]);
  const patientData = () => {
    const collectionRef = collection(db, "patients");
    const establishmentRef = query(
      collectionRef,
      where("establishment", "==", refId)
    );
    onSnapshot(establishmentRef, (snapshot) => {
      let patientData = [];
      snapshot.docs.forEach((doc) => {
        patientData.push({ ...doc.data(), id: doc.id });
      });
      setPatient(patientData);
    });

  };

  useEffect(() => {
    patientData();
  }, []);
  const tiles = useMemo(() => {
    return patient.map(
      (patient) => <EstablishmentPatientTile patient={patient} />,
      [patient]
    );
  });
  return (
    <Box
      p={5}
      bg={"white"}
      borderRadius={"lg"}
      colSpan={1}
    >
      <Flex mb={"5"}>
        <Text fontWeight="bold" fontSize="lg" color="black" noOfLines={1}>
          Establishment Patients ({patient.length})
        </Text>
      </Flex>
      <Stack>{tiles}</Stack>
    </Box>
  );
}

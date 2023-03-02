import React, { useState, useEffect, useMemo } from "react";
import { Flex, Stack, Center } from "@chakra-ui/react";
import {
  query,
  collection,
  onSnapshot,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../utils/init-firebase";
import ExaminationTile from "../../components/ui/ExaminationTile";

export default function Examinations({ data }) {
  // var startToMill = new Date(data.start * 1000);
  // var endToMill = new Date(data.end * 1000);
  // var startDateToString = startToMill.toDateString();
  // var endDateToString = endToMill.toDateString();
  // console.log(startDateToString + " " + endDateToString);

  const [examination, setExamination] = useState([]);
  const AnnouncementData = () => {
    const collectionRef = collection(db, "examinations");
    const establishmentRef = query(
      collectionRef,
      where("appointment", "==", data.id)
    );
    onSnapshot(establishmentRef, (snapshot) => {
      let announcementData = [];
      snapshot.docs.forEach((doc) => {
        announcementData.push({ ...doc.data(), id: doc.id });
      });
      setExamination(announcementData);
    });
  };
  useEffect(() => {
    AnnouncementData();
  }, []);
  const tiles = useMemo(() => {
    return examination.map(
      (examination) => <ExaminationTile examination={examination} />,
      [examination]
    );
  });
  return (
    <Center mt={5} w={"100%"}>
      <Stack>{tiles}</Stack>
    </Center>
  );
}

import React, { useState, useEffect } from "react";
import { cardVariant, parentVariant } from "../../motion";
import { motion } from "framer-motion";
import { Box, SimpleGrid, Flex, Heading, Spacer } from "@chakra-ui/react";
import { Layout } from "../../components/layouts/Layout";
import CreateEstablishment from "./CreateEstablishment";
import EstablishmentCard from "../../components/ui/EstablishmentCard";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../utils/init-firebase";
import { useMemo } from "react";

const MotionSimpleGrid = motion(SimpleGrid);
const MotionBox = motion(Box);

export default function Establishments() {
  const [establishment, setEstablishment] = useState([]);
  const Data = () => {
    //fetch data and order by name
    const collectionRef = collection(db, "establishments");
    // order by name
    // const q = orderBy(collectionRef, "name", "asc");
    onSnapshot(collectionRef, (snapshot) => {
      let establishmentData = [];
      snapshot.docs.forEach((doc) => {
        establishmentData.push({ ...doc.data(), id: doc.id });
      });
      setEstablishment(establishmentData);
    });
  };
  useEffect(() => {
    Data();
    window.localStorage.removeItem("details");
  }, []);

  const cards = useMemo(() => {
    return establishment.map(
      (establishment) => (
        <MotionBox variants={cardVariant} key={establishment.id}>
          <EstablishmentCard establishment={establishment} />
        </MotionBox>
      ),
      [establishment]
    );
  });

  return (
    <Layout>
      <Flex pb={5}>
        <Heading>Establishments</Heading>
        <Spacer />
        <CreateEstablishment />
      </Flex>
      <Box>
        <MotionSimpleGrid
          mt="4"
          minChildWidth="250px"
          spacing="2em"
          minH="full"
          variants={parentVariant}
          initial="initial"
          animate="animate"
        >
          {cards}
        </MotionSimpleGrid>
      </Box>
    </Layout>
  );
}

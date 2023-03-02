import React, { useState, useEffect, useMemo } from "react";
import {
  Flex,
  Grid,
  Image,
  SimpleGrid,
  Icon,
  Heading,
  GridItem,
  Box,
  Text,
  Stack,
} from "@chakra-ui/react";
import {
  BsPersonFill,
  BsFillKanbanFill,
  BsFillCalendarWeekFill,
} from "react-icons/bs";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { Layout } from "../../components/layouts/Layout";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import "react-big-calendar/lib/css/react-big-calendar.css";
import MiniStatistics from "./components/MiniStatistics";

import { db } from "../../utils/init-firebase";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import EstablishmentPatientTile from "../../components/ui/EstablishmentPatientTile";
export default function Homepage() {
  const [establishmentCount, setEstablishmentCount] = useState(0);
  const [appointment, setAppointment] = useState([]);
  const getEstablishmentCount = () => {
    const establishmentRef = collection(db, "establishments");
    const establishmentQuery = query(establishmentRef);
    onSnapshot(establishmentQuery, (snapshot) => {
      setEstablishmentCount(snapshot.docs.length);
    });
  };
  //patients collection
  const patientRef = collection(db, "patients");
  //count patients
  const [patientCount, setPatientCount] = useState([]);
  const getPatientCount = () => {
    const patientQuery = query(patientRef);
    onSnapshot(patientQuery, (snapshot) => {
      setPatientCount(snapshot.docs.length);
    });
  };
  //count appointments
  const [appointmentCount, setAppointmentCount] = useState(0);
  const getAppointmentCount = () => {
    const appointmentRef = collection(db, "appointments");
    const appointmentQuery = query(appointmentRef);
    onSnapshot(appointmentQuery, (snapshot) => {
      setAppointmentCount(snapshot.docs.length);
    });
  };
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const [registeredPatient, setRegisteredPatient] = useState([]);
  const patientsThisMonth = () => {
    const currentMonthPatient = query(
      patientRef,
      where("dateIssued", ">=", startOfMonth),
      where("dateIssued", "<=", endOfMonth)
    );
    onSnapshot(currentMonthPatient, (snapshot) => {
      let patientData = [];
      snapshot.docs.forEach((doc) => {
        patientData.push({ ...doc.data(), id: doc.id });
      });
      setRegisteredPatient(patientData);
    });
  };
  const AppointmentData = () => {
    const collectionRef = collection(db, "appointments");

    onSnapshot(collectionRef, (snapshot) => {
      let appointmentData = [];

      snapshot.docs.forEach((doc) => {
        appointmentData.push({ ...doc.data(), id: doc.id });
      });
      setAppointment(appointmentData);
    });
  };

  useEffect(() => {
    getEstablishmentCount();
    getPatientCount();
    getAppointmentCount();
    patientsThisMonth();
    AppointmentData();
  }, []);

  const tiles = useMemo(() => {
    return registeredPatient.map(
      (patient) => <EstablishmentPatientTile patient={patient} />,
      [registeredPatient]
    );
  });
  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const events1 = appointment.map((appointment) => {
    return {
      title: appointment.title,
      start: new Date(appointment.start),
      end: new Date(appointment.end),
      backgroundColor: appointment.backgroundColor,
    };
  });
  function eventStyleGetter(events, start, end, isSelected) {
    // console.log(events);
    // if isSelected set background color to black

    var backgroundColor = isSelected ? "gray" : events.backgroundColor;
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: "2px",
      opacity: 0.8,
      color: "black",
      border: "0px",
      display: "block",
    };

    return {
      style: style,
    };
  }

  return (
    <Layout>
      <Flex pb={5}>
        <Heading>Home</Heading>
      </Flex>
      <Flex flexDirection="column">
        <SimpleGrid columns={{ sm: 1, md: 3 }} spacing="24px" pb={5}>
          <MiniStatistics
            title={"No. of Establishments"}
            amount={establishmentCount}
            icon={<Icon boxSize={5} color="white" as={BsFillKanbanFill} />}
          />
          <MiniStatistics
            title={"No. of Patients"}
            amount={patientCount}
            icon={<Icon boxSize={5} color="white" as={BsPersonFill} />}
          />
          <MiniStatistics
            title={"No. of Appointments"}
            amount={appointmentCount}
            icon={
              <Icon boxSize={5} color="white" as={BsFillCalendarWeekFill} />
            }
          />
        </SimpleGrid>
        <SimpleGrid columns={{ sm: 1, md: 3 }} spacing="24px">
          <GridItem colSpan={{ sm: 1, md: 2 }}>
            <Box bg={"white"} borderRadius="lg" p={5}>
              <Flex mb={"5"}>
                <Text
                  fontWeight="bold"
                  fontSize="lg"
                  color="black"
                  noOfLines={1}
                >
                  Appointments this month ({appointment.length})
                </Text>
              </Flex>
              <Calendar
                events={events1}
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                eventPropGetter={eventStyleGetter}
              />
            </Box>
          </GridItem>
          <GridItem>
            <Box bg={"white"} borderRadius="lg" p={5}>
              <Flex mb={"5"}>
                <Text
                  fontWeight="bold"
                  fontSize="lg"
                  color="black"
                  noOfLines={1}
                >
                  Patients registered this month ({registeredPatient.length})
                </Text>
              </Flex>
              <Stack>{tiles}</Stack>
            </Box>
          </GridItem>
        </SimpleGrid>
      </Flex>
    </Layout>
  );
}

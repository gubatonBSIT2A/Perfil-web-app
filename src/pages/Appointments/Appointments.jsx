import React, { useState, useEffect, useMemo } from "react";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Stack, Box, Grid, GridItem } from "@chakra-ui/react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import { db } from "../../utils/init-firebase";
import AppointmentTile from "../../components/ui/AppointmentTile";
export default function Appointments({ refId }) {
  const [appointment, setAppointment] = useState([]);
  const AppointmentData = () => {
    const collectionRef = collection(db, "appointments");
    const establishmentRef = query(
      collectionRef,
      where("establishment", "==", refId)
    );

    onSnapshot(establishmentRef, (snapshot) => {
      let appointmentData = [];

      snapshot.docs.forEach((doc) => {
        appointmentData.push({ ...doc.data(), id: doc.id });
      });
      setAppointment(appointmentData);
    });
  };
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

  useEffect(() => {
    AppointmentData();
  }, []);
  const tiles = useMemo(() => {
    return appointment.map(
      (appointment) => <AppointmentTile appointment={appointment} />,
      [appointment]
    );
  });
  // map appointment to events
  const events = appointment.map((appointment) => {
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
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap={5}>
        <GridItem borderRadius={"lg"} colSpan={2} bg={"white"} p={5}>
          <Calendar
            events={events}
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            eventPropGetter={eventStyleGetter}
          />
        </GridItem>
        <GridItem borderRadius={"lg"} p={5} bg={"white"}>
          <Stack spacing={3}>{tiles}</Stack>
        </GridItem>
      </Grid>
    </Box>
  );
}

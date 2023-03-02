import React, { useState, useEffect } from "react";
import { Text, Flex, Spacer, Icon, Box } from "@chakra-ui/react";

import UpdateAppointment from "../../pages/Appointments/UpdateAppointment";
import DeleteAppointment from "../../pages/Appointments/DeleteAppointment";
import Actions from "./KebabMenu";
import { Link } from "react-router-dom";
import { BsCalendar2Event, BsCalendar2EventFill } from "react-icons/bs";

export default function AppointmentTile({ appointment }) {
  const [details, setDetails] = useState(appointment);

  //compare foregroundColor to details.backgroundColor , if true, return white, else return black

  useEffect(() => {
    setDetails(appointment);
  }, [appointment]);
  return (
    <Flex borderRadius={"lg"} bg={details.backgroundColor}>
      <Box w={"100%"}>
        <Link
          to={{
            pathname: "/establishments/details/appointment",
            state: { details },
          }}
        >
          <Flex alignItems={"center"} p={3} cursor="pointer">
            <Icon as={BsCalendar2Event} boxSize={5} mr="5" />

            <Text noOfLines={2} fontSize="md">
              {details.title}
            </Text>
          </Flex>
        </Link>
      </Box>
      <Spacer />
      <Actions>
        <DeleteAppointment data={appointment} />
        <UpdateAppointment data={appointment} />
      </Actions>
    </Flex>
  );
}

import React, { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Text,
  Flex,
  Divider,
  Wrap,
  WrapItem,
  Avatar,
} from "@chakra-ui/react";
export default function EstablishmentPatientTile({ patient }) {
  const { firstName, lastName } = patient;
  const trimmedFirstName = firstName.trim();
  const trimmedLastName = lastName.trim();
  const name = `${trimmedFirstName} ${trimmedLastName}`;
  useEffect(() => {
    // setDetails(patient);
  }, [firstName, lastName, patient]);

  return (
    <>
      <Divider />
      <Box borderRadius={"lg"} w={"100%"} color={"gray.300"}>
        <Flex alignItems={"center"}>
          <Wrap mr={5}>
            <WrapItem>
              <Avatar size="sm" name={name} />
            </WrapItem>
          </Wrap>
          {/* <Spacer /> */}
          <Stack>
            <Text noOfLines={1} fontSize="md" color={"black"}>
              {trimmedFirstName + " " + trimmedLastName}
            </Text>
          </Stack>
        </Flex>
      </Box>
    </>
  );
}

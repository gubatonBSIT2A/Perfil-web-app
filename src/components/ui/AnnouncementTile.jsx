import React, { useState, useEffect } from "react";
import { Stack, Box, Text, Flex, Spacer } from "@chakra-ui/react";
import Actions from "./KebabMenu";
import UpdateAnnouncement from "../../pages/Announcements/UpdateAnnouncement";
import DeleteAnnouncement from "../../pages/Announcements/DeleteAnnouncement";
export default function AnnouncementTile({ announcement }) {
  const [details, setDetails] = useState(announcement);
  const hasDescription = details.description ? true : false;
  // unix to milliseconds
  var date = new Date(details.dateCreated * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();

  // Will display time in 10:30:23 format
  var formattedTime = hours + ":" + minutes.substr(-2);
  var formattedDate = date.toDateString();
  useEffect(() => {
    setDetails(announcement);
  }, [announcement]);

  return (
    <Box borderRadius={"lg"} w={"100%"}bg={'white'} p={3}>
      <Flex alignItems={"center"}>
        <Box>
          <Stack spacing={2}>
            <Text
              // fontWeight="semibold"
              noOfLines={1}
              fontSize="lg"
              color={"black"}
            >
              {details.title}
            </Text>
            {hasDescription ? (
              <Text fontSize="md" color={"grey"}>
                {details.description}
              </Text>
            ) : null}
            <Text noOfLines={1} fontSize="10px" color={"grey"}>
              {formattedDate}
            </Text>
          </Stack>
        </Box>
        <Spacer />
        <Actions>
          <UpdateAnnouncement data={announcement} />
          <DeleteAnnouncement data={announcement} />
        </Actions>
      </Flex>
    </Box>
  );
}

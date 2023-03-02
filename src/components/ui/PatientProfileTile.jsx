import { Box, Divider, Flex, Text, Spacer, } from "@chakra-ui/react";
import React from "react";

export default function PatientProfileTile({ label, value}) {
  return (
    
    <Box>
      <Divider />
      <Flex my={3}>
        <Text fontWeight={'bold'}>{label}</Text>
        <Box mx={2} />
        <Text>{value}</Text>
      </Flex>
    </Box>
  );
}

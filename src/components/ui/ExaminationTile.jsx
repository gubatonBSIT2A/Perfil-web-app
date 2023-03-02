import React, { useState, useEffect } from "react";
import { Box, Text, Flex, Spacer, Icon } from "@chakra-ui/react";
import Actions from "./KebabMenu";
import UpdateExamination from "../../pages/Examinations/UpdateExamination";
import DeleteExamination from "../../pages/Examinations/DeleteExamination";
import { BsFileText } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function ExaminationTile({ examination }) {
  const [details, setDetails] = useState(examination);
  useEffect(() => {
    setDetails(examination);
  }, [examination]);

  return (
    <Flex
      borderRadius={"lg"}
      minW={500}
      maxW={1000}
      bg={"white"}
    >
      <Box w={"100%"}>
        <Link
          to={{
            pathname: "/establishments/details/appointment/examination",
            state: { details },
          }}
        >
          <Flex alignItems={"center"} cursor={"pointer"} p={3}>
            <Icon color={"teal"} as={BsFileText} boxSize={5} mr="5" />
            <Text
              //   noOfLines={1}
              fontSize="lg"
              color={"black"}
            >
              {details.name}
            </Text>
          </Flex>
        </Link>
      </Box>
      <Spacer />
      <Actions>
        <UpdateExamination data={examination} />
        <DeleteExamination data={examination} />
      </Actions>
    </Flex>
  );
}

import { Box, Flex, Button, Spacer } from "@chakra-ui/react";
import { NavLink as Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Actions from "./KebabMenu";
import UpdateEstablishment from "../../pages/Establishments/UpdateEstablishment";
import DeleteEstablishment from "../../pages/Establishments/DeleteEstablishment";
export default function EstablishmentCard({ establishment }) {
  const [details, setDetails] = useState(establishment);
  useEffect(() => {
    setDetails(establishment);
  }, [establishment]);

  return (
    <Flex
      w="full"
      h="full"
      alignItems="center"
      justifyContent="center"
      bg="white"
      rounded="xl"
      shadow="lg"
      borderWidth="1px"
    >
      <Box w="full" h="full">
        <Box
          w="100%"
          height="200px"
          position="relative"
          overflow="hidden"
          roundedTop="lg"
        >
          <Box h={"100%"} flex="1" bg={details.color}></Box>
        </Box>

        <Box p="6" overflow="hidden">
          <Box fontWeight="bold" fontSize="lg" lineHeight="tight" isTruncated>
            {details.name}
          </Box>
          <Box fontSize="sm">{details.location}</Box>

          <Flex py={3}>
            <Link
              to={{
                pathname: "/establishments/details",
                state: { details },
              }}
            >
              <Button colorScheme="blue" variant="solid" minW={"150px"}>
                Details
              </Button>
            </Link>
            <Spacer />
            <Actions>
            <UpdateEstablishment data={details}/>
            <DeleteEstablishment data={details}/>
            </Actions>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

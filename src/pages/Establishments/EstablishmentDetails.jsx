import React, { useState, useEffect } from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Icon,
  Spacer,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Layout } from "../../components/layouts/Layout";
import { BsBuilding, BsFillPersonFill, BsFillPinMapFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import Announcements from "../Announcements/Announcements";
import Appointments from "../Appointments/Appointments";
import EstablishmentDetailsActions from "../../components/ui/EstablishmentDetailsActions";
import EstablishmentPatients from "../EstablishmentPatients/EstablishmentPatients";
export default function EstablishmentDetails() {
  const { state } = useLocation();
  const [data] = useState(() => {
    return (
      state?.details || JSON.parse(window.localStorage.getItem("details")) || {}
    );
  });

  useEffect(() => {
    window.localStorage.setItem("details", JSON.stringify(data));
    window.localStorage.removeItem("appointment");
  }, [data]);

  return (
    <Layout>
      <Flex
        align={{ base: "left", md: "center" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Heading> Details </Heading>
        <Spacer />

        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink color={"blue"}>
              {" "}
              <Link to={"/establishments"}> Establishments</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Details</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>
      <Flex>
        <Box bg={"white"} mt={2} w="100%" py={5} px={10} borderRadius="lg">
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            align={{ base: "left", md: "center" }}
          >
            <Flex align="center">
              <Icon boxSize={5} mr="4" as={BsBuilding} />
              <Text>{data ? data.name : "error"}</Text>
            </Flex>
            <Spacer />
            <Flex align="center">
              <Icon boxSize={5} mr="4" as={BsFillPersonFill} />
              <Text>{data ? data.owner : "error"}</Text>
            </Flex>
            <Spacer />
            <Flex align="center">
              <Icon boxSize={5} mr="4" as={BsFillPinMapFill} />
              <Text>{data ? data.location : "error"}</Text>
            </Flex>
            <Spacer />

            <EstablishmentDetailsActions data={data} />
          </Flex>
        </Box>
      </Flex>

      <Flex mt={5}>
        <Tabs w={"100%"} variant="soft-rounded" colorScheme="blue">
          <TabList>
            <Tab>Appointments</Tab>
            <Tab>Announcements & patients</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Appointments refId={data.id} />
            </TabPanel>
            <TabPanel>
              <Grid mt={5} templateColumns="repeat(12, 1fr)" gap={5}>
                <GridItem colSpan={8}>
                  <Announcements refId={data.id} />
                </GridItem>

                <GridItem colSpan={4}>
                  <EstablishmentPatients refId={data.id} />
                </GridItem>
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Layout>
  );
}

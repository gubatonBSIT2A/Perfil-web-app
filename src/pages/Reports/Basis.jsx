import React, { useState, useEffect } from "react";
import { Flex, GridItem, Heading, SimpleGrid } from "@chakra-ui/react";
import { Layout } from "../../components/layouts/Layout";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/Card";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../utils/init-firebase";
import { UserData } from "./Data";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import DoughnutChart from "./DoughnutChart";
export default function Reports() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const [examResults, setExamResults] = useState([]);
  useEffect(() => {
    const collectionRef = collection(db, "exam-results");
    const fetchData = () => {
      onSnapshot(collectionRef, (snapshot) => {
        let examResultsData = [];
        snapshot.docs.forEach((doc) => {
          examResultsData.push({ ...doc.data(), id: doc.id });
        });
        setExamResults(examResultsData);
      });
    };
    fetchData();
  }, []);

  const ages = examResults.map((result) => result.patient.age);
  const date = examResults.map((result) =>
    new Date(result.dateExamined * 1000).toLocaleDateString()
  );

  const ageData = {
    labels: date,
    datasets: [
      {
        data: ages,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
      },
    ],
  };


  return (
    <Layout>
      <Flex pb={5}>
        <Heading>Reports</Heading>
      </Flex>
      <Flex flexDirection="column">
        <SimpleGrid columns={3} spacing={5}>
          <GridItem>
            {" "}
            <Card>
              <CardBody>
                <BarChart chartData={userData} />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem>
            {" "}
            <Card>
              <CardBody>
                <LineChart chartData={userData} />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem>
            <Card>
              <CardBody>
                <PieChart chartData={userData} />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem>
            <Card>
              <CardBody>
                <DoughnutChart chartData={ageData} />
              </CardBody>
            </Card>
          </GridItem>
        </SimpleGrid>
      </Flex>
    </Layout>
  );
}

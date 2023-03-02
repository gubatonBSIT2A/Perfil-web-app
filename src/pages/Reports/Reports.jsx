import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react";
import { Layout } from "../../components/layouts/Layout";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/Card";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../utils/init-firebase";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import DoughnutChart from "./DoughnutChart";
import MultiBarChart from "./MultiBarChart";
export default function Reports() {
  //start date
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  //end dat
  const [endDate, setEndDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  );
  //count of positive cases by date
  const [casesByDate, setCasesByDate] = useState({
    labels: [],
    datasets: [
      {
        label: "Positive Cases",
        data: [],
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Negative Cases",
        data: [],
        // borderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  });
  //count of positive cases by date and gender
  const [genderCounts, setGenderCounts] = useState({
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [],
      },
    ],
  });
  //count of positive cases by date and barangay
  const [barangayCounts, setBarangayCounts] = useState({
    labels: [],
    datasets: [
      {
        label: "Cases per Barangay",
        data: [],
        backgroundColor: "rgba(75,192,192,1)",
      },
    ],
  });
  const [highestEducCounts, setHighestEducCounts] = useState({
    labels: ["Elementary", "High School", "College", "Vocational"],
    datasets: [
      {
        data: [],
        backgroundColor: ["#fcddf2", "#faf0ca", "#f4d35e", "#ee964b"],
      },
    ],
  });

  useEffect(() => {
    const collectionRef = collection(db, "exam-results");
    const positiveCasesByDate = query(
      collectionRef,
      // where("result", "==", "Positive"),
      where("dateExamined", ">=", startDate.getTime() / 1000),
      where("dateExamined", "<", endDate.getTime() / 1000)
    );

    onSnapshot(positiveCasesByDate, (snapshot) => {
      console.log("onSnapshot called");
      const dates = [];
      const positiveCounts = [];
      const negativeCounts = [];
      // add variables for female and male counts
      let femaleCount = 0;
      let maleCount = 0;
      const barangay = [];
      const barangayPositiveCounts = [];
      //add variables for highest education
      let elementaryCount = 0;
      let highSchoolCount = 0;
      let collegeCount = 0;
      let vocationalCount = 0;

      snapshot.forEach((doc) => {
        const dateExamined = doc.data().dateExamined;
        const date = new Date(dateExamined * 1000).toDateString();
        if (!dates.includes(date)) {
          dates.push(date);
          if (doc.data().result === "Positive") {
            positiveCounts.push(1);
            negativeCounts.push(0);
          } else {
            positiveCounts.push(0);
            negativeCounts.push(1);
          }
        } else {
          const index = dates.indexOf(date);
          if (doc.data().result === "Positive") {
            positiveCounts[index]++;
          } else {
            negativeCounts[index]++;
          }
        }
        // code for gender count
        if (
          doc.data().patientGender === "Female" &&
          doc.data().result === "Positive"
        ) {
          femaleCount++;
        } else if (
          doc.data().patientGender === "Male" &&
          doc.data().result === "Positive"
        ) {
          maleCount++;
        }

        // code for barangay count
        if (!barangay.includes(doc.data().patientBarangay)) {
          barangay.push(doc.data().patientBarangay);
          barangayPositiveCounts.push(1);
        } else {
          const index = barangay.indexOf(doc.data().patientBarangay);
          barangayPositiveCounts[index]++;
        }
        // code for highest education count
        if (
          doc.data().patientHighestEducation === "Elementary" &&
          doc.data().result === "Positive"
        ) {
          elementaryCount++;
        } else if (
          doc.data().patientHighestEducation === "High School" &&
          doc.data().result === "Positive"
        ) {
          highSchoolCount++;
        } else if (
          doc.data().patientHighestEducation === "College" &&
          doc.data().result === "Positive"
        ) {
          collegeCount++;
        } else if (
          doc.data().patientHighestEducation === "Vocational" &&
          doc.data().result === "Positive"
        ) {
          vocationalCount++;
        }
      });

      // set cases by date data for multibar chart
      setCasesByDate({
        labels: dates,
        datasets: [
          {
            label: "Positive Cases",
            data: positiveCounts,
            backgroundColor: "rgba(255, 99, 132, 1)",
          },
          {
            label: "Negative Cases",
            data: negativeCounts,
            backgroundColor: "rgba(255,255, 255, 0)",
          },
        ],
      });

      // set gender count data for doughnut chart
      setGenderCounts({
        labels: ["Female", "Male"],
        datasets: [
          {
            data: [maleCount, femaleCount],
            backgroundColor: ["#EA4AA6", "#02A3FE"],
            borderRadius: 10,
            cutout: "40%",
          },
        ],
      });

      //sort barangay
      const sortedBarangayPositiveCounts = barangayPositiveCounts
        .slice()
        .sort((a, b) => b - a);
      const barangaySorted = [...barangay].sort(
        (a, b) =>
          barangayPositiveCounts[barangay.indexOf(b)] -
          barangayPositiveCounts[barangay.indexOf(a)]
      );
      // set barangay count data for bar chart
      setBarangayCounts({
        labels: barangaySorted,
        datasets: [
          {
            label: "Cases per Barangay",
            data: sortedBarangayPositiveCounts,
            backgroundColor: "rgba(75,192,192,1)",
          },
        ],
      });
      // set highest education count data for doughnut chart
      setHighestEducCounts({
        labels: ["Elementary", "High School", "College", "Vocational"],
        datasets: [
          {
            data: [
              elementaryCount,
              highSchoolCount,
              collegeCount,
              vocationalCount,
            ],
            backgroundColor: ["#fcddf2", "#faf0ca", "#f4d35e", "#ee964b"],
          },
        ],
      });
    });
    console.log(casesByDate);
  }, [startDate, endDate]);

  return (
    <Layout>
      <Flex pb={5}>
        <Heading>Reports</Heading>
        <Spacer />

        <Flex p={3} borderRadius={5} backgroundColor={"white"}>
          {/* <Button
            onClick={() =>
              setStartDate(getTodayStart()) & setEndDate(getTodayEnd())
            }
          >
            Today
          </Button>
          <Box w={3}></Box> */}
          <Button
            onClick={() =>
              setStartDate(getThisWeekStart()) & setEndDate(getThisWeekEnd())
            }
          >
            This Week
          </Button>
          <Box w={3}></Box>
          <Button
            onClick={() =>
              setStartDate(getThisMonthStart()) & setEndDate(getThisMonthEnd())
            }
          >
            This Month
          </Button>
          <Box w={3}></Box>
          <Button onClick={() => setStartDate(getPastThreeMonths()) & setEndDate(getThisMonthEnd())}>
            Past 3 months
          </Button>
          <Box w={3}></Box>
          <Button onClick={() => setStartDate(getThisYearStart()) & setEndDate(getThisYearEnd())}>
            This Year
          </Button>
          <Box w={3}></Box>
          <Button onClick={() => setStartDate(getLastYearStart()) & setEndDate(getLastYearEnd())}>Last Year</Button>
        </Flex>
      </Flex>

      <Flex flexDirection="column">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
          <GridItem colSpan={2}>
            <Card>
              <CardBody>
                <MultiBarChart chartData={casesByDate} />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem>
            <Card>
              <CardBody>
                <DoughnutChart chartData={genderCounts} />
              </CardBody>
            </Card>
          </GridItem>

          <GridItem>
            <Card>
              <CardBody>
                <PieChart chartData={highestEducCounts} />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem colSpan={2}>
            <Card>
              <CardBody>
                <BarChart chartData={barangayCounts} />
              </CardBody>
            </Card>
          </GridItem>
        </SimpleGrid>
      </Flex>
    </Layout>
  );
  function getTodayStart() {
    const today = new Date();
    const start = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    return start;
  }

  function getTodayEnd() {
    const today = new Date();
    const end = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59
    );
    return end;
  }

  function getThisWeekStart() {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    const start = new Date(today.setDate(diff));
    return start;
  }

  function getThisWeekEnd() {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? 0 : 7); // adjust when day is sunday
    const end = new Date(today.setDate(diff));
    return end;
  }

  function getThisMonthStart() {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    return start;
  }

  function getThisMonthEnd() {
    const today = new Date();
    const end = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
      23,
      59,
      59
    );
    return end;
  }

  function getThisYearStart() {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 1);
    return start;
  }

  function getThisYearEnd() {
    const today = new Date();
    const end = new Date(today.getFullYear(), 11, 31, 23, 59, 59);
    return end;
  }

  function getPastThreeMonths() {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth() - 2, 1);
    const end = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
      23,
      59,
      59
    );
    return start;
  }
  function getLastYearStart() {
    const today = new Date();
    const start = new Date(today.getFullYear() - 1, 0, 1);
    return start;
}

function getLastYearEnd() {
  const today = new Date();
  const end = new Date(today.getFullYear() - 1, 11, 31, 23, 59, 59);
  return end;
}

}

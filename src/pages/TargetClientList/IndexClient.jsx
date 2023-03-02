import {
    Flex,
    Spacer,
    HStack,
    Heading,
    Input, Box
} from '@chakra-ui/react'
import { Layout } from '../../components/layouts/Layout'
import React, { useEffect, useState, useMemo } from 'react'
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/init-firebase";
import ViewClient from "./ViewClient";
import UpdateClient from "./UpdateClient";
import Create from "./Create";
import DataTable from "react-data-table-component";
import moment from "moment";


export default function IndexClient() {
    const [filterText, setFilterText] = useState("");
    const [targetClient, setTargetClient] = useState([]);
    const Data = () => {
        const usersCollectionRef = collection(db, "newClient");
        onSnapshot(usersCollectionRef, (snapshot) => {
            let userData = []
            snapshot.docs.forEach(doc => {
                userData.push({ ...doc.data(), id: doc.id })
            })
            setTargetClient(userData)
        })
    };

    useEffect(() => {
        Data();
    }, []);

    const columns = useMemo(
        () => [
            {
                name: "First Name",
                selector: (row) => row.first,
                sortable: true,
            },
            {
                name: "Middle Name",
                selector: (row) => row.middle,
                sortable: true,
            },
            {
                name: "Last Name",
                selector: (row) => row.last,
                sortable: true,
            },
           {
                name: "Expected Date of Confinement",
                selector: (row) => moment(row.FormOneA.physicalExamination.lmp.seconds*1000 ).add(1, 'day').add(255, 'days').format('LLL'),

                sortable: true,
            },
            {
                name: "Actions",
                cell: (works) => <HStack>
                    <ViewClient works={works} />
                    <UpdateClient works={works} />

                </HStack>
            },
        ],
        []
    );


    return (

        <Layout>
            <Flex pb={5}>
                <Heading >
                    TARGET CLIENT LIST
                </Heading>
            </Flex>
            <Box borderWidth='1px' p={10} borderRadius='lg'>
                <Flex pb={5}>
                    <Box>
                        <Create />
                    </Box>
                    <Spacer />
                    <Box>
                        <Input
                            type="text"
                            placeholder="Search List"
                            onChange={(e) => setFilterText(e.target.value)}
                        />
                    </Box>
                </Flex>
                <DataTable
                    highlightOnHover
                    pagination
                    direction="ltr"
                    responsive
                    striped
                    columns={columns}
                    data={
                        targetClient.filter((value) => {
                            if (filterText === "") {
                                return value;
                            } else if (
                                value.first && value.first
                                    .toLowerCase()
                                    .includes(filterText.toLowerCase())
                            ) {
                                return value;
                            } else if (
                                value.middle && value.middle
                                    .toLowerCase()
                                    .includes(filterText.toLowerCase())
                            ) {
                                return value;
                            } else if (
                                value.last && value.last
                                    .toLowerCase()
                                    .includes(filterText.toLowerCase())
                            ) {
                                return value;
                            }
                        })
                    }

                />
            </Box>
        </Layout>
    )
}

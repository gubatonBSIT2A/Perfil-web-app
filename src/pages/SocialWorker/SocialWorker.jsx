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
import Create from "./Create";
import DataTable from "react-data-table-component";
import Update from './Update'


export default function IndexClient() {
    const [filterText, setFilterText] = useState("");
    const [targetClient, setTargetClient] = useState([]);
    const Data = () => {
        const usersCollectionRef = collection(db, "users");
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
                name: "Name",
                selector: (row) => row.displayName,
                sortable: true,
            },
            {
                name: "Email",
                selector: (row) => row.email,
                sortable: true,
            },
            {
                name: "Actions",
                cell: (works) => <HStack>
                                        
                    {/* <ViewClient works={works} /> */}
                    <Update works={works} />

                </HStack>
            },
        ],
        []
    );


    return (
        <Layout>

            <Flex pb={5}>
                <Heading >
                    Health workers
                </Heading>
            </Flex>

            <Box bg={'white'} p={10} borderRadius='lg'>

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
                                value.displayName && value.displayName
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

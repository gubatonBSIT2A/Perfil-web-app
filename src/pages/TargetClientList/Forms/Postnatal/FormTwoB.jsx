import React from 'react'
import {
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    GridItem,
    HStack,
    ListItem,
    SimpleGrid,
    Spacer,
    Text,
    UnorderedList,
    useToast,
    VStack,
    Divider,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react';
import * as Yup from "yup";
import { Form, Formik } from 'formik';
import TextField from '../../../components/Fields/TextField';
import FormHeading from '../../../components/Labels/FormHeading';
import DatePicker from '../../../components/Fields/DatePicker';
import Radio from '../../../components/Fields/Radio';
import Select from '../../../components/Fields/Select';
import Checkbox from '../../../components/Fields/Checkbox';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../utils/init-firebase";
import NumberField from "../../../components/Fields/NumberField";

export default function FormTwoB({works}) {
    const row1date = new Date(works.FormTwoB.records.row1.date.seconds* 1000);
    const row1followdate = new Date(works.FormTwoB.records.row1.nextFollowUpSchedule.seconds* 1000);
    const row2date = new Date(works.FormTwoB.records.row2.date.seconds* 1000);
    const row2followdate = new Date(works.FormTwoB.records.row2.nextFollowUpSchedule.seconds* 1000);
    const row3date = new Date(works.FormTwoB.records.row3.date.seconds* 1000);
    const row3followdate = new Date(works.FormTwoB.records.row3.nextFollowUpSchedule.seconds* 1000);
    const row4date = new Date(works.FormTwoB.records.row4.date.seconds* 1000);
    const row4followdate = new Date(works.FormTwoB.records.row4.nextFollowUpSchedule.seconds* 1000);

    const initialValues = {


            records: {
                row1: {
                    date: row1date,
                    complaints: works.FormTwoB.records.row1.complaints,
                    mncServicesGiven: works.FormTwoB.records.row1.mncServicesGiven,
                    nameOfProviderAndSignature: works.FormTwoB.records.row1.nameOfProviderAndSignature,
                    nextFollowUpSchedule: row1followdate,
                },
                row2: {
                    date: row2date,
                    complaints: works.FormTwoB.records.row2.complaints,
                    mncServicesGiven: works.FormTwoB.records.row2.mncServicesGiven,
                    nameOfProviderAndSignature: works.FormTwoB.records.row2.nameOfProviderAndSignature,
                    nextFollowUpSchedule: row2followdate,
                },
                row3: {
                    date: row3date,
                    complaints: works.FormTwoB.records.row3.complaints,
                    mncServicesGiven: works.FormTwoB.records.row3.mncServicesGiven,
                    nameOfProviderAndSignature: works.FormTwoB.records.row3.nameOfProviderAndSignature,
                    nextFollowUpSchedule: row3followdate,
                },
                row4: {
                    date: row4date,
                    complaints: works.FormTwoB.records.row4.complaints,
                    mncServicesGiven: works.FormTwoB.records.row4.mncServicesGiven,
                    nameOfProviderAndSignature: works.FormTwoB.records.row4.nameOfProviderAndSignature,
                    nextFollowUpSchedule: row4followdate,
                }
            }


    }

    const onSubmit = (values) => {
        updateUsers2(values)
    }

    async  function updateUsers2(values) {

        const userRef = doc(db, 'newClient', works.id);

        await  updateDoc(userRef,{
            FormTwoB: values

        })
    }


    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen}>MNC Form 2 Side B</Button>

            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
                size='full'
                scrollBehavior='inside'
            >
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                >
                    <Form>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>MNC Form 2 Side B</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <FormControl>
                                    {/* <FormHeading text='MATERNAL CLIENT RECORD for Prenatal Care' /> */}
                                    <SimpleGrid
                                        // columns={{ base: '1', md: '2', xl: '3' }}
                                        spacing={4}
                                    >
                                        <Box
                                            borderWidth='1px'
                                            borderRadius='lg'
                                            padding={5}
                                        >
                                            <SimpleGrid spacingY={5}>
                                                <SimpleGrid columns={12} spacingX={3}>
                                                    <GridItem colSpan={2}>
                                                        <Center>
                                                            <FormLabel>
                                                                DATE
                                                            </FormLabel>
                                                        </Center>
                                                    </GridItem>
                                                    <GridItem colSpan={3}>
                                                        <UnorderedList>
                                                            <ListItem>Complaints/complication</ListItem>
                                                            <ListItem>Medical Observation</ListItem>
                                                            <ListItem>PE Findings including pelvic examination</ListItem>
                                                            <ListItem>laboratory</ListItem>
                                                            <ListItem>Other important comments</ListItem>
                                                        </UnorderedList>
                                                    </GridItem>
                                                    <GridItem colSpan={3}>
                                                        <Center>
                                                            <FormLabel>
                                                                MCN SERVICES GIVEN
                                                            </FormLabel>
                                                        </Center>
                                                    </GridItem>
                                                    <GridItem colSpan={2}>
                                                        <Center>
                                                            <FormLabel>
                                                                NAME OF PROVIDER AND SIGNATURE
                                                            </FormLabel>
                                                        </Center>
                                                    </GridItem>
                                                    <GridItem colSpan={2}>
                                                        <Center>
                                                            <FormLabel>
                                                                NEXT Follow-Up Schedule
                                                            </FormLabel>
                                                        </Center>
                                                    </GridItem>
                                                </SimpleGrid>
                                                <SimpleGrid columns={12} spacingX={3}>
                                                    <GridItem colSpan={2}>
                                                        <DatePicker label="" name="records.row1.date" />
                                                        <DatePicker label="" name="records.row2.date" />
                                                        <DatePicker label="" name="records.row3.date" />
                                                        <DatePicker label="" name="records.row4.date" />
                                                    </GridItem>
                                                    <GridItem colSpan={3}>
                                                        <TextField label="" name="records.row1.complaints" />
                                                        <TextField label="" name="records.row2.complaints" />
                                                        <TextField label="" name="records.row3.complaints" />
                                                        <TextField label="" name="records.row4.complaints" />
                                                    </GridItem>
                                                    <GridItem colSpan={3}>
                                                        <TextField label="" name="records.row1.mncServicesGiven" />
                                                        <TextField label="" name="records.row2.mncServicesGiven" />
                                                        <TextField label="" name="records.row3.mncServicesGiven" />
                                                        <TextField label="" name="records.row4.mncServicesGiven" />
                                                    </GridItem>
                                                    <GridItem colSpan={2}>
                                                        <TextField label="" name="records.row1.nameOfProviderAndSignature" />
                                                        <TextField label="" name="records.row2.nameOfProviderAndSignature" />
                                                        <TextField label="" name="records.row3.nameOfProviderAndSignature" />
                                                        <TextField label="" name="records.row4.nameOfProviderAndSignature" />
                                                    </GridItem>
                                                    <GridItem colSpan={2}>
                                                        <DatePicker label="" name="records.row1.nextFollowUpSchedule" />
                                                        <DatePicker label="" name="records.row2.nextFollowUpSchedule" />
                                                        <DatePicker label="" name="records.row3.nextFollowUpSchedule" />
                                                        <DatePicker label="" name="records.row4.nextFollowUpSchedule" />
                                                    </GridItem>
                                                </SimpleGrid>
                                            </SimpleGrid>

                                        </Box>
                                    </SimpleGrid>
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button margin={5} type="submit" colorScheme='green'>Submit</Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Form>
                </Formik >
            </Modal>
        </>

    )
}

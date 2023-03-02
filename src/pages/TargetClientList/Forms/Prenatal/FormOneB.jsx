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

export default function FormOneB({works}) {


     const row1date=       new Date(works.FormOneB.records.row1.date.seconds * 1000);
      const row1FollowUp=    new Date(works.FormOneB.records.row1.nextFollowUpSchedule.seconds * 1000);

    const row2date=       new Date(works.FormOneB.records.row2.date.seconds * 1000);
    const row2FollowUp=    new Date(works.FormOneB.records.row2.nextFollowUpSchedule.seconds * 1000);

    const row3date=       new Date(works.FormOneB.records.row3.date.seconds * 1000);
    const row3FollowUp=    new Date(works.FormOneB.records.row3.nextFollowUpSchedule.seconds * 1000);

    const row4date=       new Date(works.FormOneB.records.row4.date.seconds * 1000);
    const row4FollowUp=    new Date(works.FormOneB.records.row4.nextFollowUpSchedule.seconds * 1000);


    const firstMonthdate=       new Date(works.FormOneB.abdominalExamFindings.firstTrimester.firstMonth.date.seconds * 1000);
    const secondMonthdate=new Date(works.FormOneB.abdominalExamFindings.firstTrimester.secondMonth.date.seconds * 1000);
    const thirdMonthdate=new Date(works.FormOneB.abdominalExamFindings.firstTrimester.thirdMonth.date.seconds * 1000);
    const fourthMonthdate=new Date(works.FormOneB.abdominalExamFindings.secondTrimester.fourthMonth.date.seconds * 1000);
    const fifthMonthdate=new Date(works.FormOneB.abdominalExamFindings.secondTrimester.fifthMonth.date.seconds * 1000);
    const sixthMonthdate=new Date(works.FormOneB.abdominalExamFindings.secondTrimester.sixthMonth.date.seconds * 1000);
    const seventhMonthdate=new Date(works.FormOneB.abdominalExamFindings.thirdTrimester.seventhMonth.date.seconds * 1000);
    const eightMonthdate=new Date(works.FormOneB.abdominalExamFindings.thirdTrimester.eightMonth.date.seconds * 1000);
    const ninethMonthdate=new Date(works.FormOneB.abdominalExamFindings.thirdTrimester.ninethMonth.date.seconds * 1000);

    const remarksDate=new Date(   works.FormOneB.abdominalExamFindings.remarks.date.seconds * 1000);
const newVal=""
    const initialValues = {
            records: {
                row1: {
                    date: row1date,
                    complaints: works.FormOneB.records.row1.complaints,
                    mncServicesGiven: works.FormOneB.records.row1.mncServicesGiven,
                    nameOfProviderAndSignature: works.FormOneB.records.row1.nameOfProviderAndSignature,
                    nextFollowUpSchedule: row1FollowUp,
                },
                row2: {
                    date: row2date,
                    complaints: works.FormOneB.records.row2.complaints,
                    mncServicesGiven: works.FormOneB.records.row2.mncServicesGiven,
                    nameOfProviderAndSignature: works.FormOneB.records.row2.nameOfProviderAndSignature,
                    nextFollowUpSchedule: row2FollowUp,
                },
                row3: {
                    date: row3date,
                    complaints: works.FormOneB.records.row3.complaints,
                    mncServicesGiven: works.FormOneB.records.row3.mncServicesGiven,
                    nameOfProviderAndSignature: works.FormOneB.records.row3.nameOfProviderAndSignature,
                    nextFollowUpSchedule: row3FollowUp,
                },
                row4: {
                    date: row4date,
                    complaints: works.FormOneB.records.row4.complaints,
                    mncServicesGiven: works.FormOneB.records.row4.mncServicesGiven,
                    nameOfProviderAndSignature: works.FormOneB.records.row4.nameOfProviderAndSignature,
                    nextFollowUpSchedule: row4FollowUp,
                }
            },
            abdominalExamFindings: {
                firstTrimester: {
                    firstMonth: {
                        date: firstMonthdate,
                        fundicHeight: works.FormOneB.abdominalExamFindings.firstTrimester.firstMonth.fundicHeight,
                        fetalHeartTomes: works.FormOneB.abdominalExamFindings.firstTrimester.firstMonth.fetalHeartTomes,
                        aog: works.FormOneB.abdominalExamFindings.firstTrimester.firstMonth.aog,
                        leopolds: works.FormOneB.abdominalExamFindings.firstTrimester.firstMonth.leopolds,
                        lOne: works.FormOneB.abdominalExamFindings.firstTrimester.firstMonth.lOne,
                        lTwo: works.FormOneB.abdominalExamFindings.firstTrimester.firstMonth.lTwo,
                        lThree: works.FormOneB.abdominalExamFindings.firstTrimester.firstMonth.lThree,
                        lFour: works.FormOneB.abdominalExamFindings.firstTrimester.firstMonth.lFour,
                        uterineAcitivty: works.FormOneB.abdominalExamFindings.firstTrimester.firstMonth.uterineAcitivty,
                    },
                    secondMonth: {
                        date: secondMonthdate,
                        fundicHeight: works.FormOneB.abdominalExamFindings.firstTrimester.secondMonth.fundicHeight,
                        fetalHeartTomes: works.FormOneB.abdominalExamFindings.firstTrimester.secondMonth.fetalHeartTomes,
                        aog: works.FormOneB.abdominalExamFindings.firstTrimester.secondMonth.aog,
                        leopolds: works.FormOneB.abdominalExamFindings.firstTrimester.secondMonth.leopolds,
                        lOne: works.FormOneB.abdominalExamFindings.firstTrimester.secondMonth.lOne,
                        lTwo: works.FormOneB.abdominalExamFindings.firstTrimester.secondMonth.lTwo,
                        lThree: works.FormOneB.abdominalExamFindings.firstTrimester.secondMonth.lThree,
                        lFour: works.FormOneB.abdominalExamFindings.firstTrimester.secondMonth.lFour,
                        uterineAcitivty: works.FormOneB.abdominalExamFindings.firstTrimester.secondMonth.uterineAcitivty,
                    },
                    thirdMonth: {
                        date: thirdMonthdate,
                        fundicHeight: works.FormOneB.abdominalExamFindings.firstTrimester.thirdMonth.fundicHeight,
                        fetalHeartTomes: works.FormOneB.abdominalExamFindings.firstTrimester.thirdMonth.fetalHeartTomes,
                        aog: works.FormOneB.abdominalExamFindings.firstTrimester.thirdMonth.aog,
                        leopolds: works.FormOneB.abdominalExamFindings.firstTrimester.thirdMonth.leopolds,
                        lOne: works.FormOneB.abdominalExamFindings.firstTrimester.thirdMonth.lOne,
                        lTwo: works.FormOneB.abdominalExamFindings.firstTrimester.thirdMonth.lTwo,
                        lThree: works.FormOneB.abdominalExamFindings.firstTrimester.thirdMonth.lThree,
                        lFour: works.FormOneB.abdominalExamFindings.firstTrimester.thirdMonth.lFour,
                        uterineAcitivty: works.FormOneB.abdominalExamFindings.firstTrimester.thirdMonth.uterineAcitivty,

                    }
                },
                secondTrimester: {
                    fourthMonth: {
                        date: fourthMonthdate,
                        fundicHeight: works.FormOneB.abdominalExamFindings.secondTrimester.fourthMonth.fundicHeight,
                        fetalHeartTomes: works.FormOneB.abdominalExamFindings.secondTrimester.fourthMonth.fetalHeartTomes,
                        aog: works.FormOneB.abdominalExamFindings.secondTrimester.fourthMonth.aog,
                        leopolds: works.FormOneB.abdominalExamFindings.secondTrimester.fourthMonth.leopolds,
                        lOne: works.FormOneB.abdominalExamFindings.secondTrimester.fourthMonth.lOne,
                        lTwo: works.FormOneB.abdominalExamFindings.secondTrimester.fourthMonth.lTwo,
                        lThree: works.FormOneB.abdominalExamFindings.secondTrimester.fourthMonth.lThree,
                        lFour: works.FormOneB.abdominalExamFindings.secondTrimester.fourthMonth.lFour,
                        uterineAcitivty: works.FormOneB.abdominalExamFindings.secondTrimester.fourthMonth.uterineAcitivty,
                    },
                    fifthMonth: {
                        date: fifthMonthdate,
                        fundicHeight: works.FormOneB.abdominalExamFindings.secondTrimester.fifthMonth.fundicHeight,
                        fetalHeartTomes: works.FormOneB.abdominalExamFindings.secondTrimester.fifthMonth.fetalHeartTomes,
                        aog: works.FormOneB.abdominalExamFindings.secondTrimester.fifthMonth.aog,
                        leopolds: works.FormOneB.abdominalExamFindings.secondTrimester.fifthMonth.leopolds,
                        lOne: works.FormOneB.abdominalExamFindings.secondTrimester.fifthMonth.lOne,
                        lTwo: works.FormOneB.abdominalExamFindings.secondTrimester.fifthMonth.lTwo,
                        lThree: works.FormOneB.abdominalExamFindings.secondTrimester.fifthMonth.lThree,
                        lFour: works.FormOneB.abdominalExamFindings.secondTrimester.fifthMonth.lFour,
                        uterineAcitivty: works.FormOneB.abdominalExamFindings.secondTrimester.fifthMonth.uterineAcitivty,
                    },
                    sixthMonth: {
                        date: sixthMonthdate,
                        fundicHeight: works.FormOneB.abdominalExamFindings.secondTrimester.sixthMonth.fundicHeight,
                        fetalHeartTomes: works.FormOneB.abdominalExamFindings.secondTrimester.sixthMonth.fetalHeartTomes,
                        aog: works.FormOneB.abdominalExamFindings.secondTrimester.sixthMonth.aog,
                        leopolds: works.FormOneB.abdominalExamFindings.secondTrimester.sixthMonth.leopolds,
                        lOne: works.FormOneB.abdominalExamFindings.secondTrimester.sixthMonth.lOne,
                        lTwo: works.FormOneB.abdominalExamFindings.secondTrimester.sixthMonth.lTwo,
                        lThree: works.FormOneB.abdominalExamFindings.secondTrimester.sixthMonth.lThree,
                        lFour: works.FormOneB.abdominalExamFindings.secondTrimester.sixthMonth.lFour,
                        uterineAcitivty: works.FormOneB.abdominalExamFindings.secondTrimester.sixthMonth.uterineAcitivty,
                    }
                },
                thirdTrimester: {
                    seventhMonth: {
                        date: seventhMonthdate,
                        fundicHeight: works.FormOneB.abdominalExamFindings.thirdTrimester.seventhMonth.fundicHeight,
                        fetalHeartTomes: works.FormOneB.abdominalExamFindings.thirdTrimester.seventhMonth.fetalHeartTomes,
                        aog: works.FormOneB.abdominalExamFindings.thirdTrimester.seventhMonth.aog,
                        leopolds: works.FormOneB.abdominalExamFindings.thirdTrimester.seventhMonth.leopolds,
                        lOne: works.FormOneB.abdominalExamFindings.thirdTrimester.seventhMonth.lOne,
                        lTwo: works.FormOneB.abdominalExamFindings.thirdTrimester.seventhMonth.lTwo,
                        lThree: works.FormOneB.abdominalExamFindings.thirdTrimester.seventhMonth.lThree,
                        lFour: works.FormOneB.abdominalExamFindings.thirdTrimester.seventhMonth.lFour,
                        uterineAcitivty: works.FormOneB.abdominalExamFindings.thirdTrimester.seventhMonth.uterineAcitivty,
                    },
                    eightMonth: {
                        date: eightMonthdate,
                        fundicHeight: works.FormOneB.abdominalExamFindings.thirdTrimester.eightMonth.fundicHeight,
                        fetalHeartTomes: works.FormOneB.abdominalExamFindings.thirdTrimester.eightMonth.fetalHeartTomes,
                        aog: works.FormOneB.abdominalExamFindings.thirdTrimester.eightMonth.aog,
                        leopolds: works.FormOneB.abdominalExamFindings.thirdTrimester.eightMonth.leopolds,
                        lOne: works.FormOneB.abdominalExamFindings.thirdTrimester.eightMonth.lOne,
                        lTwo: works.FormOneB.abdominalExamFindings.thirdTrimester.eightMonth.lTwo,
                        lThree: works.FormOneB.abdominalExamFindings.thirdTrimester.eightMonth.lThree,
                        lFour: works.FormOneB.abdominalExamFindings.thirdTrimester.eightMonth.lFour,
                        uterineAcitivty: works.FormOneB.abdominalExamFindings.thirdTrimester.eightMonth.uterineAcitivty,
                    },
                    ninethMonth: {
                        date: ninethMonthdate,
                        fundicHeight: works.FormOneB.abdominalExamFindings.thirdTrimester.ninethMonth.fundicHeight,
                        fetalHeartTomes: works.FormOneB.abdominalExamFindings.thirdTrimester.ninethMonth.fetalHeartTomes,
                        aog: works.FormOneB.abdominalExamFindings.thirdTrimester.ninethMonth.aog,
                        leopolds: works.FormOneB.abdominalExamFindings.thirdTrimester.ninethMonth.leopolds,
                        lOne: works.FormOneB.abdominalExamFindings.thirdTrimester.ninethMonth.lOne,
                        lTwo: works.FormOneB.abdominalExamFindings.thirdTrimester.ninethMonth.lTwo,
                        lThree: works.FormOneB.abdominalExamFindings.thirdTrimester.ninethMonth.lThree,
                        lFour: works.FormOneB.abdominalExamFindings.thirdTrimester.ninethMonth.lFour,
                        uterineAcitivty: works.FormOneB.abdominalExamFindings.thirdTrimester.ninethMonth.uterineAcitivty,
                    }
                },
                remarks: {
                    date: remarksDate,
                    fundicHeight: works.FormOneB.abdominalExamFindings.remarks.fundicHeight,
                    fetalHeartTomes: works.FormOneB.abdominalExamFindings.remarks.fetalHeartTomes,
                    aog: works.FormOneB.abdominalExamFindings.remarks.aog,
                    leopolds: works.FormOneB.abdominalExamFindings.remarks.leopolds,
                    lOne: works.FormOneB.abdominalExamFindings.remarks.lOne,
                    lTwo: works.FormOneB.abdominalExamFindings.remarks.lTwo,
                    lThree: works.FormOneB.abdominalExamFindings,
                    lFour: works.FormOneB.abdominalExamFindings.remarks.lFour,
                    uterineAcitivty: works.FormOneB.abdominalExamFindings.remarks.uterineAcitivty,
                }
            }


    }

    const onSubmit = (values) => {
        // console.log('Form data', values)
        updateUsers2(values).then(r => {
            alert('Successfully Updated')
        })

    }

    async  function updateUsers2(values) {

        const userRef = doc(db, 'newClient', works.id);
        await  updateDoc(userRef,{
            FormOneB: values

        })
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen}>MNC Form 1 Side B</Button>

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
                            <ModalHeader>MNC Form 1 Side B</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <FormControl>
                                    {/* <FormHeading text='MATERNAL CLIENT RECORD for Prenatal Care' /> */}
                                    <SimpleGrid

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
                                        <Box
                                            borderWidth='1px'
                                            borderRadius='lg'
                                            padding={5}
                                        >
                                            <SimpleGrid columns={2} spacing={3}>
                                                <GridItem>
                                                    <Box
                                                        borderRadius='lg'
                                                        borderWidth='1px'
                                                        padding={3}
                                                    >
                                                        <SimpleGrid columns={3} spacingX={2}>
                                                            <GridItem colSpan={3}>
                                                                <Center>
                                                                    <Text>
                                                                        1st Trimester
                                                                    </Text>
                                                                </Center>
                                                            </GridItem>
                                                            <GridItem>
                                                                <VStack spacing='3px'>
                                                                    <Center>
                                                                        <Text>
                                                                            1st mo
                                                                        </Text>
                                                                    </Center>
                                                                    <DatePicker
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.firstMonth.date"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.firstMonth.fundicHeight"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.firstMonth.fetalHeartTomes"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.firstMonth.aog"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.firstMonth.leopolds"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.firstMonth.lOne"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.firstMonth.lTwo"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.firstMonth.lThree"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.firstMonth.lFour"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.firstMonth.uterineAcitivty"
                                                                    />
                                                                </VStack>
                                                            </GridItem>
                                                            <GridItem>
                                                                <VStack spacing='3px'>
                                                                    <Center>
                                                                        <Text>
                                                                            2nd mo
                                                                        </Text>
                                                                    </Center>
                                                                    <DatePicker
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.secondMonth.date"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.secondMonth.fundicHeight"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.secondMonth.fetalHeartTomes"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.secondMonth.aog"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.secondMonth.leopolds"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.secondMonth.lOne"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.secondMonth.lTwo"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.secondMonth.lThree"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.secondMonth.lFour"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.secondMonth.uterineAcitivty"
                                                                    />
                                                                </VStack>
                                                            </GridItem>
                                                            <GridItem>
                                                                <VStack spacing='3px'>
                                                                    <Center>
                                                                        <Text>
                                                                            3rd mo
                                                                        </Text>
                                                                    </Center>
                                                                    <DatePicker
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.thirdMonth.date"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.thirdMonth.fundicHeight"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.thirdMonth.fetalHeartTomes"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.thirdMonth.aog"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.thirdMonth.leopolds"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.thirdMonth.lOne"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.thirdMonth.lTwo"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.thirdMonth.lThree"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.thirdMonth.lFour"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.firstTrimester.thirdMonth.uterineAcitivty"
                                                                    />
                                                                </VStack>
                                                            </GridItem>
                                                        </SimpleGrid>
                                                    </Box>
                                                </GridItem>
                                                <GridItem>
                                                    <Box
                                                        borderRadius='lg'
                                                        borderWidth='1px'
                                                        padding={3}
                                                    >
                                                        <SimpleGrid columns={3} spacingX={2}>
                                                            <GridItem colSpan={3}>
                                                                <Center>
                                                                    <Text>
                                                                        2nd Trimester
                                                                    </Text>
                                                                </Center>
                                                            </GridItem>
                                                            <GridItem>
                                                                <VStack spacing='3px'>
                                                                    <Center>
                                                                        <Text>
                                                                            4th mo
                                                                        </Text>
                                                                    </Center>
                                                                    <DatePicker
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.fourthMonth.date"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.fourthMonth.fundicHeight"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.fourthMonth.fetalHeartTomes"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.fourthMonth.aog"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.fourthMonth.leopolds"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.fourthMonth.lOne"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.fourthMonth.lTwo"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.fourthMonth.lThree"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.fourthMonth.lFour"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.fourthMonth.uterineAcitivty"
                                                                    />
                                                                </VStack>
                                                            </GridItem>
                                                            <GridItem>
                                                                <VStack spacing='3px'>
                                                                    <Center>
                                                                        <Text>
                                                                            5th mo
                                                                        </Text>
                                                                    </Center>
                                                                    <DatePicker
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.fifthMonth.date"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.fifthMonth.fundicHeight"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.fifthMonth.fetalHeartTomes"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.fifthMonth.aog"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.fifthMonth.leopolds"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.fifthMonth.lOne"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.fifthMonth.lTwo"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.fifthMonth.lThree"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.fifthMonth.lFour"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.fifthMonth.uterineAcitivty"
                                                                    />
                                                                </VStack>
                                                            </GridItem>
                                                            <GridItem>
                                                                <VStack spacing='3px'>
                                                                    <Center>
                                                                        <Text>
                                                                            6th mo
                                                                        </Text>
                                                                    </Center>
                                                                    <DatePicker
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.sixthMonth.date"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.sixthMonth.fundicHeight"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.sixthMonth.fetalHeartTomes"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.sixthMonth.aog"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.sixthMonth.leopolds"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.sixthMonth.lOne"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.sixthMonth.lTwo"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.sixthMonth.lThree"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.sixthMonth.lFour"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.secondTrimester.sixthMonth.uterineAcitivty"
                                                                    />
                                                                </VStack>
                                                            </GridItem>
                                                        </SimpleGrid>
                                                    </Box>
                                                </GridItem>
                                                <GridItem>
                                                    <Box
                                                        borderRadius='lg'
                                                        borderWidth='1px'
                                                        padding={3}
                                                    >
                                                        <SimpleGrid columns={3} spacingX={2}>
                                                            <GridItem colSpan={3}>
                                                                <Center>
                                                                    <Text>
                                                                        3rd Trimester
                                                                    </Text>
                                                                </Center>
                                                            </GridItem>
                                                            <GridItem>
                                                                <VStack spacing='3px'>
                                                                    <Center>
                                                                        <Text>
                                                                            7th mo
                                                                        </Text>
                                                                    </Center>
                                                                    <DatePicker
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.seventhMonth.date"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.seventhMonth.fundicHeight"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.seventhMonth.fetalHeartTomes"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.seventhMonth.aog"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.seventhMonth.leopolds"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.seventhMonth.lOne"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.seventhMonth.lTwo"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.seventhMonth.lThree"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.seventhMonth.lFour"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.seventhMonth.uterineAcitivty"
                                                                    />
                                                                </VStack>
                                                            </GridItem>
                                                            <GridItem>
                                                                <VStack spacing='3px'>
                                                                    <Center>
                                                                        <Text>
                                                                            8th mo
                                                                        </Text>
                                                                    </Center>
                                                                    <DatePicker
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.eightMonth.date"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.eightMonth.fundicHeight"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.eightMonth.fetalHeartTomes"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.eightMonth.aog"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.eightMonth.leopolds"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.eightMonth.lOne"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.eightMonth.lTwo"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.eightMonth.lThree"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.eightMonth.lFour"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.eightMonth.uterineAcitivty"
                                                                    />
                                                                </VStack>
                                                            </GridItem>
                                                            <GridItem>
                                                                <VStack spacing='3px'>
                                                                    <Center>
                                                                        <Text>
                                                                            9th mo
                                                                        </Text>
                                                                    </Center>
                                                                    <DatePicker
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.ninethMonth.date"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.ninethMonth.fundicHeight"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.ninethMonth.fetalHeartTomes"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.ninethMonth.aog"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.ninethMonth.leopolds"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.ninethMonth.lOne"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.ninethMonth.lTwo"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.ninethMonth.lThree"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.ninethMonth.lFour"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.thirdTrimester.ninethMonth.uterineAcitivty"
                                                                    />
                                                                </VStack>
                                                            </GridItem>
                                                        </SimpleGrid>
                                                    </Box>
                                                </GridItem>
                                                <GridItem>
                                                    <Box
                                                        borderRadius='lg'
                                                        borderWidth='1px'
                                                        padding={3}
                                                    >
                                                        <SimpleGrid spacingX={2}>
                                                            <GridItem >
                                                                <Center>
                                                                    <Text mb={5}>
                                                                        Remarks
                                                                    </Text>
                                                                </Center>
                                                            </GridItem>
                                                            <GridItem>
                                                                <VStack spacing='3px'>
                                                                    <DatePicker
                                                                        label=""
                                                                        name="abdominalExamFindings.remarks.date"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.remarks.fundicHeight"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.remarks.fetalHeartTomes"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.remarks.aog"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.remarks.leopolds"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.remarks.lOne"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.remarks.lTwo"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.remarks.lThree"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.remarks.lFour"
                                                                    />
                                                                    <TextField
                                                                        label=""
                                                                        name="abdominalExamFindings.remarks.uterineAcitivty"
                                                                    />
                                                                </VStack>
                                                            </GridItem>
                                                        </SimpleGrid>
                                                    </Box>
                                                </GridItem>
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

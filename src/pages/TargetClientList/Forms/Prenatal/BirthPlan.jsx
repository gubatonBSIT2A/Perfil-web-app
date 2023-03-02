import React from 'react'
import {
    Button, Modal, ModalOverlay, useDisclosure, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, ModalFooter, Box,
    Divider,
    FormControl,
    FormHelperText,
    GridItem,
    HStack,
    SimpleGrid,
    Spacer,
    useToast,
} from '@chakra-ui/react'
import TextField from '../../../components/Fields/TextField';
import Radio from '../../../components/Fields/Radio';
import FormHeading from '../../../components/Labels/FormHeading';
import DatePicker from '../../../components/Fields/DatePicker';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../utils/init-firebase";
import NumberField from "../../../components/Fields/NumberField";
import Select from "../../../components/Fields/Select";
import { bloodOptions, transportOption } from "../../../components/Constants";
import { Formik, Field, Form } from 'formik';

const accredationStatusOpt = [
    { key: 'Yes', value: 'yes' },
    { key: 'no', value: 'no' }
];
export default function BirthPlan({works}) {
    const { isOpen, onOpen, onClose } = useDisclosure()


    const newConformeDate = new Date(works.BirthPlan.conforme.date.seconds * 1000);
    const initialValues = {

            attendantName: works.BirthPlan.attendantName,
            deliveryLocation: works.BirthPlan.deliveryLocation,
            accredationStatus: works.BirthPlan.accredationStatus,
            distanceFromResidence: works.BirthPlan.distanceFromResidence,
            estimatedCost: works.BirthPlan.estimatedCost,
            modeOfPayment: works.BirthPlan.modeOfPayment,

            availableTransportation: works.BirthPlan.availableTransportation,
            bringer: {
                Name: works.BirthPlan.bringer.Name,
                Address: works.BirthPlan.bringer.Address,
                Number: works.BirthPlan.bringer.Number,
            },
            companion: {
                Name: works.BirthPlan.companion.Name,
                Relationship: works.BirthPlan.companion.Relationship,
                Address: works.BirthPlan.companion.Address,
                Number: works.BirthPlan.companion.Number,
            },
            careTaker: {
                Name: works.BirthPlan.careTaker.Name,
                Relationship: works.BirthPlan.careTaker.Relationship,
            },

            bloodType: works.BirthPlan.bloodType,
            donors: {
                donorName1: works.BirthPlan.donors.donorName1,
                donorAddress1: works.BirthPlan.donors.donorAddress1,
                donorName2: works.BirthPlan.donors.donorName2,
                donorAddress2: works.BirthPlan.donors.donorAddress2,
            },
            complicationReferral: {
                name: works.BirthPlan.complicationReferral.name,
                address: works.BirthPlan.complicationReferral.address,
                number: works.BirthPlan.complicationReferral.number,
            },

            maternalHostpital: {
                name: works.BirthPlan.maternalHostpital.name,
                address: works.BirthPlan.maternalHostpital.address,
            },
            newbornHostpital: {
                name: works.BirthPlan.newbornHostpital.name,
                address: works.BirthPlan.newbornHostpital.address,
            },
            conforme: {
                signature: works.BirthPlan.conforme.signature,
                date: newConformeDate
            }

    }
    const onSubmit = (values) => {
        updateUsers2(values).then(r =>
        alert("Successfully Updated"))
    }

    async  function updateUsers2(values) {

        const userRef = doc(db, 'newClient', works.id);
        await  updateDoc(userRef,{
            BirthPlan: values

        })
    }


    return (
        <>
            <Button onClick={onOpen}>Birth Plan</Button>

            <Modal
                closeOnOverlayClick={false}
                onClose={onClose}
                isOpen={isOpen}
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
                            <ModalHeader>Birth Plan</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <FormControl>
                                    <SimpleGrid columns={1} spacingY={4}>
                                        <FormHeading text="BIRTH PLAN" />
                                        <Text>
                                            I know that any complication can develop at any time in the course of
                                            this pregnancy, childbirth and after birth. I know that the best place
                                            to deliver my baby is in a health facility.
                                        </Text>
                                        <div>
                                            <TextField
                                                label="I will be attended at delivery by"
                                                name="attendantName"
                                            />
                                            <FormHelperText>
                                                Name of Doctor/Nurse/Midwife or others. If others, pls. specify
                                            </FormHelperText>
                                        </div>
                                        <div>
                                            <TextField
                                                label="I plan to deliver at"
                                                name="deliveryLocation"
                                            />
                                            <FormHelperText>
                                                Name and location of Hospital/health center/clinic or others.
                                                If others, pls. specify
                                            </FormHelperText>
                                        </div>
                                        <SimpleGrid columns={2}>
                                            <GridItem>
                                                <Radio
                                                    label="This is a Philhealth accredited facility"
                                                    name="accredationStatus"
                                                    options={accredationStatusOpt}
                                                />
                                            </GridItem>
                                            <GridItem>
                                                <TextField
                                                    label="Distance from Residence"
                                                    name="distanceFromResidence"
                                                />
                                            </GridItem>
                                        </SimpleGrid>
                                        <SimpleGrid columns={3} spacingX={3}>
                                            <GridItem colSpan={2} >
                                                <NumberField
                                                    label="The estimated cost of the
                                            maternity package in this facility is"
                                                    name="estimatedCost"
                                                />
                                                <FormHelperText>
                                                    Inclusive of the newborn care package
                                                </FormHelperText>
                                            </GridItem>
                                            <GridItem>
                                                <TextField
                                                    label="The mode of payment is"
                                                    name="modeOfPayment"
                                                />
                                            </GridItem>
                                        </SimpleGrid>
                                    </SimpleGrid>
                                    <SimpleGrid spacingY={5}>
                                        <SimpleGrid columns={3} spacingX={4}>
                                            <GridItem >
                                                <Select
                                                    label="The available transport is"
                                                    name="availableTransportation"
                                                    options={transportOption}
                                                />
                                            </GridItem>
                                            <GridItem colSpan={2}>
                                                <TextField
                                                    label="I have contacted "
                                                    name="bringer.Name"
                                                />
                                                <FormHelperText>
                                                    Name of Companion
                                                </FormHelperText>
                                            </GridItem>
                                            <GridItem colSpan={2}>
                                                <div>
                                                    <TextField
                                                        label="residing at"
                                                        name="bringer.Address"
                                                    />
                                                    <FormHelperText>
                                                        Address
                                                    </FormHelperText>
                                                </div>
                                            </GridItem>
                                            <GridItem>
                                                <div>
                                                    <NumberField
                                                        label="and with contact number at"
                                                        name="bringer.Number"
                                                    />
                                                    <FormHelperText>
                                                        Landline or Cellphone
                                                    </FormHelperText>
                                                </div>
                                            </GridItem>
                                            <GridItem colSpan={3}>
                                                <Text>
                                                    to bring me to the hospital/maternity clinic/health center.
                                                </Text>
                                            </GridItem>
                                        </SimpleGrid>
                                        <Divider />
                                        <SimpleGrid columns={3} spacingX={4}>
                                            <GridItem colSpan={2}>
                                                <TextField
                                                    label="I will be accompanied by"
                                                    name="companion.Name"
                                                />
                                                <FormHelperText>
                                                    Name
                                                </FormHelperText>
                                            </GridItem>
                                            <GridItem >
                                                <TextField
                                                    label="who is my "
                                                    name="companion.Relationship"
                                                />
                                                <FormHelperText>
                                                    Relationship to patient
                                                </FormHelperText>
                                            </GridItem>
                                            <GridItem colSpan={2}>
                                                <TextField
                                                    label="residing at"
                                                    name="companion.Address"
                                                />
                                                <FormHelperText>
                                                    Address
                                                </FormHelperText>
                                            </GridItem>
                                            <GridItem>
                                                <NumberField
                                                    label="with contact number at"
                                                    name="companion.Number"
                                                />
                                                <FormHelperText>
                                                    Landline or Cellphone
                                                </FormHelperText>
                                            </GridItem>
                                        </SimpleGrid>
                                        <Divider />
                                        <SimpleGrid columns={3} spacingX={4}>
                                            <GridItem colSpan={2}>
                                                <TextField
                                                    label="Name of care taker"
                                                    name="careTaker.Name"
                                                />
                                            </GridItem>
                                            <GridItem >
                                                <TextField
                                                    label="my"
                                                    name="careTaker.Relationship"
                                                />
                                                <FormHelperText>
                                                    Relationship to patient
                                                </FormHelperText>
                                            </GridItem>
                                            <GridItem colSpan={3}>
                                                <Text>
                                                    will take care of my children/home while I am in the health facility
                                                </Text>
                                            </GridItem>
                                        </SimpleGrid>
                                    </SimpleGrid>

                                    <SimpleGrid spacingY={5}>
                                        <GridItem>
                                            <Select
                                                label="My blood type is"
                                                name="bloodType"
                                                options={bloodOptions}
                                            />
                                        </GridItem>
                                        <SimpleGrid columns={2} spacingX={5}>
                                            <GridItem colSpan={2}>
                                                <Text>
                                                    In case of a need for blood transfusion, my possible donors are:
                                                </Text>
                                            </GridItem>
                                            <GridItem>
                                                <TextField label="Name" name="donors.donorName1" />
                                            </GridItem>
                                            <GridItem>
                                                <TextField label="Address" name="donors.donorAddress1" />
                                            </GridItem>
                                            <GridItem>
                                                <TextField label="Name" name="donors.donorName2" />
                                            </GridItem>
                                            <GridItem>
                                                <TextField label="Address" name="donors.donorAddress2" />
                                            </GridItem>
                                        </SimpleGrid>
                                        <SimpleGrid columns={3} spacingX={5}>
                                            <GridItem colSpan={3}>
                                                <Text>
                                                    In case incase of complications, I should be referred right away to:
                                                </Text>
                                            </GridItem>
                                            <GridItem>
                                                <TextField label="Contact Person" name="complicationReferral.name" />
                                            </GridItem>
                                            <GridItem>
                                                <TextField label="Address" name="complicationReferral.address" />
                                            </GridItem>
                                            <GridItem>
                                                <NumberField label="Tel. No" name="complicationReferral.number" />
                                            </GridItem>
                                        </SimpleGrid>
                                    </SimpleGrid>

                                    <SimpleGrid spacingY={5}>
                                        <SimpleGrid columns={2} spacingX={5}>
                                            <GridItem colSpan={2}>
                                                <Text>
                                                    The nearest maternal and newborn health facility to my residence are:
                                                </Text>
                                            </GridItem>
                                            <GridItem
                                                colSpan={2}
                                            >
                                                <Text
                                                    fontSize='xl'
                                                >
                                                    Maternal/Hospital:
                                                </Text>
                                            </GridItem>
                                            <GridItem>
                                                <TextField
                                                    label="Name of Hospital"
                                                    name="maternalHostpital.name"
                                                />
                                            </GridItem>
                                            <GridItem>
                                                <TextField
                                                    label="Address"
                                                    name="maternalHostpital.address"
                                                />
                                            </GridItem>
                                        </SimpleGrid>
                                        <SimpleGrid
                                            columns={2}
                                            spacingX={5}
                                        >
                                            <GridItem colSpan={2}>
                                                <Text fontSize='xl'>
                                                    Newborn Hospital:
                                                </Text>
                                            </GridItem>
                                            <GridItem>
                                                <TextField
                                                    label="Name of Hospital"
                                                    name="newbornHostpital.name"
                                                />
                                            </GridItem>
                                            <GridItem>
                                                <TextField
                                                    label="Address"
                                                    name="newbornHostpital.address"
                                                />
                                            </GridItem>
                                        </SimpleGrid>
                                        <SimpleGrid columns={2} spacingX={5}>
                                            <GridItem>
                                            </GridItem>
                                            <GridItem>
                                                <Text fontSize="2xl">
                                                    Conforme:
                                                </Text>
                                            </GridItem>
                                        </SimpleGrid>
                                        <SimpleGrid columns={4} spacingX={5}>
                                            <GridItem
                                                colSpan={2}
                                            >
                                            </GridItem>
                                            <GridItem>
                                                <TextField
                                                    name="conforme.signature"
                                                    label="Signature"
                                                />
                                            </GridItem>
                                            <GridItem>
                                                <DatePicker
                                                    name="conforme.date"
                                                    label="Date"
                                                />
                                            </GridItem>
                                        </SimpleGrid>
                                    </SimpleGrid>
                                </FormControl >
                            </ModalBody>
                            <ModalFooter>
                                <Button margin={5} type="submit" colorScheme='green'>Submit</Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Form>
                </Formik>
            </Modal>
        </>
    )
}

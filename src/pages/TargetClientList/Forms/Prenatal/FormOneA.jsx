import React from 'react'
import {
    Box,
    Button,
    Center,
    FormControl,
    GridItem,
    SimpleGrid,
    Text,
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

import { Form, Formik, useFormik } from 'formik';
import TextField from '../../../components/Fields/TextField';
import DatePicker from '../../../components/Fields/DatePicker';
import Radio from '../../../components/Fields/Radio';
import Select from '../../../components/Fields/Select';
import Checkbox from '../../../components/Fields/Checkbox';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../utils/init-firebase";
import NumberField from "../../../components/Fields/NumberField";

import moment from "moment";

export default function FormOneA({works}) {
    // console.log(works,"FormOneAAAAAAAA")



    const myDate = new Date(works.FormOneA.familySerial.client.birthday.seconds* 1000);
    const spouseDate = new Date(works.FormOneA.familySerial.spouse.birthday.seconds* 1000);
    const lmpDate = new Date(works.FormOneA.physicalExamination.lmp.seconds* 1000);


    const initialValues = {

            familySerial: {
                client: {
                    birthday:myDate ,
                    highestEducation: works.FormOneA.familySerial.client.highestEducation,
                    occupation: works.FormOneA.familySerial.client.occupation,
                    addressStreet: works.FormOneA.familySerial.client.addressStreet,
                    addressBarangay: works.FormOneA.familySerial.client.addressBarangay,
                    addressMunicipality: works.FormOneA.familySerial.client.addressMunicipality,
                    addressProvince: works.FormOneA.familySerial.client.addressProvince,
                },
                spouse: {
                    firstName: works.FormOneA.familySerial.spouse.firstName,
                    middleName: works.FormOneA.familySerial.spouse.middleName,
                    lastName: works.FormOneA.familySerial.spouse.lastName,
                    birthday: spouseDate,
                    highestEducation: works.FormOneA.familySerial.spouse.highestEducation,
                    occupation: works.FormOneA.familySerial.spouse.occupation,
                },
                avgFamilyIncome:  works.FormOneA.familySerial.avgFamilyIncome,
                noOfChildren: works.FormOneA.familySerial.noOfChildren,
                birthPlan: works.FormOneA.familySerial.birthPlan,
            },
            medicalHistory: {
                reviewOfSystems: {

                    heent: JSON.parse(JSON.stringify(works.FormOneA.medicalHistory.reviewOfSystems.heent)),
                    chestHeart: JSON.parse(JSON.stringify(works.FormOneA.medicalHistory.reviewOfSystems.chestHeart)),
                    abdomen: JSON.parse(JSON.stringify(works.FormOneA.medicalHistory.reviewOfSystems.abdomen)),
                    genital: JSON.parse(JSON.stringify(works.FormOneA.medicalHistory.reviewOfSystems.genital)),
                    extremeties: JSON.parse(JSON.stringify(works.FormOneA.medicalHistory.reviewOfSystems.extremeties)),
                    skin: JSON.parse(JSON.stringify(works.FormOneA.medicalHistory.reviewOfSystems.skin)),
                },
                familyHistory: works.FormOneA.medicalHistory.familyHistory,
                pastHealthHistory: works.FormOneA.medicalHistory.pastHealthHistory,
                socialHistory: works.FormOneA.medicalHistory.socialHistory,
                obstericalHistory: {
                    historyOfPreviousDeliveries: works.FormOneA.medicalHistory.obstericalHistory.historyOfPreviousDeliveries,
                    menstrualHistory: works.FormOneA.medicalHistory.obstericalHistory.menstrualHistory,
                },
                familyPlanningHistory: {
                    previouslyUsedMethod: works.FormOneA.medicalHistory.familyPlanningHistory.previouslyUsedMethod,
                }
            },
            physicalExamination: {
                lmp:lmpDate,
                vitalSigns: {
                    bloodPressure: works.FormOneA.physicalExamination.vitalSigns.bloodPressure,
                    weight: works.FormOneA.physicalExamination.vitalSigns.weight,
                    height: works.FormOneA.physicalExamination.vitalSigns.height,
                    bmi: works.FormOneA.physicalExamination.vitalSigns.bmi,
                    pulseRate: works.FormOneA.physicalExamination.vitalSigns.pulseRate,
                },
                conjunctiva: works.FormOneA.physicalExamination.conjunctiva,
                neck: works.FormOneA.physicalExamination.neck,
                breast: works.FormOneA.physicalExamination.breast,
                thorax: works.FormOneA.physicalExamination.thorax,
                abdomen: works.FormOneA.physicalExamination.abdomen,
                vaginalExamination: works.FormOneA.physicalExamination.vaginalExamination,
                extremities: works.FormOneA.physicalExamination.extremities,
                toxoidVaccineStatus: works.FormOneA.physicalExamination.toxoidVaccineStatus,
                impressionDiagnosis: works.FormOneA.physicalExamination.impressionDiagnosis,

            }








    }

    const onSubmit = (values) => {
        updateUsers2(values).then(r =>
            alert('Successfully Updated')
        )

    }

    async  function updateUsers2(values) {
        const userRef = doc(db, 'newClient', works.id);
        await  updateDoc(userRef,{
            FormOneA: values

        })
    }

    const heentSelections = [
        { key: 'Epilepsy/Convulsion/Seizure', value: 'epilepsyConvulsionSeizure' },
        { key: 'Severe Headache/dizziness', value: 'severeHeadacheDizziness' },
        { key: 'Visual Disturbance/blurring of vision', value: 'visualDisturbanceBlurringOfVision' },
        { key: 'Yellowish conjunctiva', value: 'yellowishConjunctiva' },
        { key: 'Enlarged thyroid', value: 'enlargedThyroid' }
    ];
    const chestHeartSelections = [
        { key: 'Severe chest pain', value: 'severeChestPain' },
        { key: 'Shortness of breath and easy fatigability', value: 'shortnessOfBreath' },
        { key: 'Breast/axillary masses', value: 'breastAxillaryMasses' },
        { key: 'Nipple discharges (specify if blood or pus)', value: 'nippleDischarges ' }
    ];
    const abdomenSelections = [
        { key: 'Mass in the Abdomen', value: 'massInTheAbdomen' },
        { key: 'History of gallbladder disease', value: 'historyOfGallbladderDisease' },
        { key: 'History of liver disease', value: 'historyOfLiverDisease' }
    ];
    const genitalSelections = [
        { key: 'Vaginal discharge', value: 'vaginalDischarge' },
        { key: 'Intermenstrual bleeding', value: 'intermenstrualBleeding' },
        { key: 'Postcoital bleeding', value: 'postcoitalBleeding' },
        { key: 'Mass in the uterus', value: 'massInTheUterus' }
    ];
    const extremitiesSelections = [
        { key: 'Severe varicosities', value: 'severeVaricosities' },
        { key: 'Swelling or servere pain in the legs not related to injuries', value: 'historyOfGallbladderDisease' }
    ];
    const skinSelections = [
        { key: 'Yellowish Skin', value: 'yellowishSkin' }
    ];
    const familyHistorySelections = [
        { key: 'CVA (strokes)', value: 'cvaStrokes' },
        { key: 'Hypertension', value: 'hypertension' },
        { key: 'Asthma', value: 'asthma' },
        { key: 'Heart disease', value: 'heartDisease' },
        { key: 'Diabetes', value: 'diabetes' }
    ];
    const pastHealthHistorySelections = [
        { key: 'Allergies', value: 'allergies' },
        { key: 'Drug intake (anti-tuberculosis, anti-diabetic, anticonvulsant)', value: 'drugIntake' },
        { key: 'Bleeding tendencies (nose, gums, etc.)', value: 'bleedingTendencies' },
        { key: 'Anemia', value: 'anemia' },
        { key: 'Diabetes', value: 'diabetes' },
        { key: 'Itching or sores in or around vagina', value: 'itching' },
        { key: 'Pain or burning sensation on urination', value: 'painOrBurning' }
    ];
    const socialHistorySelections = [
        { key: 'Smoking', value: 'smoking' },
        { key: 'Alcohol beverage', value: 'alcoholBeverage' },
        { key: 'History of domestic violence', value: 'vaw' },
        { key: 'History of psychological or mood disturbance', value: 'moodDisturbances' },
        { key: 'Unpleasant relationship with partner', value: 'unpleasantRelationship' },
        { key: 'Treated for STIs in the past', value: 'sTI' }
    ];
    const obstericalHistorySelections = [
        { key: 'Number of pregnancies', value: 'noOfPreg' },
        { key: 'History of giving birth to preterm or LBW infants', value: 'lBW' },
        { key: 'History of Ectopic pregnancy Hydatidiform mole (within the last 12 months)', value: 'ectopicPregnancy' }
    ];
    const historyOfPreviouDeliveriesSelections = [
        { key: 'Date of last delivery', value: 'dateOflastDelivery' },
        { key: 'Type of last Delivery', value: 'typeOfLastDelivery' },
        { key: 'Birth Attendant in last delivery', value: 'birthAttendant' }
    ];
    const menstrualHistorySelections = [
        { key: 'Last menstrual period', value: 'lastMenstrualPeriod' },
        { key: 'Past menstrual period', value: 'pastMenstrualPeriod' },
        { key: 'Duration of menstrual Bleeding', value: 'durationOfMenstrualBleeding' },
        { key: 'Character of Menstrual bleeding', value: 'characterOfMenstrualBleeding' }
    ];
    const conjunctivaSelections = [
        { key: 'Pale', value: 'pale' },
        { key: 'Yellowish', value: 'yellowish' }
    ];
    const neckSelections = [
        { key: 'Enlarged thyroid nodes', value: 'enlargedThyroid' },
        { key: 'Enlarged Lymph', value: 'enlargedLymph' }
    ];
    const breastSelections = [
        { key: 'Mass', value: 'mass' },
        { key: 'Nipple discharge', value: 'nippleDischarge' },
        { key: 'skin - orange peel or dimpling', value: 'skin' },
        { key: 'Enlarged axillary lymph nodes', value: 'enlargedAxillary ' }
    ];
    const thoraxSelections = [
        { key: 'Abnormal heart sounds / rate / rhythym', value: 'abnormalHeartSounds' },
        { key: 'Abnormal Breath sounds / respiratory rate', value: 'abnormalBreathSounds' }
    ];
    const abdomenSelections2 = [
        { key: 'Enlarged Liver', value: 'enlargedLiver' },
        { key: 'Mass', value: 'mass' },
        { key: 'Tenderness', value: 'tenderness' },
        { key: 'Scar', value: 'scar' }
    ];
    const vaginalExaminationSelections = [
        { key: 'Bleeding', value: 'bleeding' },
        { key: 'Discharges', value: 'discharges' },
        { key: 'Cyst/mass', value: 'cyst' },
        { key: 'Scars', value: 'scars' },
        { key: 'Warts', value: 'warts' },
        { key: 'Lacerations', value: 'lacerations' },
        { key: 'others, specify', value: 'others' }
    ];
    const extremitiesSelections2 = [
        { key: 'Edema', value: 'edema' },
        { key: 'Varicosities', value: 'varicosities' },
        { key: 'Pain on forced dorsiflexion', value: 'dorsiflexion' }
    ];

    const highestEducationOptions = [
        { key: 'Select an option', value: '' },
        { key: 'Primary Education', value: 'primaryEducation' },
        { key: 'Secondary Education', value: 'secondaryEducation' },
        { key: 'Vocation', value: 'vocation' },
        { key: 'College', value: 'college' }
    ]
    const birthPlanOptions = [
        { key: 'Hospital', value: 'hospital' },
        { key: 'RHU', value: 'rhu' },
        { key: 'LIC', value: 'lic' },
        { key: 'Home', value: 'home' }
    ];
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen}>MNC Form 1 Side A</Button>

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
                            <ModalHeader>MNC Form 1 Side A</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <FormControl>
                                    {/* <FormHeading text='MATERNAL CLIENT RECORD for Prenatal Care' /> */}
                                    <SimpleGrid
                                        columns={{ base: '1', md: '2', xl: '3' }}
                                        spacing={4}
                                    >
                                        <Box
                                            borderWidth='1px'
                                            borderRadius='lg'
                                            padding={5}
                                        >
                                            <Center>
                                                <Text fontSize="xl">
                                                    Medical History
                                                </Text>
                                            </Center>
                                            <Divider orientation='horizontal' />
                                            <Text fontSize='xl'>
                                                Review of Systems:
                                            </Text>
                                            <Divider orientation='horizontal' />
                                            <SimpleGrid columns={1} >
                                                <Box>
                                                    <Checkbox
                                                        label="Heent"
                                                        name="medicalHistory.reviewOfSystems.heent"
                                                        options={heentSelections}
                                                    />
                                                </Box>
                                                <Box>
                                                    <Checkbox
                                                        label="Chest/Heart"
                                                        name="medicalHistory.reviewOfSystems.chestHeart"
                                                        options={chestHeartSelections}
                                                    />
                                                </Box>
                                                <Box>
                                                    <Checkbox
                                                        label="Abdomen"
                                                        name=".medicalHistory.reviewOfSystems.abdomen"
                                                        options={abdomenSelections}
                                                    />
                                                </Box>
                                                <Box>
                                                    <Checkbox
                                                        label="Genital"
                                                        name="medicalHistory.reviewOfSystems.genital"
                                                        options={genitalSelections}
                                                    />
                                                </Box>
                                                <Box>
                                                    <Checkbox
                                                        label="Extremities"
                                                        name=".medicalHistory.reviewOfSystems.extremities"
                                                        options={extremitiesSelections}
                                                    />
                                                </Box>
                                                <Box>
                                                    <Checkbox
                                                        label="Skin"
                                                        name="medicalHistory.reviewOfSystems.skin"
                                                        options={skinSelections}
                                                    />
                                                </Box>
                                            </SimpleGrid>

                                            <SimpleGrid columns={1}>
                                                <Divider orientation='horizontal' />
                                                <Text fontSize='xl'>
                                                    Family History:
                                                </Text>
                                                <Divider orientation='horizontal' />
                                                <Box>
                                                    <Checkbox
                                                        label=""
                                                        name="medicalHistory.familyHistory"
                                                        options={familyHistorySelections}
                                                    />
                                                </Box>
                                                <Box>
                                                    <Divider orientation='horizontal' />
                                                    <Text fontSize='xl'>
                                                        Past Health History:
                                                    </Text>
                                                    <Divider orientation='horizontal' />
                                                    <Checkbox
                                                        label=""
                                                        name="medicalHistory.pastHealthHistory"
                                                        options={pastHealthHistorySelections}
                                                    />
                                                </Box>
                                                <Box>
                                                    <Divider orientation='horizontal' />
                                                    <Text fontSize='xl'>
                                                        Social History:
                                                    </Text>
                                                    <Divider orientation='horizontal' />
                                                    <Checkbox
                                                        label=""
                                                        name="medicalHistory.socialHistory"
                                                        options={socialHistorySelections}
                                                    />
                                                </Box>
                                            </SimpleGrid>
                                            <SimpleGrid>
                                                <Divider orientation='horizontal' />
                                                <Text fontSize='xl'>
                                                    Obsterical History:
                                                </Text>
                                                <Divider orientation='horizontal' />
                                                <Box>
                                                    <Checkbox
                                                        label=""
                                                        name="medicalHistory.obsterical.obstericalHistory"
                                                        options={obstericalHistorySelections}
                                                    />
                                                </Box>
                                                <Box>

                                                    <Checkbox
                                                        label="History of Previous Deliveries"
                                                        name="medicalHistory.obstericalHistory.historyOfPreviousDeliveries"
                                                        options={historyOfPreviouDeliveriesSelections}
                                                    />
                                                </Box>
                                                <Box>

                                                    <Checkbox
                                                        label="Menstrual History"
                                                        name="medicalHistory.obstericalHistory.menstrualHistory"
                                                        options={menstrualHistorySelections}
                                                    />
                                                </Box>
                                                <Box>

                                                    <TextField
                                                        label="Previously used method"
                                                        name="medicalHistory.familyPlanningHistory.previouslyUsedMethod"
                                                    />
                                                </Box>
                                            </SimpleGrid>
                                        </Box>
                                        <Box
                                            borderWidth='1px'
                                            borderRadius='lg'
                                            padding={5}
                                        >
                                            <Center>
                                                <Text fontSize="xl">
                                                    Physical Examination
                                                </Text>
                                            </Center>
                                            <Divider orientation='horizontal' />
                                            <Text fontSize='xl'>Vital Signs:</Text>
                                            <Divider orientation='horizontal' />
                                            <SimpleGrid>
                                                <Box>

                                                </Box>
                                                <TextField
                                                    label='Blood pressure'
                                                    name="physicalExamination.vitalSigns.bloodPressure"
                                                />
                                                <Box>
                                                    <TextField
                                                        label='Weight'
                                                        name="physicalExamination.vitalSigns.weight"
                                                    />
                                                </Box>
                                                <Box>
                                                    <TextField
                                                        label='Height'
                                                        name="physicalExamination.vitalSigns.height"
                                                    />
                                                </Box>
                                                <Box>
                                                    <TextField
                                                        label='Body Mass Index'
                                                        name="physicalExamination.vitalSigns.bmi"
                                                    />
                                                </Box>
                                                <Box>
                                                    <TextField
                                                        label='Pulse Rate'
                                                        name="physicalExamination.vitalSigns.pulseRate"
                                                    />
                                                </Box>
                                            </SimpleGrid>

                                            <SimpleGrid>
                                                <Box>
                                                    <Checkbox
                                                        label="Conjunctiva"
                                                        name="physicalExamination.conjunctiva"
                                                        options={conjunctivaSelections}
                                                    />
                                                </Box>
                                                <Box>
                                                    <Checkbox
                                                        label="Neck"
                                                        name="physicalExamination.neck"
                                                        options={neckSelections}
                                                    />
                                                </Box>
                                                <Box>
                                                    <Checkbox
                                                        label="Breast"
                                                        name="physicalExamination.breast"
                                                        options={breastSelections}
                                                    />
                                                </Box>
                                                <Box>
                                                    <Checkbox
                                                        label="Thorax"
                                                        name="physicalExamination.thorax"
                                                        options={thoraxSelections}
                                                    />
                                                </Box>
                                                <Box>
                                                    <Checkbox
                                                        label="Abdomen"
                                                        name="physicalExamination.abdomen"
                                                        options={abdomenSelections2}
                                                    />
                                                </Box>
                                                <Box>
                                                    <Checkbox
                                                        label="Vaginal Examination"
                                                        name="physicalExamination.vaginalExamination"
                                                        options={vaginalExaminationSelections}
                                                    />
                                                </Box>
                                                <Box>
                                                    <Checkbox
                                                        label="Extremities"
                                                        name="physicalExamination.extremities"
                                                        options={extremitiesSelections2}
                                                    />
                                                </Box>
                                                <Box>
                                                    <TextField
                                                        label="Td toxoid vaccine Status:"
                                                        name="physicalExamination.toxoidVaccineStatus"
                                                    />
                                                </Box>
                                            </SimpleGrid>
                                            <SimpleGrid pt={5}>
                                                <Divider orientation='horizontal' />
                                                <Text fontSize='xl'>Impression/Diagnosis:</Text>
                                                <Divider orientation='horizontal' />
                                                <Box>
                                                    <TextField
                                                        label="Impression/Diagnosis"
                                                        name="physicalExamination.impressionDiagnosis"
                                                    />
                                                </Box>
                                            </SimpleGrid>
                                            <SimpleGrid pt={5}>
                                                <Divider orientation='horizontal' />
                                                <Text fontSize='xl'>LMP/G-P</Text>
                                                <Divider orientation='horizontal' />
                                                <Box>
                                                    <DatePicker
                                                        label="LMP/G-P"
                                                        name="physicalExamination.lmp"
                                                    />
                                                </Box>
                                            </SimpleGrid>
                                        </Box>
                                        <Box
                                            borderWidth='1px'
                                            borderRadius='lg'
                                            padding={5}
                                        >
                                            <Center>
                                                <Text fontSize="xl">
                                                    Family Serial No.
                                                </Text>
                                            </Center>
                                            <SimpleGrid pb={3} >
                                                <Divider orientation='horizontal' />
                                                <Text fontSize='xl'>Name of Client:</Text>
                                                <Divider orientation='horizontal' />
                                                <DatePicker
                                                    name="familySerial.client.birthday"
                                                    label="Birthday"
                                                />
                                                <Select
                                                    label="Highest Education"
                                                    name="familySerial.client.highestEducation"
                                                    options={highestEducationOptions}
                                                />
                                                <TextField
                                                    name="familySerial.client.occupation"
                                                    label="Occupation"
                                                />
                                                <TextField
                                                    name="familySerial.client.addressStreet"
                                                    label="Street"
                                                />
                                                <TextField
                                                    name="familySerial.client.addressBarangay"
                                                    label="Barangay"
                                                />
                                                <TextField
                                                    name="familySerial.client.addressMunicipality"
                                                    label="Municipality"
                                                />
                                                <TextField
                                                    name="familySerial.client.addressProvince"
                                                    label="Province"
                                                />
                                            </SimpleGrid>
                                            <SimpleGrid>
                                                <Divider orientation='horizontal' />
                                                <Text fontSize='xl'>Name of Spouse:</Text>
                                                <Divider orientation='horizontal' />
                                                <TextField
                                                    name="familySerial.spouse.lastName"
                                                    label="Last Name"
                                                />
                                                <TextField
                                                    name="familySerial.spouse.firstName"
                                                    label="First Name"
                                                />
                                                <TextField
                                                    name="familySerial.spouse.middleName"
                                                    label="Middle Name"
                                                />
                                                <DatePicker
                                                    name="familySerial.spouse.birthday"
                                                    label="Birthday"
                                                />
                                                <Select
                                                    label="Highest Education"
                                                    name="familySerial.spouse.highestEducation"
                                                    options={highestEducationOptions}
                                                />
                                                <GridItem>
                                                    <TextField
                                                        name="familySerial.spouse.occupation"
                                                        label="Occupation"
                                                    />
                                                </GridItem>
                                            </SimpleGrid>
                                            <SimpleGrid >
                                                <NumberField
                                                    name="familySerial.avgFamilyIncome"
                                                    label="Average Family Income"
                                                />
                                                <NumberField
                                                    name="familySerial.noOfChildren"
                                                    label="No. of Children"
                                                />
                                                <Radio
                                                    label="Birth Plan"
                                                    name="familySerial.birthPlan"
                                                    options={birthPlanOptions}
                                                />
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

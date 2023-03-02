//Temporary Modal To Display Client Information
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Tooltip,
    Text, Heading, HStack, Box, Center, Flex, Spacer, Stack
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { ViewIcon } from '@chakra-ui/icons'
import DisplayField from '../components/Fields/DisplayField'




export default function ViewPatient({ works }) {
    const [data, setData] = useState([works]);

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Tooltip
                label="View Details"
                aria-label='A tooltip'
            >
                <Button
                    colorScheme='teal'
                    onClick={() => { onOpen() }}
                >
                    <ViewIcon />
                </Button>
            </Tooltip>
            <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior='inside'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Client Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {data.map(obj => (
                            <Stack spacing={10}>
                                <Flex>
                                    <Box>
                                        <DisplayField label='Date of Registration' value={obj.first} />
                                    </Box>
                                    <Spacer />
                                    <Box>
                                        <DisplayField label='Family Serial No.' value={obj.first} />
                                    </Box>
                                    <Spacer />
                                    <Box>
                                        <Heading as='h4' size='md' color='grey'>
                                            Name
                                        </Heading>
                                        <Text fontSize='md' color="blue.500">{obj.first} {obj.middle} {obj.last}</Text>
                                    </Box>
                                    <Spacer />
                                    <Box>
                                        <DisplayField label='Address' value={obj.FormOneA.familySerial.client.addressStreet} />
                                    </Box>
                                    <Spacer />
                                    <Box>
                                        <DisplayField label='Socio-Economic Status' value={obj.first} />
                                    </Box>
                                </Flex>
                                <Flex>
                                    <Box>
                                        <DisplayField label='Age' value={obj.age} />
                                    </Box>
                                    <Spacer />

                                    <Box>
                                        <Center>
                                            <Heading as='h4' size='md' color='grey'>
                                                Dates of Pre-natal Check-ups
                                            </Heading>
                                        </Center>
                                        <Flex>
                                            <Box>
                                                <DisplayField label='LMP' value={obj.first} />
                                            </Box>
                                            <Spacer />
                                            <Box>
                                                <DisplayField label='LMP' value={obj.first} />
                                            </Box>
                                            <Spacer />
                                            <Box>
                                                <DisplayField label='LMP' value={obj.first} />
                                            </Box>
                                        </Flex>
                                    </Box>
                                </Flex>
                                <Box borderWidth='1px' p={5} borderRadius='lg'>
                                    <Center>
                                        <Heading as='h4' size='md' color='grey'>
                                            Laboratory Screening
                                        </Heading>
                                    </Center>
                                    <Flex>
                                        <Box>
                                            <Center>
                                                <Heading as='h6' size='sm' color='grey'>
                                                    Gestational Diabetes
                                                </Heading>
                                            </Center>
                                            <HStack>
                                                <Box>
                                                    <DisplayField label='Date Screened' value={obj.first} />
                                                </Box>
                                                <Box>
                                                    <DisplayField label='Result' value={obj.first} />
                                                </Box>
                                            </HStack>
                                        </Box>
                                        <Spacer />
                                        <Box>
                                            <Center>
                                                <Heading as='h6' size='sm' color='grey'>
                                                    CBC/Hgb & Hct Count
                                                </Heading>
                                            </Center>
                                            <HStack spacing={5}>
                                                <Box>
                                                    <DisplayField label='Date Screened' value={obj.first} />
                                                </Box>
                                                <Box>
                                                    <DisplayField label='Anemia Result' value={obj.first} />
                                                </Box>
                                                <Box>
                                                    <DisplayField label='Given Iron' value={obj.first} />
                                                </Box>
                                            </HStack>
                                        </Box>
                                    </Flex>
                                </Box>
                                <Flex>
                                    <Stack>
                                        <Center>
                                            <Heading as='h4' size='md' color='grey'>
                                                Pregnancy Outcome
                                            </Heading>
                                        </Center>
                                        <HStack spacing={5}>
                                            <Box>
                                                <Heading as='h6' size='sm' color='grey'>
                                                    <Center>

                                                    </Center>
                                                </Heading>
                                                <DisplayField label='Date Terminated' value={obj.first} />
                                            </Box>
                                            <Spacer />
                                            <Box>
                                                <Heading as='h6' size='sm' color='grey'>
                                                    <Center>
                                                        Outcome
                                                    </Center>
                                                </Heading>
                                                <HStack spacing={5}>
                                                    <Box>
                                                        <DisplayField label='FT / PT / FD / AB' value={obj.first} />
                                                    </Box>
                                                    <Box>
                                                        <DisplayField label='Sex' value={obj.first} />
                                                    </Box>
                                                </HStack>
                                            </Box>
                                        </HStack>
                                    </Stack>
                                    <Spacer />
                                    <Box>
                                        <DisplayField label='Type of Delivery' value={obj.FormTwoA.physicalExamination.typeOfDelivery} />
                                    </Box>
                                    <Spacer />
                                    <Stack>
                                        <Center>
                                            <Heading as='h4' size='md' color='grey'>
                                                Birth Weight
                                            </Heading>
                                        </Center>
                                        <HStack spacing={5}>
                                            <Box>
                                                <DisplayField label='Low:' value={obj.first} />
                                            </Box>
                                            <Spacer />
                                            <Box>
                                                <DisplayField label='Normal:' value={obj.first} />
                                            </Box>
                                            <Spacer />
                                            <Box>
                                                <DisplayField label='Unknown' value={obj.first} />
                                            </Box>
                                        </HStack>
                                    </Stack>
                                </Flex>
                                <Box borderWidth='1px' p={5} borderRadius='lg'>


                                    <Center>
                                        <Heading as='h4' size='md' color='grey'>
                                            Place of Delivery
                                        </Heading>
                                    </Center>
                                    <Flex>
                                        <Box>
                                            <Heading as='h6' size='sm' color='grey'>
                                                <Center>
                                                    Health Facility
                                                </Center>
                                            </Heading>
                                            <HStack>
                                                <Box>
                                                    <DisplayField label='Type' value={obj.FormTwoA.physicalExamination.placeOfDelivery} />
                                                </Box>
                                                <Spacer />
                                                <Box>
                                                    <DisplayField label='BEmONC/CEmONC capable' value={obj.first} />
                                                </Box>
                                                <Spacer />
                                                <Box>
                                                    <DisplayField label='Ownership' value={obj.first} />
                                                </Box>
                                            </HStack>
                                        </Box>
                                        <Spacer />
                                        <Box>
                                            <Box>
                                                <DisplayField label='Non-Health Facility' value={obj.first} />
                                            </Box>
                                        </Box>
                                    </Flex>
                                </Box>
                                <Flex>
                                    <Box>
                                        <DisplayField label='Birth Attendant' value={obj.first} />
                                    </Box>
                                    <Spacer />
                                    <Box>
                                        <DisplayField label='Remarks' value={obj.first} />
                                    </Box>
                                    <Spacer />
                                    <Box>
                                        <Heading as='h4' size='md' color='grey'>
                                            <Center>
                                                Date and Time of Delivery
                                            </Center>
                                        </Heading>
                                        <Flex>
                                            <Box>
                                                <DisplayField label='Date' value={obj.first} />
                                            </Box>
                                            <Spacer />
                                            <Box>
                                                <DisplayField label='Time' value={obj.first} />
                                            </Box>
                                        </Flex>
                                    </Box>
                                </Flex>
                            </Stack>
                        ))}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
import React from 'react'
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react'
import { Form, Field, Formik } from "formik";
import { useToast } from '@chakra-ui/react'
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/init-firebase";
import Select from "../components/Fields/Select";
import { legislativeDistrictOptions, administrativeDistricts, barangayOptions } from "../components/Constants"




export default function Update({ id }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const toast = useToast()
    const firstField = React.useRef()

    async function updateUsers2(values) {

        const userRef = doc(db, 'users', id.id);
        await updateDoc(userRef, {
            ...values

        })
    }


    return (
        <>
            <Button
                colorScheme='green'
                ref={btnRef}
                onClick={onOpen}
            >
                Update Profile
            </Button>


            <Modal
                isOpen={isOpen}
                placement='right'
                initialFocusRef={firstField}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader borderBottomWidth='1px'>
                        Update Profile
                    </ModalHeader>
                    <Formik
                        initialValues={{
                            ...id
                        }}
                        onSubmit={(values, actions) => {
                            updateUsers2(values)
                                .then(() => {
                                    toast({
                                        title: 'Success',
                                        description: 'User Profile Updated Successfully',
                                        status: 'info',
                                        duration: 9000,
                                        isClosable: true,
                                    })
                                    actions.setSubmitting(false)
                                    onClose()
                                })
                        }}
                    >
                        {(props) => (
                            <Form>
                                <ModalBody>
                                    <Stack spacing='24px'>
                                        <Field name='displayName' >
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.displayName && form.touched.displayName}>
                                                    <FormLabel htmlFor='displayName'> Name</FormLabel>
                                                    <Input {...field} id='displayName' placeholder='displayName' />
                                                    <FormErrorMessage>{form.errors.displayName}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name='email' >
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.email && form.touched.email}>
                                                    <FormLabel htmlFor='email'>Email Address</FormLabel>
                                                    <Input {...field} id='email' placeholder='email' isDisabled />
                                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Select
                                            label="Legislative District"
                                            name="legislativeDistrict"
                                            options={legislativeDistrictOptions}
                                        />
                                        <Select
                                            label="Administrative District"
                                            name="administrativeDistrict"
                                            options={administrativeDistricts}
                                        />
                                        <Select
                                            label="Barangay"
                                            name="barangay"
                                            options={barangayOptions}
                                        />
                                    </Stack>
                                </ModalBody>
                                <ModalFooter borderTopWidth='1px'>
                                    <Button
                                        isLoading={props.isSubmitting}
                                        type='submit'
                                        colorScheme='blue'
                                        mr={3}
                                    >
                                        Submit
                                    </Button>
                                    <Button variant='outline' mr={3} onClick={onClose}>
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </Form>
                        )}
                    </Formik>
                </ModalContent>
            </Modal>
        </>
    )
}

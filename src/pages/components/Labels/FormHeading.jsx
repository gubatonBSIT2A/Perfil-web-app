
import { Center } from '@chakra-ui/layout'
import { Heading } from '@chakra-ui/react'
import React from 'react'

export default function FormHeading({ text }) {
    return (
        <Center>
            <Heading as='h2' fontSize={{ base: 'md', sm: 'xl', md: '3xl' }}>{text}</Heading>
        </Center>
        
    )
}
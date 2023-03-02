import { Heading } from '@chakra-ui/react'
import React from 'react'

export default function SubHeading({ text }) {
    return (

            <Heading as='h2' size='md' color="teal">{text}</Heading>

        
    )
}

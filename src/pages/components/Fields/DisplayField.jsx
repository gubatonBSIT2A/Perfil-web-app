import { Text } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
import React from "react";

export default function DisplayField({ label, value }) {
    return (
        <>
            <Heading as='h4' size='md' color='grey'>
                {label}
            </Heading>
            <Text fontSize='md' color="blue.500">{value}</Text>
        </>
    );
}

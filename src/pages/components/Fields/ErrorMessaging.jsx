import React from 'react'
import { ErrorMessage } from 'formik';
import { FormHelperText } from '@chakra-ui/react';

export default function ErrorMessaging({name}) {
    return (
        <FormHelperText color="red">
            <ErrorMessage
                name={name}
            />
        </FormHelperText>
            
        
    )
}

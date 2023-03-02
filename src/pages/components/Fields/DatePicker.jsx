import React from 'react'
import DateView from 'react-datepicker'
import { ErrorMessage, Field } from 'formik'
import { FormLabel } from '@chakra-ui/react'
import 'react-datepicker/dist/react-datepicker.css'
import TextError from './TextError'



export default function DatePicker(props) {
    const { label, name, ...rest } = props
    return (
        <>
            <FormLabel>{label}</FormLabel>
            <Field name={name} >
                {
                    ({ form, field }) => {
                        const { setFieldValue } = form
                        const { value } = field
                        return (
                            <DateView
                                className="chakra-input css-1c6j008"
                                id={name}
                                {...field}
                                {...rest}
                                selected={value}
                                onChange={val => setFieldValue(name, val)}
                                isClearable
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                            />
                        )
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </>
    )
} 

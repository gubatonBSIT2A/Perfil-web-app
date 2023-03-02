import React from 'react'
import DateView from 'react-datepicker'
import { Field } from 'formik'
import { FormLabel } from '@chakra-ui/react'
import 'react-datepicker/dist/react-datepicker.css'
import ErrorMessaging from './ErrorMessaging'

export default function YearPicker(props) {
    const { label, name } = props
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
                                selected={value}
                                onChange={val => setFieldValue(name, val)}
                                
                                isClearable
                                showYearPicker
                                dateFormat="yyyy"
                            />
                        )
                    }
                }
            </Field>
            <ErrorMessaging name={name} />
        </>
    )
}

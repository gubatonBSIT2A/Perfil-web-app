
import React from 'react'
import DateView from 'react-datepicker'
import { Field } from 'formik'
import { FormLabel } from '@chakra-ui/react'
import 'react-datepicker/dist/react-datepicker.css'
import ErrorMessaging from './ErrorMessaging'

export default function DateTimePicker(props) {
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
                                showTimeSelect
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                dateFormat="Pp"
                            />
                        )
                    }
                }
            </Field>
            <ErrorMessaging name={name} />
        </>
    )
}

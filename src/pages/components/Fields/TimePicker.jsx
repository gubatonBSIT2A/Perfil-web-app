import React from 'react'
import DatePicker from 'react-datepicker'
import { Field } from 'formik'
import { FormLabel } from '@chakra-ui/react'
import 'react-datepicker/dist/react-datepicker.css'
import ErrorMessaging from './ErrorMessaging'

export default function TimePicker(props) {
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
                            <DatePicker
                                className="chakra-input css-1c6j008"
                                id={name}
                                {...rest}
                                selected={value}
                                onChange={val => setFieldValue(name, val)}
                                isClearable
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                            />
                        )
                    }
                }
            </Field>
            <ErrorMessaging name={name} />
        </>
    )
}

import { Field } from 'formik'
import React from 'react'
import ErrorMessaging from './ErrorMessaging'
import { FormLabel } from '@chakra-ui/react'

export default function Checkbox(props) {
    const { label, name, options } = props
    return (
        <>
            <FormLabel>{label}</FormLabel>
            <Field name={name} >
                {
                    ({ field }) => {
                        return options.map(option => {
                            return (
                                <div className='chakra-checkbox-group css-0'>
                                    <React.Fragment key={option.key} >
                                        <label className="chakra-radio css-78joka" >
                                            <input
                                                className="chakra-radio__input"
                                                type='checkbox'
                                                id={option.value}
                                                {...field}
                                                value={option.value}
                                                checked={field.value && field.value.includes(option.value)}
                                            />
                                            <span className='chakra-radio__label css-1i66d7g'>{option.key}</span>
                                        </label>
                                    </React.Fragment>
                                </div>
                            )
                        })
                    }
                }

            </Field>

            <ErrorMessaging name={name} />

        </>

    )
}

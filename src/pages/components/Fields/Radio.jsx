import { Field } from 'formik'
import React from 'react'
import ErrorMessaging from './ErrorMessaging'
import { FormLabel } from '@chakra-ui/react'

export default function Radio(props) {
    const { label, name, options } = props
    return (
        <>
            <FormLabel>{label}</FormLabel>
            <Field name={name} >
                {
                    ({ field }) => {
                        return options.map(option => {
                            return (
                                <div className='chakra-radio-group css-0'>
                                    <React.Fragment key={option.key} >
                                        <label className="chakra-radio css-78joka" >
                                            <input
                                                className="chakra-radio__input"
                                                type='radio'
                                                id={option.value}
                                                {...field}
                                                value={option.value}
                                                checked={field.value === option.value}
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

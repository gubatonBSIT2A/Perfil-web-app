import React from "react";
import { FormLabel } from "@chakra-ui/form-control";
import { ErrorMessage, Field } from 'formik';
import TextError from "./TextError";


function TextArea(props) {
  const { label, name, ...rest } = props
  return (
    <>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Field
        as='textarea'
        name={name}
        id={name}
        className="chakra-input css-1c6j008"
        {...rest}
      />
      <ErrorMessage name={name}  component={TextError}/>
    </>
  )
}

export default TextArea
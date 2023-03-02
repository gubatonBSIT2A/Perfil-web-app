import React from "react";
import { FormLabel } from "@chakra-ui/form-control";
import { Field } from 'formik';

export default function NumberField({ label, name, validate, placeholder }) {
  return (
    <>
      <FormLabel>{label}</FormLabel>
      <Field
        name={name}
        component="input"
        type="number"
        placeholder={placeholder}
        validate={validate}
        className="chakra-input css-1c6j008"
      />
    </>
  );
}

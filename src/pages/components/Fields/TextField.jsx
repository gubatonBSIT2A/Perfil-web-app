import React from "react";
import { FormLabel } from "@chakra-ui/form-control";
import { Field } from 'formik';

export default function TextField({ label, name, validate }) {
  return (
    <>
      <FormLabel>{label}</FormLabel>
      <Field
        name={name}
        component="input"
        type="text"
        // placeholder={label}
        validate={validate}
        className="chakra-input css-1c6j008"
      />
    </>
  );
}

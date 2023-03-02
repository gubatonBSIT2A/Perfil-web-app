import React from "react";
import {
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { ErrorMessage , Field } from "formik";
import TextError from "./TextError.jsx";
function FormikInput(props) {
  const { name, label, ...rest } = props;
  return (
    <div>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Field  className="chakra-input css-1c6j008" name={name} {...rest}/>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default FormikInput;

import { FormLabel } from "@chakra-ui/react";
import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./TextError.jsx";

export default function Select(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Field
        as="select"
        id={name}
        name={name}
        className="chakra-input css-1c6j008"
        {...rest}
      >
        <option defaultValue value="">
          Select Option
        </option>
        {options.map((option) => {
          return (
            <option
              className="chakra-select css-k7r2wc"
              key={option.value}
              value={option.value}
            >
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

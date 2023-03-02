import { FormLabel } from "@chakra-ui/react";
import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./TextError";

function RadioButton(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-control">
      <FormLabel>{label}</FormLabel>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <div>
                <React.Fragment key={option.key}>
                  <label>
                    <input
                      type="checkbox"
                      id={option.value}
                      {...field}
                      value={option.value}
                      checked={field.value.includes(option.value)}
                    />
                    <span>{" " + option.key}</span>
                  </label>
                </React.Fragment>
              </div>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default RadioButton;

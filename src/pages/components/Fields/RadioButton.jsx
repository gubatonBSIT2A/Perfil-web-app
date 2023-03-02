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
              <div className="chakra-radio-group css-0">
                <React.Fragment key={option.key}>
                  <label className="chakra-radio css-78joka">
                    <input
                      className="chakra-radio__input"
                      type="radio"
                      id={option.value}
                      {...field}
                      value={option.value}
                      checked={field.value === option.value}
                    />
                    <span className="chakra-radio__label css-1i66d7g">
                      {" " + option.key}
                    </span>
                  </label>
                </React.Fragment>
              </div>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextError}/>
    </div>
  );
}

export default RadioButton;

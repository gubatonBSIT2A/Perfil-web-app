import React from "react";
import Select from "./Select";
import CheckboxGroup from "./CheckboxGroup";
import RadioButton from "./RadioButton";
import TextArea from "./TextArea";
import FormikInput from "./FormikInput";
import DatePicker from "./DatePicker";
import DateTimePicker from "./DateTimePicker";
import TimePicker from "./TimePicker";
function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <FormikInput {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "radio":
      return <RadioButton {...rest} />;
    case "checkbox":
      return <CheckboxGroup {...rest} />;
    case 'date':
      return <DatePicker {...rest} />;
    case 'datetime':
      return <DateTimePicker {...rest} />;
    case 'time':
      return <TimePicker {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;

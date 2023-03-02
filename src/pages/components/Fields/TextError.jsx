import React from "react";
import { Text } from "@chakra-ui/react";
function TextError(props) {
  return <Text color="red">{props.children}</Text>;
}

export default TextError;

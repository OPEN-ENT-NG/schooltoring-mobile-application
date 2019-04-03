import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "react-native";

import styles from "./styles";

const InputText = props => {
  return <TextInput {...props} style={[styles.input, props.style || {}]} />;
};

InputText.propTypes = {
  props: PropTypes.object
};

export default InputText;

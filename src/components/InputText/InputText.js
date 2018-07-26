import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextInput, Platform } from "react-native";

import styles from "./styles";

const InputText = props => {
  return (
    <TextInput
      secureTextEntry={props.secureTextEntry || false}
      style={styles.input}
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={val => props.onChangeText(val)}
    />
  );
};

InputText.propTypes = {
  secureTextEntry: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired
};

export default InputText;

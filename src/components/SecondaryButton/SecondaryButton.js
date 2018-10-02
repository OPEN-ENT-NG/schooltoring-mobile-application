import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

import Touchable from "../Touchable/Touchable";

import styles from "./styles";
import { COLORS } from "../../styles/common";

const SecondaryButton = props => {
  const children = props.children || (
    <Text style={styles.buttonText}>{props.title}</Text>
  );

  return (
    <View
      style={[
        props.style || {},
        styles.button,
        props.disabled && { backgroundColor: COLORS.GREY }
      ]}
    >
      <Touchable
        disabled={props.disabled}
        onPress={() => props.onPress()}
        hitSlop={{
          top: 10,
          left: 10,
          right: 10,
          bottom: 10
        }}
      >
        {children}
      </Touchable>
    </View>
  );
};

SecondaryButton.propTypes = {
  children: PropTypes.any,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.any,
  title: PropTypes.string,
  disabled: PropTypes.bool
};

export default SecondaryButton;

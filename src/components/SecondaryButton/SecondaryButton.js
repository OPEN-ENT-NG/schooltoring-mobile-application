import React from "react";
import { TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

export const SecondaryButton = props => {
  const children = props.children || (
    <Text style={styles.buttonText}>{props.title}</Text>
  );

  return (
    <TouchableOpacity
      style={[props.style || {}, styles.button]}
      onPress={() => props.onPress()}
      hitSlop={{
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

SecondaryButton.propTypes = {
  children: function(props, propName) {
    if (props[propName] == undefined && props["title"] == undefined) {
      return new Error("Please provide a title or a child element");
    } else if (
      props[propName] != undefined &&
      typeof props[propName] != "element"
    ) {
      return new Error("Please provide a child element");
    }
  },
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  title: function(props, propName) {
    if (props[propName] == undefined && props["children"] == undefined) {
      return new Error("Please provide a title or a child element");
    } else if (
      props[propName] != undefined &&
      typeof props[propName] != "string"
    ) {
      return new Error("Please provide a title string");
    }
  }
};

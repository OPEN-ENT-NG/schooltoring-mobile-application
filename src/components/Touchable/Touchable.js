import React from "react";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform
} from "react-native";
import PropTypes from "prop-types";

const Touchable = props => {
  return Platform.OS === "android" ? (
    <TouchableNativeFeedback onPress={props.onPress}>
      {props.children}
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity onPress={props.onPress}>
      {props.children}
    </TouchableOpacity>
  );
};

Touchable.propTypes = {
  onPress: PropTypes.func.isRequired
};

export default Touchable;

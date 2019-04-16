import React from "react";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  View
} from "react-native";
import PropTypes from "prop-types";

const Touchable = props => {
  return Platform.OS === "android" ? (
    <TouchableNativeFeedback
      disabled={props.disabled}
      onPress={props.onPress}
      hitSlop={props.hitSlop}>
      <View style={props.style}>{props.children}</View>
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity
      style={props.style}
      disabled={props.disabled}
      onPress={props.onPress}
      hitSlop={props.hitSlop}>
      {props.children}
    </TouchableOpacity>
  );
};

Touchable.propTypes = {
  onPress: PropTypes.func.isRequired,
  hitSlop: PropTypes.object,
  disabled: PropTypes.bool
};

export default Touchable;

import React from "react";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  View
} from "react-native";

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

export default Touchable;

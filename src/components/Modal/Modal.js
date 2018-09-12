import React from "react";
import { Image, View, Text } from "react-native";
import Proptypes from "prop-types";

import SecondaryButton from "../SecondaryButton/SecondaryButton";
import styles from "./styles";

const Modal = props => (
  <View style={styles.container}>
    <View
      style={{
        width: "70%",
        borderRadius: 5,
        overflow: "hidden"
      }}
    >
      <View style={styles.image}>
        <Image
          style={{ width: "100%" }}
          resizeMode="contain"
          source={props.imageSrc}
        />
      </View>
      <View style={styles.message}>
        <Text id="title" style={styles.title}>
          {props.title}
        </Text>
        <Text id="text" style={styles.text}>
          {props.text}
        </Text>
        <SecondaryButton
          title={props.buttonText || "OK"}
          onPress={props.onPress}
        />
      </View>
    </View>
  </View>
);

export default Modal;

Modal.Proptypes = {
  title: function(props, propName) {
    if (
      props["text"] == true &&
      (props[propName] == undefined || typeof props[propName] != "string")
    ) {
      return new Error("Please provide a title");
    }
  },
  text: function(props, propName) {
    if (
      props["title"] == true &&
      (props[propName] == undefined || typeof props[propName] != "string")
    ) {
      return new Error("Please provide a text");
    }
  },
  imageSrc: Proptypes.string.isRequired,
  buttonText: Proptypes.string,
  onPress: Proptypes.func.isRequired
};

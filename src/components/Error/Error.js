import React from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

const Error = props => {
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        {typeof props.message === "string" ? (
          <Text style={props.messageStyle || styles.message}>
            {props.message}
          </Text>
        ) : (
          props.message
        )}
      </View>

      {props.side && (
        <View style={styles[props.side]}>
          <Image source={props.imgSrc} resizeMode="contain" />
        </View>
      )}
    </View>
  );
};

Error.propTypes = {
  messageStyle: PropTypes.object,
  message: PropTypes.any.isRequired,
  imgSrc: PropTypes.any.isRequired,
  side: PropTypes.oneOf(["left", "right"])
};

export default Error;

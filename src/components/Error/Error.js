import React from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

const Error = props => {
  return (
    <View style={styles.container}>
      {typeof props.message === "string" ? (
        <Text>{props.message}</Text>
      ) : (
        props.message
      )}
      {props.critical ? (
        <Image
          source={require("../../assets/img/gars1b.png")}
          style={styles.imageCritical}
        />
      ) : (
        <Image
          source={require("../../assets/img/fille1.png")}
          style={styles.imageUncritical}
        />
      )}
    </View>
  );
};

Error.propTypes = {
  message: PropTypes.any.isRequired,
  critical: PropTypes.bool.isRequired
};

export default Error;

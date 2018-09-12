import React from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

const Error = props => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {typeof props.message === "string" ? (
          <Text>{props.message}</Text>
        ) : (
          props.message
        )}
      </View>
      <View style={{ flex: 1 }}>
        {props.critical ? (
          <Image
            source={require("../../assets/img/gars1b.png")}
            resizeMode="contain"
            style={styles.imageCritical}
          />
        ) : (
          <Image
            source={require("../../assets/img/fille1.png")}
            resizeMode="contain"
            style={styles.imageUncritical}
          />
        )}
      </View>
    </View>
  );
};

Error.propTypes = {
  message: PropTypes.any.isRequired,
  critical: PropTypes.bool.isRequired
};

export default Error;

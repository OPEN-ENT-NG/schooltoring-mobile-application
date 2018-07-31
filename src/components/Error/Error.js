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
      <Image
        source={require("../../assets/img/gars1b.png")}
        style={styles.image}
      />
    </View>
  );
};

Error.propTypes = {
  message: PropTypes.any.isRequired
};

export default Error;

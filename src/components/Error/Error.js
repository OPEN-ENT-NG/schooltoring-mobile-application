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
        <Image
          source={props.imgSrc}
          resizeMode="contain"
          style={styles[props.side]}
        />
      </View>
    </View>
  );
};

Error.propTypes = {
  message: PropTypes.any.isRequired,
  imgSrc: PropTypes.any.isRequired,
  side: PropTypes.oneOf(["left", "right"])
};

export default Error;

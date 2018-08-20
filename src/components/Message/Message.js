import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

import Avatar from "../Avatar/Avatar";

const Message = props => {
  const bubbleStyle = ({ color, direction }) => {
    let corner =
      direction === "left"
        ? {
            borderBottomRightRadius: 5
          }
        : { borderBottomLeftRadius: 5 };
    return { backgroundColor: color, ...corner };
  };

  return (
    <View
      style={[
        styles.message,
        { flexDirection: props.direction === "right" ? "row-reverse" : "row" }
      ]}
    >
      <View style={styles.avatar}>
        <Avatar
          size={60}
          src={`${global.config.auth.endpoint}${props.avatar}`}
        />
      </View>
      <View style={[styles.bubble, bubbleStyle(props)]}>
        <Text style={styles.text}>{props.message}</Text>
      </View>
    </View>
  );
};

Message.propTypes = {
  direction: PropTypes.oneOf(["right", "left"]),
  color: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default Message;

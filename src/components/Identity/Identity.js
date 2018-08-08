import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import Avatar from "../Avatar/Avatar";

import styles from "./styles";

const Identity = props => (
  <View style={styles.top}>
    <View style={styles.avatarContainer}>
      <Avatar
        size={props.avatar.size}
        src={`${global.config.auth.endpoint}${props.avatar.src}`}
      />
    </View>

    <View style={styles.topRight}>
      <Text style={styles.name} id="username-field">
        {props.userinfo.username}
      </Text>
      <Text style={styles.titleText} id="classname-field">
        {props.userinfo.classNames[0].split("$")[1]}
      </Text>
    </View>
  </View>
);

Identity.propTypes = {
  avatar: PropTypes.shape({
    size: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired
  }),
  userinfo: PropTypes.shape({
    username: PropTypes.string.isRequired,
    classNames: PropTypes.array.isRequired
  })
};

export default Identity;

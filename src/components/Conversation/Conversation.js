import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import Icon from "react-native-vector-icons/MaterialIcons";

import Touchable from "../../components/Touchable/Touchable";
import styles from "./styles";
import { COLORS } from "../../styles/common";

import Avatar from "../Avatar/Avatar";

const getColor = state => {
  return state === "STRENGTH" ? COLORS.SECONDARY : COLORS.PRIMARY;
};

const Conversation = props => {
  return (
    <Touchable onPress={props.onPress}>
      <View style={styles.conversation}>
        <View style={styles.avatar}>
          <Avatar
            size={60}
            src={`${global.config.auth.endpoint}${props.userinfo.avatar}`}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.name} id="username-field">
            {props.userinfo.username}
          </Text>

          <View style={styles.message}>
            <Icon
              name="chat"
              color={getColor(props.state)}
              style={styles.icon}
            />
            <Text style={styles.text} numberOfLines={1} id="message-field">
              {props.message}
            </Text>

            <View style={styles.date}>
              <Text style={styles.dateText}>{props.date}</Text>
            </View>
          </View>
        </View>
      </View>
    </Touchable>
  );
};

Conversation.propTypes = {
  state: PropTypes.string.isRequired,
  userinfo: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired,
  date: PropTypes.string.isRequired,
  message: PropTypes.string,
  onPress: PropTypes.func.isRequired
};

export default Conversation;

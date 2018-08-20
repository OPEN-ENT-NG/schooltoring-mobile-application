import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import Icon from "react-native-vector-icons/MaterialIcons";
import I18n from "react-native-i18n";
import moment from "moment";

import Touchable from "../../components/Touchable/Touchable";
import styles from "./styles";
import { COLORS } from "../../styles/common";

import Avatar from "../Avatar/Avatar";

const getColor = state => {
  return state === "STRENGTH" ? COLORS.SECONDARY : COLORS.PRIMARY;
};

const getDate = timestamp => {
  moment.updateLocale("fr", I18n.t("locale"));
  let now = moment();
  let date = moment(timestamp);

  if (date.isSame(now, "day")) {
    return date.format("HH:mm");
  } else if (
    date.isBefore(moment().startOf("day")) &&
    date.isAfter(
      moment()
        .subtract(1, "d")
        .startOf("day")
    )
  ) {
    return date.calendar(now);
  } else if (date.isSame(now, "week")) {
    return date.format("ddd");
  } else if (date.isSame(now, "year")) {
    return date.format("DD MMM");
  } else {
    return date.format("DD MMM Y");
  }
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
              <Text style={styles.dateText}>{getDate(props.date)}</Text>
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

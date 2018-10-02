import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import Icon from "react-native-vector-icons/MaterialIcons";

import styles from "./styles";

import Avatar from "../Avatar/Avatar";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import Loader from "../Loader/Loader";

const FavoriteBadge = props => {
  return (
    <View style={styles.badge}>
      <View style={styles.top}>
        <Avatar
          size={140}
          src={`${global.config.auth.endpoint}${props.userinfo.avatar}`}
        />
      </View>
      <View style={styles.bottom}>
        <View style={styles.buttons}>
          <SecondaryButton id="on-delete-button" onPress={props.onDelete}>
            <Icon size={32} color={"red"} name="favorite" />
          </SecondaryButton>
          <SecondaryButton
            id="on-chat-button"
            style={styles.chatButton}
            onPress={props.onChat}
            disabled={!!props.chatDisabled}
          >
            <Icon size={20} color={"white"} name={"chat"} />
          </SecondaryButton>
        </View>
        <View style={{ paddingHorizontal: 10, paddingBottom: 15 }}>
          <Text style={styles.name} id="username-field">
            {props.userinfo.username}
          </Text>
        </View>
      </View>
      {props.loading && <Loader style={styles.loader} />}
    </View>
  );
};

FavoriteBadge.propTypes = {
  userinfo: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChat: PropTypes.func.isRequired,
  chatDisabled: PropTypes.bool
};

export default FavoriteBadge;

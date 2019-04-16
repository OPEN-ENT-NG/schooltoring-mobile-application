import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import Icon from "react-native-vector-icons/MaterialIcons";

import styles from "./styles";
import { COLORS } from "../../styles/common";

import Avatar from "../Avatar/Avatar";
import SubjectBadge from "../SubjectBadge/SubjectBadge";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import Loader from "../Loader/Loader";
import Touchable from "../Touchable/Touchable";

const getColor = state => {
  return state === "STRENGTH" ? COLORS.SECONDARY : COLORS.PRIMARY;
};

const RequestBadge = props => {
  return (
    <View style={styles.badge}>
      <Touchable style={styles.left} onPress={props.viewProfile}>
        <Avatar
          size={80}
          src={`${global.config.auth.endpoint}${props.userinfo.avatar}`}
        />
      </Touchable>
      <View style={styles.right}>
        <View style={styles.identity}>
          <View style={styles.nameContainer}>
            <Touchable onPress={props.viewProfile}>
              <Text style={styles.name} id="username-field">
                {props.userinfo.username}
              </Text>
            </Touchable>
            <SecondaryButton id="favorite-button" onPress={props.onFavorite}>
              <Icon
                name="favorite"
                color={props.isFavorite ? "red" : COLORS.GREY}
                size={20}
              />
            </SecondaryButton>
          </View>
          <Text style={styles.titleText} id="classname-field">
            {props.userinfo.classNames[0].split("$")[1]}
          </Text>
          <View style={styles.features}>
            {props.subjects.map(subject => (
              <SubjectBadge
                key={subject.subjectId}
                color={getColor(props.state)}
                title={subject.subjectLabel}
              />
            ))}
          </View>
        </View>
        <View style={styles.buttons}>
          <SecondaryButton
            id="refuse-button"
            style={styles.declineButton}
            onPress={props.onRefuse}>
            <Icon name="clear" style={styles.roundButtonIcon} />
          </SecondaryButton>
          <SecondaryButton
            id="accept-button"
            style={styles.acceptButton}
            onPress={props.onAccept}>
            <Icon name="chat" style={styles.roundButtonIcon} />
          </SecondaryButton>
        </View>
      </View>
      {props.loading && (
        <Loader style={styles.loader} color={getColor(props.state)} />
      )}
    </View>
  );
};

RequestBadge.propTypes = {
  userinfo: PropTypes.shape({
    username: PropTypes.string.isRequired,
    classNames: PropTypes.array.isRequired,
    avatar: PropTypes.string
  }).isRequired,
  subjects: PropTypes.arrayOf(
    PropTypes.shape({
      subjectId: PropTypes.string.isRequired,
      subjectLabel: PropTypes.string.isRequired
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  onRefuse: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool
};

export default RequestBadge;

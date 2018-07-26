import React from "react";
import { View, Text, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import PropTypes from "prop-types";

import I18n from "../../api/I18n";

import { Avatar } from "../Avatar/Avatar";
import { SecondaryButton } from "../SecondaryButton/SecondaryButton";
import { SubjectBadge } from "../SubjectBadge/SubjectBadge";
import Touchable from "../Touchable/Touchable";

import { COLORS } from "../../styles/common";
import styles from "./styles";

export const Profile = props => {
  getSubjectsName = data => {
    return props.subjects
      .filter(({ subjectId }) =>
        data.find(({ subject_id }) => subject_id === subjectId)
      )
      .map(({ subjectLabel }) => subjectLabel);
  };

  renderSubject = (item, backgroundColor) => {
    return (
      <SubjectBadge
        key={item}
        style={{
          backgroundColor: backgroundColor
        }}
        title={item}
      />
    );
  };

  renderAvailability = item => {
    return (
      <View
        key={item}
        style={[
          styles.item,
          {
            backgroundColor:
              props.profile.availabilities[item] === true
                ? COLORS.NEGATIVE
                : COLORS.GREY
          }
        ]}
      >
        <Text style={styles.itemText}>
          {I18n.t(`availability.${item}`)
            .charAt(0)
            .toUpperCase()}
        </Text>
      </View>
    );
  };

  const ProfileItem = props => {
    return (
      <View id={props.id}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{props.title}</Text>
          <Touchable onPress={() => props.edit()}>
            <Icon style={styles.titleIcon} name="create" />
          </Touchable>
        </View>

        <View style={[styles.list, props.listStyle]}>
          {props.data.map(item => props.renderItem(item))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.top}>
          <Avatar
            size={120}
            src={`${global.config.auth.endpoint}${props.userinfo.avatar}`}
          />

          <View style={styles.topRight}>
            <Text style={styles.name} id="username-field">
              {props.userinfo.username}
            </Text>
            <Text style={styles.titleText} id="classname-field">
              {props.userinfo.classNames[0].split("$")[1]}
            </Text>
            {props.showTopButtons && (
              <View style={styles.topRightButtons}>
                <Icon style={styles.titleIcon} name="stars" size={30} />
                <Text style={[styles.titleText, { marginRight: 20 }]}>
                  {I18n.t("badges")}
                </Text>
                <Icon style={styles.titleIcon} name="favorite" size={30} />
                <Text style={styles.titleText}>{I18n.t("favorites")}</Text>
              </View>
            )}
          </View>
        </View>

          <View style={styles.flex}>
            <ProfileItem
              id="strengths-section"
              title={I18n.t("strength.title")}
              edit={() => props.navigation.push("Strength")}
              data={getSubjectsName(props.profile.strengths)}
              renderItem={item => renderSubject(item, COLORS.PRIMARY)}
            />

          <View style={styles.divider} />

            <ProfileItem
              id="weaknesses-section"
              title={I18n.t("weakness.title")}
              edit={() => props.navigation.push("Weakness")}
              data={getSubjectsName(props.profile.weaknesses)}
              renderItem={item => renderSubject(item, COLORS.SECONDARY)}
            />

          <View style={styles.divider} />

          <ProfileItem
            id="availabilities-section"
            title={I18n.t("availability.title")}
            edit={() => props.navigation.push("Availability")}
            data={Object.keys(props.profile.availabilities)}
            listStyle={{ justifyContent: "space-evenly" }}
            renderItem={item => renderAvailability(item)}
          />
        </View>
      </ScrollView>
      {!props.showTopButtons && (
        <View style={styles.buttonView}>
          <SecondaryButton
            style={styles.button}
            onPress={() => props.saveProfile()}
            title={I18n.t("save")}
          />
        </View>
      )}
    </View>
  );
};

Profile.propTypes = {
  subjects: PropTypes.arrayOf(
    PropTypes.shape({
      subjectId: PropTypes.string,
      subjectCode: PropTypes.string,
      subjectLabel: PropTypes.string
    })
  ).isRequired,
  profile: PropTypes.shape({
    availabilities: PropTypes.shape({
      monday: PropTypes.bool.isRequired,
      tuesday: PropTypes.bool.isRequired,
      wednesday: PropTypes.bool.isRequired,
      thursday: PropTypes.bool.isRequired,
      friday: PropTypes.bool.isRequired,
      saturday: PropTypes.bool.isRequired,
      sunday: PropTypes.bool.isRequired
    }),
    weaknesses: PropTypes.arrayOf(
      PropTypes.shape({ subject_id: PropTypes.string.isRequired })
    ),
    strengths: PropTypes.arrayOf(
      PropTypes.shape({ subject_id: PropTypes.string.isRequired })
    )
  }).isRequired,
  userinfo: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  showTopButtons: PropTypes.bool,
  saveProfile: PropTypes.func
};

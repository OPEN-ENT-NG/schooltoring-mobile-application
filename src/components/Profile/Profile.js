import React from "react";
import { View, Text, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import PropTypes from "prop-types";

import I18n from "../../api/I18n";

import Identity from "../Identity/Identity";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import SubjectBadge from "../SubjectBadge/SubjectBadge";
import Touchable from "../Touchable/Touchable";
import DayBadge from "../DayBadge/DayBadge";

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
    return <SubjectBadge key={item} color={backgroundColor} title={item} />;
  };

  renderAvailability = item => {
    return (
      <DayBadge
        key={item}
        label={I18n.t(`availability.${item}`)
          .charAt(0)
          .toUpperCase()}
        available={props.profile.availabilities[item]}
      />
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
        <Identity
          userinfo={props.userinfo}
          avatar={{ size: 120, src: props.userinfo.avatar }}
        />
        {props.showTopButtons && (
          <View style={{ width: "100%", flexDirection: "row" }}>
            <View style={styles.topRightButtons}>
              <Touchable onPress={() => false}>
                <View style={styles.topRightButton}>
                  <Icon style={styles.titleIcon} name="stars" size={30} />
                  <Text style={[styles.titleText, { marginRight: 20 }]}>
                    {I18n.t("badges")}
                  </Text>
                </View>
              </Touchable>
              <Touchable onPress={() => props.navigation.push("Favorite")}>
                <View style={styles.topRightButton}>
                  <Icon style={styles.titleIcon} name="favorite" size={30} />
                  <Text style={styles.titleText}>{I18n.t("favorites")}</Text>
                </View>
              </Touchable>
            </View>
          </View>
        )}

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

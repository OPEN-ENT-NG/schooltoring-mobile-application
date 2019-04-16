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

const Profile = props => {
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

  const ProfileItem = ({
    id,
    title,
    edit,
    data,
    listStyle,
    renderItem,
    viewOnly
  }) => {
    return (
      <View id={id}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{title}</Text>
          {!!edit && !viewOnly && (
            <Touchable onPress={() => edit()}>
              <Icon style={styles.titleIcon} name="create" />
            </Touchable>
          )}
        </View>

        <View style={[styles.list, listStyle]}>
          {data.map(item => renderItem(item))}
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
        <View style={styles.topRightButtons}>
          {props.showTopButtons && (
            <Touchable onPress={() => false}>
              <View style={styles.topRightButton}>
                <Icon style={styles.titleIcon} name="stars" size={30} />
                <Text style={[styles.titleText, { marginRight: 20 }]}>
                  {I18n.t("badges")}
                </Text>
              </View>
            </Touchable>
          )}
          {props.showTopButtons && (
            <Touchable onPress={() => props.navigation.push("Favorite")}>
              <View style={styles.topRightButton}>
                <Icon style={styles.titleIcon} name="favorite" size={30} />
                <Text style={styles.titleText}>{I18n.t("favorites")}</Text>
              </View>
            </Touchable>
          )}

          {!props.showTopButtons && props.viewOnly && (
            <SecondaryButton
              style={styles.topRightButton}
              onPress={props.toggleFavorite}>
              <Icon
                style={{ marginRight: 5, marginLeft: 5 }}
                name="favorite"
                color={props.isFavorite ? "red" : COLORS.GREY}
                size={30}
              />
              <Text style={styles.titleText}>{I18n.t("favorites")}</Text>
            </SecondaryButton>
          )}
        </View>
        <View style={styles.flex}>
          <ProfileItem
            id="strengths-section"
            title={I18n.t("strength.title")}
            edit={() => props.navigation.push("Strength")}
            data={getSubjectsName(props.profile.strengths)}
            renderItem={item => renderSubject(item, COLORS.PRIMARY)}
            viewOnly={props.viewOnly}
          />

          <View style={styles.divider} />

          <ProfileItem
            id="weaknesses-section"
            title={I18n.t("weakness.title")}
            edit={() => props.navigation.push("Weakness")}
            data={getSubjectsName(props.profile.weaknesses)}
            renderItem={item => renderSubject(item, COLORS.SECONDARY)}
            viewOnly={props.viewOnly}
          />

          <View style={styles.divider} />

          <ProfileItem
            id="availabilities-section"
            title={I18n.t("availability.title")}
            edit={() => props.navigation.push("Availability")}
            data={Object.keys(props.profile.availabilities)}
            listStyle={{ justifyContent: "space-evenly" }}
            renderItem={item => renderAvailability(item)}
            viewOnly={props.viewOnly}
          />
        </View>
      </ScrollView>
      {!props.showTopButtons && !props.viewOnly && (
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
  navigation: PropTypes.object,
  showTopButtons: PropTypes.bool,
  saveProfile: PropTypes.func,
  isFavorite: PropTypes.bool,
  toggleFavorite: PropTypes.func,
  viewOnly: PropTypes.bool
};

export default Profile;

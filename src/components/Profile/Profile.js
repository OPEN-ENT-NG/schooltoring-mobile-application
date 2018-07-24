import React, { Component } from "react";
import { View, Text, ScrollView, TouchableNativeFeedback } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import PropTypes from "prop-types";

import I18n from "../../api/I18n";

import Avatar from "../Avatar/Avatar";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import SubjectBadge from "../SubjectBadge/SubjectBadge";

import { COLORS } from "../../styles/common";
import styles from "./styles";

export default class Profile extends Component {
  getSubjectsName(data) {
    return this.props.subjects
      .filter(({ subjectId }) =>
        data.find(({ subject_id }) => subject_id === subjectId)
      )
      .map(({ subjectLabel }) => subjectLabel);
  }

  renderSubject(item, backgroundColor) {
    return (
      <SubjectBadge
        key={item => item}
        style={{
          backgroundColor: backgroundColor
        }}
        title={item}
      />
    );
  }

  renderAvailability(item) {
    return (
      <View
        key={item => item}
        style={[
          styles.item,
          {
            backgroundColor:
              this.props.profile.availabilities[item] === true
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
  }

  render() {
    return (
      <View style={styles.flex}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.top}>
            <Avatar size={120} />

            <View style={styles.topRight}>
              <Text style={styles.name}>{this.props.userinfo.username}</Text>
              <Text style={styles.titleText}>
                {this.props.userinfo.classNames[0].split("$")[1]}
              </Text>
              {this.props.showTopButtons && (
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
              title={I18n.t("strength.title")}
              edit={() => this.props.navigation.push("Strength")}
              data={this.getSubjectsName(this.props.profile.strengths)}
              renderItem={item => this.renderSubject(item, COLORS.PRIMARY)}
            />

            <View style={styles.divider} />

            <ProfileItem
              title={I18n.t("weakness.title")}
              edit={() => this.props.navigation.push("Weakness")}
              data={this.getSubjectsName(this.props.profile.weaknesses)}
              renderItem={item => this.renderSubject(item, COLORS.SECONDARY)}
            />

            <View style={styles.divider} />

            <ProfileItem
              title={I18n.t("availability.title")}
              edit={() => this.props.navigation.push("Availability")}
              data={Object.keys(this.props.profile.availabilities)}
              listStyle={{ justifyContent: "space-evenly" }}
              renderItem={item => this.renderAvailability(item)}
            />
          </View>
        </ScrollView>
        {!this.props.showTopButtons && (
          <View style={styles.buttonView}>
            <SecondaryButton
              style={styles.button}
              onPress={() => this.props.saveProfile()}
              title={I18n.t("save")}
            />
          </View>
        )}
      </View>
    );
  }
}

const ProfileItem = props => {
  return (
    <View>
      <View style={styles.title}>
        <Text style={styles.titleText}>{props.title}</Text>
        <TouchableNativeFeedback onPress={() => props.edit()}>
          <Icon style={styles.titleIcon} name="create" />
        </TouchableNativeFeedback>
      </View>

      <View style={[styles.list, props.listStyle]}>
        {props.data.map(item => props.renderItem(item))}
      </View>
    </View>
  );
};

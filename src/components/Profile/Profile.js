import React, { Component } from "react";
import { View, Text, ScrollView, TouchableNativeFeedback } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import PropTypes from "prop-types";

import I18n from "../../api/I18n";

import Avatar from "../Avatar/Avatar";
import Header from "../Header/Header";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import SubjectBadge from "../SubjectBadge/SubjectBadge";

import { COLORS } from "../../styles/common";
import styles from "./styles";

export default class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header
        navigation={navigation}
        title={I18n.t(`${navigation.state.routeName.toLowerCase()}.title`)}
      />
    )
  });

  renderStrengthWeaknessItem(subject_id, colors) {
    return (
      <View
        key={subject_id}
        style={{ backgroundColor: colors, padding: 5, margin: 3 }}
      >
        <Text style={{ color: COLORS.WHITE }}>
          {this.props.screenProps.subjects
            .find(item => item.subjectId == subject_id)
            .subjectLabel.toUpperCase()}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.top}>
            <Avatar size={80} source={this.props.screenProps.userinfo.avatar} />

            <View style={styles.topRight}>
              <Text style={styles.name}>
                {this.props.screenProps.userinfo.username}
              </Text>
              <Text>
                {this.props.screenProps.userinfo.classNames[0].split("$")[1]}
              </Text>
            </View>
          </View>

          <View style={styles.main}>
            <ProfileItem
              title={I18n.t("strength.title")}
              edit={() => this.props.navigation.push("Strength")}
              data={this.props.screenProps.profile.strengths}
              getKey={item => item.subjectId}
              itemColor={COLORS.PRIMARY}
            />

            <View style={styles.divider} />

            <ProfileItem
              title={I18n.t("weakness.title")}
              edit={() => this.props.navigation.push("Weakness")}
              data={this.props.screenProps.profile.weaknesses}
              getKey={item => item.subjectId}
              itemColor={COLORS.SECONDARY}
            />

            <View style={styles.divider} />

            <ProfileItem
              title={I18n.t("availability.title")}
              edit={() => this.props.navigation.push("Availability")}
              data={Object.keys(this.props.screenProps.profile.availabilities)}
              listStyle={{ justifyContent: "space-evenly" }}
              renderItem={item => (
                <View
                  key={item => item}
                  style={[
                    styles.item,
                    {
                      backgroundColor:
                        this.props.screenProps.profile.availabilities[item] ===
                        true
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
              )}
            />
          </View>
        </ScrollView>
        <View style={styles.buttonView}>
          <SecondaryButton
            style={styles.button}
            onPress={() => this.props.screenProps.saveProfile()}
            title={I18n.t("save")}
          />
        </View>
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
        {props.data.map(
          item =>
            props.hasOwnProperty("renderItem") ? (
              props.renderItem(item)
            ) : (
              <SubjectBadge
                key={item => props.getKey(item)}
                style={{
                  backgroundColor: props.itemColor
                }}
                title={item.subjectLabel}
              />
            )
        )}
      </View>
    </View>
  );
};

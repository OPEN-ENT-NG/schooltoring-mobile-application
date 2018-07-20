import React, { Component } from "react";
import {
  View,
  Text,
  Switch,
  TouchableWithoutFeedback,
  ScrollView
} from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

import I18n from "../../api/I18n";

import SecondaryButton from "../SecondaryButton/SecondaryButton";
import Header from "../Header/Header";

export default class Availability extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header
        navigation={navigation}
        title={I18n.t(`${navigation.state.routeName.toLowerCase()}.title`)}
      />
    )
  });

  constructor(props) {
    super(props);
    this.state = props.screenProps.profile.availabilities || {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true
    };

    this.renderDay = this.renderDay.bind(this);
    this.setDayValue = this.setDayValue.bind(this);
  }

  setDayValue(day, value) {
    let state = {};
    state[day] = value;
    this.setState(state);
  }

  renderDay(day) {
    return (
      <View key={day} style={styles.item}>
        <Switch
          style={styles.itemSwitch}
          value={this.state[day]}
          onValueChange={value => {
            this.setDayValue(day, value);
          }}
        />
        <TouchableWithoutFeedback
          hitSlop={{
            top: 20,
            left: 20,
            right: 40,
            bottom: 20
          }}
          onPress={() => {
            this.setDayValue(day, !this.state[day]);
          }}
        >
          <View>
            <Text style={styles.itemText}>{I18n.t(`availability.${day}`)}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>{I18n.t("availability.description")}</Text>
          <ScrollView contentContainerStyle={styles.list}>
            {Object.keys(this.state).map(day => this.renderDay(day))}
          </ScrollView>
        </View>
        <View style={styles.buttonView}>
          <SecondaryButton
            style={styles.button}
            onPress={() => {
              this.props.screenProps.onChangeScreen("availabilities", {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false
              });
              this.props.navigation.push("Profile");
            }}
            title={I18n.t("skip")}
          />
          <SecondaryButton
            style={styles.button}
            onPress={() => {
              this.props.screenProps.onChangeScreen(
                "availabilities",
                this.state
              );
              this.props.navigation.push("Profile");
            }}
            title={I18n.t("next")}
          />
        </View>
      </View>
    );
  }
}

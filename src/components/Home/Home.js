import React, { Component } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import Proptypes from "prop-types";
import EventTracker from "../../api/EventTracker";

import Touchable from "../../components/Touchable/Touchable";
import styles from "./styles";

import I18n from "react-native-i18n";

const screen = Dimensions.get("screen");

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        width: screen.width,
        height: screen.height - 70
      }
    };
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
        onLayout={event => {
          this.setState({
            view: {
              height: event.nativeEvent.layout.height,
              width: event.nativeEvent.layout.width
            }
          });
        }}
      >
        <Touchable
          onPress={() => {
            EventTracker.trackEvent(
              EventTracker.events.SEEK_HELP.click,
              EventTracker.category.SEEK_HELP
            );
            this.props.navigation.push("Strength");
          }}
        >
          <View
            style={[
              styles.topHalf,
              {
                width: this.state.view.width,
                height: this.state.view.height / 2
              }
            ]}
          >
            <Text style={[styles.text, styles.textLeft]}>
              {I18n.t("needHelp")}
            </Text>
            <View style={styles.topImageContainer}>
              <Image
                style={{ height: 250, width: 202 }}
                resizeMode="contain"
                source={require("../../assets/img/gars2b.png")}
              />
            </View>
          </View>
        </Touchable>
        <Touchable
          onPress={() => {
            EventTracker.trackEvent(
              EventTracker.events.OFFER_HELP.click,
              EventTracker.category.OFFER_HELP
            );
            this.props.navigation.push("Weakness");
          }}
        >
          <View
            style={[
              styles.bottomHalf,
              {
                width: this.state.view.width,
                height: this.state.view.height / 2
              }
            ]}
          >
            <View style={styles.bottomImageContainer}>
              <Image
                style={{ height: 250, width: 232 }}
                resizeMode="contain"
                source={require("../../assets/img/fille2.png")}
              />
            </View>
            <Text style={[styles.text, styles.textRight]}>
              {I18n.t("offerHelp")}
            </Text>
          </View>
        </Touchable>
      </View>
    );
  }
}

Home.proptypes = {
  navigation: Proptypes.any.isRequired
};

import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  StatusBar
} from "react-native";
import styles from "./styles";

import I18n from "react-native-i18n";
import { COLORS } from "../../styles/common";

export default class Home extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={COLORS.SECONDARY}
          barStyle="light-content"
        />
        <TouchableNativeFeedback onPress={() => true}>
          <View style={styles.topHalf}>
            <Text style={styles.text}>{I18n.t("needHelp")}</Text>
            <View style={styles.topImageContainer}>
              <Image
                style={{ height: 250, width: 202 }}
                resizeMode="contain"
                source={require("../../assets/img/gars2b.png")}
              />
            </View>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => true}>
          <View style={styles.bottomHalf}>
            <View style={styles.bottomImageContainer}>
              <Image
                style={{ height: 250, width: 232 }}
                resizeMode="contain"
                source={require("../../assets/img/fille2.png")}
              />
            </View>
            <Text style={styles.text}>{I18n.t("offerHelp")}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

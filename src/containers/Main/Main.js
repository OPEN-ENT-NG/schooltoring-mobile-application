import React, { Component } from "react";
import { View } from "react-native";
import firebase from "react-native-firebase/dist/index";

import Navigator from "../Navigator/Navigator";
import Modal from "../Modal/Modal";
import NavigationService from "../../api/Navigation";

export default class Main extends Component {
  async componentDidMount() {
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      data = notificationOpen.notification._data;
      NavigationService.navigate("Messages", {
        conversationId: data.request,
        userinfo: {
          username: data.username,
          avatar: data.avatar
        }
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          ref={navigatorRef => NavigationService.register("root", navigatorRef)}
        />
        <Modal />
      </View>
    );
  }
}

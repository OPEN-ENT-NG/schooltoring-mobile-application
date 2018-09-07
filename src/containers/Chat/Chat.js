import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import I18n from "react-native-i18n";

import Conversations from "../Conversations/Conversations";
import Messages from "../Messages/Messages";
import Header from "../../components/Header/Header";
import NavigationService from "../../api/Navigation";
import { COLORS } from "../../styles/common";

const Chat = createStackNavigator(
  {
    Conversations,
    Messages
  },
  {
    cardStyle: {
      backgroundColor: COLORS.BACKGROUND
    },
    navigationOptions: ({ navigation }) => ({
      header: () => {
        switch (navigation.state.routeName) {
          case "Conversations": {
            return (
              <Header
                noBack={true}
                navigation={navigation}
                title={I18n.t(navigation.state.routeName.toLowerCase())}
              />
            );
          }
          case "Messages": {
            return (
              <Header
                navigation={navigation}
                noBack={false}
                title={navigation.getParam("userinfo").username}
              />
            );
          }
        }
      }
    })
  }
);

export default class ChatNavigator extends Component {
  render() {
    return (
      <Chat
        ref={navigatorRef => NavigationService.register("Chat", navigatorRef)}
      />
    );
  }
}

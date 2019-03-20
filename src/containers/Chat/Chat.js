import React from "react";
import { createStackNavigator } from "react-navigation";
import I18n from "../../api/I18n";

import Conversations from "../Conversations/Conversations";
import Messages from "../Messages/Messages";
import Header from "../../components/Header/Header";
import { COLORS } from "../../styles/common";

export default createStackNavigator(
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
                title={I18n.t(
                  `${navigation.state.routeName.toLowerCase()}.title`
                )}
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

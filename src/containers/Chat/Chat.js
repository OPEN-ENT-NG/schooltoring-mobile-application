import React from "react";
import { createStackNavigator } from "react-navigation";

import I18n from "../../api/I18n";
import NavigationService from "../../api/Navigation";

import Conversations from "../Conversations/Conversations";
import Messages from "../Messages/Messages";
import ViewProfile from "../ViewProfile/ViewProfile";

import Header from "../../components/Header/Header";
import { COLORS } from "../../styles/common";

export default createStackNavigator(
  {
    Conversations,
    Messages,
    ViewProfile
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
                onTitlePress={() =>
                  NavigationService.navigate("ViewProfile", {
                    userinfo: navigation.getParam("userinfo"),
                    id: navigation.getParam("userinfo").id
                  })
                }
              />
            );
          }
        }
      }
    })
  }
);

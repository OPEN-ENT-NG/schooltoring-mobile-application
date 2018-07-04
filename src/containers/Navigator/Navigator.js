import React from "react";
import { createBottomTabNavigator } from "react-navigation";

import Home from "../Home/Home";
import Requests from "../Requests/Requests";
import Messages from "../Messages/Messages";
import Profile from "../Profile/Profile";

import { COLORS } from "../../styles/common";
import NavigationService from "../../api/Navigation";
import Icon from "react-native-vector-icons/MaterialIcons";

const Navigator = createBottomTabNavigator(
  {
    Home,
    Requests,
    Messages,
    Profile
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: () => null,
      tabBarIcon: () => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = "home";
        } else if (routeName === "Requests") {
          iconName = "help";
        }
        if (routeName === "Messages") {
          iconName = "chat";
        }
        if (routeName === "Profile") {
          iconName = "face";
        }
        return <Icon name={iconName} color={COLORS.TEXT} size={25} />;
      }
    })
  }
);

NavigationService.register(Navigator);

export default Navigator;

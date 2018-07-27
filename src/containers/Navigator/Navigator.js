import React from "react";
import { createBottomTabNavigator } from "react-navigation";

import Icon from "react-native-vector-icons/MaterialIcons";

import Home from "../Home/Home";
import Requests from "../Requests/Requests";
import Messages from "../Messages/Messages";
import Profile from "../Profile/Profile";
import store from "../../store/store";

import { COLORS } from "../../styles/common";
import NavigationService from "../../api/Navigation";
import { Avatar } from "../../components/Avatar/Avatar";

const getAvatar = () => {
  let state = store.getState();
  if (state.user.userinfo.hasOwnProperty("avatar")) {
    return `${global.config.auth.endpoint}${state.user.userinfo.avatar}`;
  } else {
    return null;
  }
};

const Navigator = createBottomTabNavigator(
  {
    Home,
    Requests,
    Messages,
    Profile: { screen: props => <Profile {...props} showTopButtons={true} /> }
  },
  {
    navigationOptions: ({ navigation }) => {
      return {
        tabBarLabel: () => null,
        tabBarIcon: () => {
          const { routeName } = navigation.state;
          switch (routeName) {
            case "Home": {
              return <Icon name="home" color={COLORS.TEXT} size={25} />;
            }
            case "Requests": {
              return <Icon name="help" color={COLORS.TEXT} size={25} />;
            }
            case "Messages": {
              return <Icon name="chat" color={COLORS.TEXT} size={25} />;
            }
            case "Profile": {
              return <Avatar color={COLORS.TEXT} size={30} src={getAvatar()} />;
            }
          }
        }
      };
    }
  }
);

NavigationService.register(Navigator);

export default Navigator;

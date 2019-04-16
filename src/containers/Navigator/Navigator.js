import React from "react";
import {
  createBottomTabNavigator,
  StackActions,
  NavigationActions
} from "react-navigation";

import Icon from "react-native-vector-icons/MaterialIcons";

import Home from "../Home/Home";
import Requests from "../Requests/Requests";
import Chat from "../Chat/Chat";
import Profile from "../Profile/Profile";
import store from "../../store/store";

import { COLORS } from "../../styles/common";
import Avatar from "../../components/Avatar/Avatar";

import NavigationService from "../../api/Navigation";

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
    Chat,
    Profile
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: COLORS.LIGHT_GREY
      }
    },
    cardStyle: {
      backgroundColor: COLORS.BACKGROUND
    },
    navigationOptions: ({ navigation }) => ({
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
          case "Chat": {
            return <Icon name="chat" color={COLORS.TEXT} size={25} />;
          }
          case "Profile": {
            return <Avatar color={COLORS.TEXT} size={30} src={getAvatar()} />;
          }
        }
      },
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        defaultHandler();
        // if (navigation.state.routeName != "Profile") {
        navigation.dispatch(
          StackActions.reset({
            index: 0,
            key: null,
            actions: [
              NavigationActions.navigate({
                routeName: navigation.state.routes[0].routeName
              })
            ]
          })
        );
        // } else {
        //   NavigationService.resetProfile();
        // }
      }
    })
  }
);

export default Navigator;

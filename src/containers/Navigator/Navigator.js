import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

import Icon from "react-native-vector-icons/MaterialIcons";
import I18n from "react-native-i18n";

import Home from "../Home/Home";
import Requests from "../Requests/Requests";
import Chat from "../Chat/Chat";
import Profile from "../Profile/Profile";
import store from "../../store/store";

import { COLORS } from "../../styles/common";
import Avatar from "../../components/Avatar/Avatar";
import Header from "../../components/Header/Header";

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
    Requests: createStackNavigator({
      Requests: {
        screen: Requests,
        navigationOptions: ({ navigation }) => ({
          header: (
            <Header
              navigation={navigation}
              noBack={true}
              title={I18n.t(navigation.state.routeName.toLowerCase())}
            />
          )
        })
      }
    }),
    Chat,
    Profile: { screen: props => <Profile {...props} showTopButtons={true} /> }
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
      }
    })
  }
);

export default Navigator;

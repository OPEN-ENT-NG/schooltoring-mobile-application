import React from "react";
import { createStackNavigator } from "react-navigation";
import I18n from "react-native-i18n";

import Conversations from "../Conversations/Conversations";
import Messages from "../Messages/Messages";
import Header from "../../components/Header/Header";
import { COLORS } from "../../styles/common";

const Chat = createStackNavigator(
  {
    Conversations: {
      screen: Conversations,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header
            noBack={true}
            navigation={navigation}
            title={I18n.t(navigation.state.routeName.toLowerCase())}
          />
        )
      })
    },
    Messages
  },
  {
    cardStyle: {
      backgroundColor: COLORS.BACKGROUND
    },
    navigationOptions: () => ({
      header: null
    })
  }
);

export default Chat;

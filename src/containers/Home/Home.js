import React from "react";
import { createStackNavigator } from "react-navigation";

import Home from "../../components/Home/Home";
import MatchList from "../MatchList/MatchList";
import ViewProfile from "../ViewProfile/ViewProfile";

import Header from "../../components/Header/Header";

import I18n from "../../api/I18n";
import { COLORS } from "../../styles/common";

const getHeader = navigation => {
  let routeName = navigation.state.routeName;
  let noBack = navigation.getParam("noBack", false);
  switch (routeName) {
    case "Weakness": {
      return (
        <Header
          navigation={navigation}
          backgroundColor={COLORS.PRIMARY}
          noBack={noBack}
          title={I18n.t(`${routeName.toLowerCase()}.header`)}
        />
      );
    }
    case "Strength": {
      return (
        <Header
          navigation={navigation}
          backgroundColor={COLORS.SECONDARY}
          noBack={noBack}
          title={I18n.t(`${routeName.toLowerCase()}.header`)}
        />
      );
    }
    default: {
      return null;
    }
  }
};

export default createStackNavigator(
  {
    Home: Home,
    Weakness: MatchList,
    Strength: MatchList,
    ViewProfile
  },
  {
    initialRouteName: "Home",
    initialRouteParams: { noBack: true },
    cardStyle: { backgroundColor: COLORS.BACKGROUND },
    navigationOptions: ({ navigation }) => ({
      header: getHeader(navigation)
    })
  }
);

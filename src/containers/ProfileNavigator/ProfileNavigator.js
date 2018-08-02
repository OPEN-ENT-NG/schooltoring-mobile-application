import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";

import { Profile as ProfileComp } from "../../components/Profile/Profile";
import StrengthWeakness from "../../components/StrengthWeakness/StrengthWeakness";
import Availability from "../../components/Availability/Availability";
import PopupMenu from "../../components/PopupMenu/PopupMenu";
import Header from "../../components/Header/Header";

import I18n from "../../api/I18n";
import { COLORS } from "../../styles/common";

const paramsToProps = SomeComponent => {
  return class extends Component {
    render() {
      const { navigation, ...otherProps } = this.props;
      const { screenProps } = otherProps;
      return (
        <SomeComponent
          navigation={navigation}
          {...screenProps}
          saveButton={true}
          showTopButtons={navigation.state.routeName === "Profile"}
        />
      );
    }
  };
};

const getHeader = navigation => {
  let routeName = navigation.state.routeName;
  let noBack = navigation.getParam("noBack", false);
  switch (routeName) {
    case "Strength": {
      return (
        <Header
          navigation={navigation}
          backgroundColor={COLORS.PRIMARY}
          noBack={noBack}
          title={I18n.t(`${routeName.toLowerCase()}.title`)}
          iconName="thumb-up"
        />
      );
    }
    case "Weakness": {
      return (
        <Header
          navigation={navigation}
          backgroundColor={COLORS.SECONDARY}
          noBack={noBack}
          title={I18n.t(`${routeName.toLowerCase()}.title`)}
          iconName="thumb-down"
        />
      );
    }
    case "Availability": {
      return (
        <Header
          navigation={navigation}
          noBack={noBack}
          title={I18n.t(`${routeName.toLowerCase()}.title`)}
        />
      );
    }
  }
};

const Stack = createStackNavigator(
  {
    Strength: paramsToProps(StrengthWeakness),
    Weakness: paramsToProps(StrengthWeakness),
    Availability: paramsToProps(Availability),
    Profile: paramsToProps(ProfileComp)
  },
  {
    initialRouteName: "Profile",
    initialRouteParams: { noBack: true },
    cardStyle: { backgroundColor: COLORS.BACKGROUND },
    navigationOptions: ({ navigation }) => ({
      header:
        navigation.state.routeName !== "Profile" ? getHeader(navigation) : null
    })
  }
);

export default class ProfileNavigator extends Component {
  updateProfile(key, value) {
    const profile = { ...this.state.profile };
    profile[key] = value;
    this.props.updateProfile(profile);
  }

  render() {
    return (
      <Stack
        screenProps={{
          subjects: this.props.subjects,
          profile: this.state.profile,
          userinfo: this.props.userinfo,
          onChangeScreen: this.updateProfile
        }}
      />
    );
  }
}

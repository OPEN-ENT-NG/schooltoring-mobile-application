import React, { Component } from "react";
import { View, StatusBar, Platform } from "react-native";
import { createStackNavigator } from "react-navigation";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Profile as ProfileComp } from "../../components/Profile/Profile";
import StrengthWeakness from "../../components/StrengthWeakness/StrengthWeakness";
import Availability from "../../components/Availability/Availability";
import Header from "../../components/Header/Header";

import { logout } from "../../store/actions/auth";
import { updateProfile } from "../../store/actions/profile";
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

const getHeader = (navigation, screenProps) => {
  let routeName = navigation.state.routeName;
  let noBack = navigation.getParam("noBack", false);
  const rightActions = {
    actions: [I18n.t("logout")],
    onPress: screenProps.onRightActionsPress
  };
  switch (routeName) {
    case "Strength": {
      return (
        <Header
          navigation={navigation}
          backgroundColor={COLORS.PRIMARY}
          noBack={noBack}
          title={I18n.t(`${routeName.toLowerCase()}.title`)}
          iconName="thumb-up"
          rightActions={rightActions}
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
          rightActions={rightActions}
        />
      );
    }
    case "Availability": {
      return (
        <Header
          navigation={navigation}
          noBack={noBack}
          title={I18n.t(`${routeName.toLowerCase()}.title`)}
          rightActions={rightActions}
        />
      );
    }
    default: {
      return (
        <Header
          navigation={navigation}
          noBack={noBack}
          title={I18n.t(`${routeName.toLowerCase()}.title`)}
          rightActions={rightActions}
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
    navigationOptions: ({ navigation, screenProps }) => ({
      header: getHeader(navigation, screenProps)
    })
  }
);

export class Profile extends Component {
  constructor(props) {
    super(props);
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setBarStyle("dark-content");
      Platform.OS === "android" &&
        StatusBar.setBackgroundColor(COLORS.LIGHT_GREY);
    });

    this.state = {
      profile: props.profile || {}
    };

    this.logout = this.logout.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.onPopupMenuPress = this.onPopupMenuPress.bind(this);
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  logout(evt) {
    this.props.logoutUser();
  }

  updateProfile(key, value) {
    const profile = { ...this.state.profile };
    profile[key] = value;
    this.setState({ profile });
    this.props.updateProfile(profile);
  }

  onPopupMenuPress(index) {
    if (index === 0) {
      this.props.logout();
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <Stack
          screenProps={{
            subjects: this.props.subjects,
            profile: this.state.profile,
            userinfo: this.props.userinfo,
            onChangeScreen: this.updateProfile,
            onRightActionsPress: this.onPopupMenuPress
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ subjects, user }) => ({
  subjects: subjects.list,
  userinfo: user.userinfo,
  profile: user.profile
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout, updateProfile }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

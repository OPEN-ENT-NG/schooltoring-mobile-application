import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import ProfileComp from "../../components/Profile/Profile";
import StrengthWeakness from "../../components/StrengthWeakness/StrengthWeakness";
import Availability from "../../components/Availability/Availability";
import Favorite from "../../containers/Favorite/Favorite";
import Header from "../../components/Header/Header";

import ViewProfile from "../ViewProfile/ViewProfile";

import { COLORS } from "../../styles/common";

import I18n from "../../api/I18n";
import EventTracker from "../../api/EventTracker";
import NavigationService from "../../api/Navigation";

import { logout } from "../../store/actions/auth";
import { updateProfile } from "../../store/actions/profile";

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
    case "Profile": {
      return (
        <Header
          noBack={true}
          title={I18n.t(`${routeName.toLowerCase()}.title`)}
          rightActions={rightActions}
        />
      );
    }
    case "ViewProfile": {
      return (
        <Header
          navigation={navigation}
          title={navigation.getParam("userinfo").username}
        />
      );
    }
    default: {
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
    Profile: paramsToProps(ProfileComp),
    Favorite: paramsToProps(Favorite),
    ViewProfile: paramsToProps(ViewProfile)
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

class Profile extends Component {
  static router = {
    ...Stack.router,
    getStateForAction: (action, lastState) => {
      // check for custom actions and return a different navigation state.
      return Stack.router.getStateForAction(action, lastState);
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      profile: props.profile || {}
    };

    this.logout = this.logout.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.onPopupMenuPress = this.onPopupMenuPress.bind(this);
  }

  logout() {
    this.props.logoutUser();
  }

  async updateProfile(key, value) {
    const profile = { ...this.state.profile };
    profile[key] = value;
    this.setState({ profile });
    await this.props.updateProfile(profile);
    EventTracker.trackEvent(
      EventTracker.events.PROFILE[key.toUpperCase()],
      EventTracker.category.PROFILE
    );
  }

  onPopupMenuPress(index) {
    if (index === 0) {
      this.props.logout();
    }
  }

  render() {
    return (
      <Stack
        navigation={this.props.navigation}
        screenProps={{
          subjects: this.props.subjects,
          profile: this.state.profile,
          userinfo: this.props.userinfo,
          onChangeScreen: this.updateProfile,
          onRightActionsPress: this.onPopupMenuPress
        }}
      />
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

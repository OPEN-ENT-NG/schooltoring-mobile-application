import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import I18n from "react-native-i18n";

import { saveProfile } from "../../store/actions/profile";

import StrengthWeakness from "../../components/StrengthWeakness/StrengthWeakness";
import Availability from "../../components/Availability/Availability";
import { Profile } from "../../components/Profile/Profile";
import Header from "../../components/Header/Header";

import { COLORS } from "../../styles/common";
import styles from "./styles";

export class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {}
    };

    this.setProfileValue = this.setProfileValue.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
  }

  setProfileValue(key, value) {
    let newState = {
      ...this.state
    };
    newState.profile[key] = value;
    this.setState(newState);
  }

  saveProfile() {
    this.props.saveProfile(this.state.profile);
  }

  render() {
    return (
      <Stack
        screenProps={{
          subjects: this.props.subjects,
          onChangeScreen: this.setProfileValue,
          profile: this.state.profile,
          userinfo: this.props.userinfo,
          saveProfile: this.saveProfile
        }}
      />
    );
  }
}

const paramsToProps = SomeComponent => {
  // turns this.props.navigation.state.params into this.params.<x>
  return class extends Component {
    render() {
      const { navigation, ...otherProps } = this.props;
      const { screenProps } = otherProps;
      return (
        <SomeComponent
          navigation={navigation}
          {...screenProps}
          saveButton={false}
        />
      );
    }
  };
};

const getHeader = navigation => {
  let routeName = navigation.state.routeName;
  let noBack = navigation.getParam("noBack", false);
  return (
    <Header
      navigation={navigation}
      backgroundColor={
        routeName === "Strength"
          ? COLORS.PRIMARY
          : routeName === "Weakness"
            ? COLORS.SECONDARY
            : null
      }
      noBack={noBack}
      title={I18n.t(`${routeName.toLowerCase()}.title`)}
      iconName={
        routeName === "Strength"
          ? "thumb-up"
          : routeName === "Weakness"
            ? "thumb-down"
            : null
      }
    />
  );
};

const Stack = createStackNavigator(
  {
    Strength: paramsToProps(StrengthWeakness),
    Weakness: paramsToProps(StrengthWeakness),
    Availability: paramsToProps(Availability),
    Profile: paramsToProps(Profile)
  },
  {
    initialRouteName: "Strength",
    initialRouteParams: { noBack: true },
    cardStyle: styles.container,
    navigationOptions: ({ navigation }) => ({
      header: getHeader(navigation)
    })
  }
);

const mapStateToProps = ({ subjects, user }) => ({
  subjects: subjects.list,
  userinfo: user.userinfo
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ saveProfile }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setup);

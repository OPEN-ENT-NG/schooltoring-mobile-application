import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { saveProfile } from "../../store/actions/profile";

import StrengthWeakness from "../../components/StrengthWeakness/StrengthWeakness";
import Availability from "../../components/Availability/Availability";
import Profile from "../../components/Profile/Profile";

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
    let profile = this.state.profile;
    profile.strengths = profile.strengths.map(item => {
      return { subject_id: item.subjectId };
    });
    profile.weaknesses = profile.weaknesses.map(item => {
      return { subject_id: item.subjectId };
    });
    this.props.saveProfile(profile);
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

const Stack = createStackNavigator(
  {
    Strength: StrengthWeakness,
    Weakness: StrengthWeakness,
    Availability,
    Profile
  },
  {
    initialRouteName: "Strength",
    initialRouteParams: { noBack: true },
    cardStyle: styles.container,
    navigationOptions: {
      headerStyle: styles.header,
      headerTitleStyle: styles.titles
    }
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

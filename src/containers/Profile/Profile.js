import React, { Component } from "react";
import { View, StatusBar, Platform } from "react-native";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Profile as ProfileComp } from "../../components/Profile/Profile";

import { logout } from "../../store/actions/auth";

import { COLORS } from "../../styles/common";

export class Profile extends Component {
  constructor(props) {
    super(props);

    this._navListener = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setBarStyle("dark-content");
      Platform.OS === "android" &&
        StatusBar.setBackgroundColor(COLORS.BACKGROUND);
    });

    this.logout = this.logout.bind(this);
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  logout(evt) {
    evt.preventDefault();

    this.props.logoutUser();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ProfileComp {...this.props} />
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
  return bindActionCreators({ logoutUser: logout }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

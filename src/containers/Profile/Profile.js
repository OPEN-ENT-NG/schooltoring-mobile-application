import React, { Component } from "react";
import { View } from "react-native";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import ProfileComp from "../../components/Profile/Profile";

import { logout } from "../../store/actions/auth";

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
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

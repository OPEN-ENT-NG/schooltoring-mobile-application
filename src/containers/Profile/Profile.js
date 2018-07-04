import React, { Component } from "react";
import { View, Text, Button } from "react-native";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import I18n from "../../api/I18n";

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
      <View>
        <Text>Profile</Text>
        <Button title={I18n.t("disconnect")} onPress={this.logout} />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser: logout }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(Profile);

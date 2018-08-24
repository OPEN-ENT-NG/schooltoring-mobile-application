import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import firebase from "../node_modules/react-native-firebase/dist/index";

import { fetchLogin } from "./store/actions/auth";
import ConversationAction from "./store/definitions/conversation";

import Loader from "./components/Loader/Loader";
import Main from "./containers/Main/Main";
import Login from "./containers/Login/Login";
import Setup from "./containers/Setup/Setup";
import Error from "./components/Error/Error";
import store from "./store/store";

import { COLORS } from "./styles/common";

const errorStyles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 50
  },
  primaryText: {
    color: COLORS.SECONDARY,
    fontSize: 48,
    textAlign: "center",
    marginBottom: 15
  },
  secondaryText: {
    fontSize: 24,
    lineHeight: 36
  }
});

export class App extends Component {
  async componentDidMount() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.registerNotificationListener();
    } else {
      await firebase.messaging().requestPermission();
      this.registerNotificationListener();
    }

    this.props.fetchLogin();
  }

  registerNotificationListener() {
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        store.dispatch({
          type: ConversationAction.NEW_MESSAGE,
          message: {
            owner: notification._data.owner,
            date: notification._data.date,
            text: notification._body
          },
          request: notification._data.request
        });
      });
  }

  getForbiddenMessage() {
    return (
      <View style={errorStyles.container}>
        <Text style={errorStyles.primaryText}>Oups !</Text>
        <Text style={errorStyles.secondaryText}>
          Il semblerait que vous ne soyez pas autorisé à accéder à cette
          application.
        </Text>
      </View>
    );
  }

  render() {
    if (this.props.loading) {
      return <Loader />;
    }

    if (this.props.isLoggedIn) {
      if (this.props.forbidden) {
        return <Error message={this.getForbiddenMessage()} />;
      }
      return this.props.hasProfile ? <Main /> : <Setup />;
    } else {
      return <Login error={this.props.error} />;
    }
  }
}

const mapStateToProps = ({ auth, user }) => ({
  isLoggedIn: auth.isLoggedIn,
  forbidden: auth.forbidden || false,
  loading: auth.loading.fetch || user.loading,
  error: auth.error || user.error,
  hasProfile: user.profile
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchLogin }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  AppState,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import firebase from "../node_modules/react-native-firebase/dist/index";

import { fetchLogin, logout } from "./store/actions/auth";
import ConversationAction from "./store/definitions/conversation";

import Loader from "./components/Loader/Loader";
import Main from "./containers/Main/Main";
import Login from "./containers/Login/Login";
import Setup from "./containers/Setup/Setup";
import Error from "./components/Error/Error";
import store from "./store/store";
import NavigationService from "./api/Navigation";
import I18n from "./api/I18n";

import { COLORS } from "./styles/common";

const errorStyles = StyleSheet.create({
  container: {
    width: "80%",
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

class App extends Component {
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
    if (Platform.OS === "android" && Platform.Version >= 26) {
      const channel = new firebase.notifications.Android.Channel(
        "messages",
        "Messages",
        firebase.notifications.Android.Importance.Max
      ).setDescription("Channel for messages");

      firebase.notifications().android.createChannel(channel);
    }

    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        notification.android.setChannelId("messages");

        if (AppState.currentState === "active") {
          firebase.notifications().displayNotification(notification);
        }

        store.dispatch({
          type: ConversationAction.NEW_MESSAGE,
          message: {
            owner: notification._data.owner,
            date: notification._data.date,
            text: notification._body
          },
          conversationId: notification._data.request
        });
      });

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notification => {
        data = notification.notification._data;
        NavigationService.navigate("Messages", {
          conversationId: data.request,
          userinfo: {
            username: data.username,
            avatar: data.avatar
          }
        });
      });
  }

  getForbiddenMessage() {
    return (
      <View style={errorStyles.container}>
        <Text style={errorStyles.primaryText}>
          {I18n.t(`login.error.rightTitle`)}
        </Text>
        <Text style={errorStyles.secondaryText}>
          {I18n.t(`login.error.rightMessage`)}
        </Text>
        <View style={{ marginTop: 50 }}>
          <Button
            color={COLORS.PRIMARY}
            title="Se déconnecter"
            onPress={this.props.logout}
          />
        </View>
      </View>
    );
  }

  render() {
    if (this.props.loading) {
      return <Loader />;
    }

    if (this.props.isLoggedIn) {
      if (this.props.forbidden) {
        return (
          <Error
            message={this.getForbiddenMessage()}
            imgSrc={require("./assets/img/gars1b.png")}
            side="right"
          />
        );
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
  return bindActionCreators({ fetchLogin, logout }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

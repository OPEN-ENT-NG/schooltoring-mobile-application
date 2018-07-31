import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchLogin } from "./store/actions/auth";

import Loader from "./components/Loader/Loader";
import Main from "./containers/Main/Main";
import Login from "./containers/Login/Login";
import Setup from "./containers/Setup/Setup";
import Error from "./components/Error/Error";

import { COLORS } from "./styles/common";

const errorStyles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 100
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
  componentDidMount() {
    this.props.fetchLogin();
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

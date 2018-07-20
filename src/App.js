import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchLogin } from "./store/actions/auth";

import Loader from "./components/Loader/Loader";
import Main from "./containers/Main/Main";
import Login from "./containers/Login/Login";
import Setup from "./containers/Setup/Setup";

export class App extends Component {
  componentDidMount() {
    this.props.fetchLogin();
  }

  render() {
    if (this.props.loading) {
      return <Loader />;
    }

    return this.props.isLoggedIn ? (
      this.props.hasProfile ? (
        <Main />
      ) : (
        <Setup />
      )
    ) : (
      <Login error={this.props.error} />
    );
  }
}

const mapStateToProps = ({ auth, user }) => ({
  isLoggedIn: auth.isLoggedIn,
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

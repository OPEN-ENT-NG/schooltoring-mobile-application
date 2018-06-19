import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchLogin } from "./store/actions/auth";

import Loader from "./components/Loader/Loader";
import Main from "./containers/Main/Main";
import Login from "./containers/Login/Login";

export class App extends Component {
  componentDidMount() {
    this.props.fetchLogin();
  }

  render() {
    if (this.props.loading) {
      return <Loader />;
    }

    return this.props.isLoggedIn ? (
      <Main />
    ) : (
      <Login error={this.props.error} />
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  isLoggedIn: auth.isLoggedIn,
  loading: auth.loading.fetch,
  error: auth.error
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchLogin }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

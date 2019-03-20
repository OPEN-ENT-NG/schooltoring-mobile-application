import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Button,
  ActivityIndicator,
  Keyboard
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { login } from "../../store/actions/auth";

import InputText from "../../components/InputText/InputText";
import styles from "./styles";
import I18n from "../../api/I18n";
import { COLORS } from "../../styles/common";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.getError = this.getError.bind(this);
  }

  login(e) {
    e.preventDefault();
    Keyboard.dismiss();
    this.props.logUser(this.state.username, this.state.password);
  }

  getError() {
    if (this.props.error) {
      return (
        <Text style={styles.errorMessage}>{I18n.t("login.error.wrong")}</Text>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/img/logo.png")}
          />
          <Text style={styles.title}>Schooltoring</Text>
        </View>
        <View style={styles.formContainer}>
          {this.getError()}
          <InputText
            placeholder={I18n.t("login.placeholder.username")}
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
          />
          <InputText
            secureTextEntry={true}
            placeholder={I18n.t("login.placeholder.password")}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          {this.props.loading ? (
            <View style={{ marginTop: 10 }}>
              <ActivityIndicator size="large" color={COLORS.PRIMARY} />
            </View>
          ) : (
            <View style={{ marginTop: 10 }}>
              <Button
                color={COLORS.PRIMARY}
                title={I18n.t("login.action")}
                onPress={this.login}
              />
            </View>
          )}
        </View>
        <View style={styles.illustrationContainer}>
          <View style={[styles.illustrationPart, styles.centered]}>
            <Image
              style={{ width: 100, height: 16 }}
              source={require("../../assets/img/idf.png")}
            />
            <Image
              style={{ width: 100, height: 43, marginTop: 15 }}
              source={require("../../assets/img/mlnet.png")}
            />
          </View>
          <View style={styles.illustrationPart}>
            <Image
              style={styles.illustration}
              source={require("../../assets/img/illustration1.png")}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading.form
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ logUser: login }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

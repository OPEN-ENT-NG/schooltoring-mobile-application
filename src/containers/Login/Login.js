import React, { Component } from "react";
import {
  TextInput,
  View,
  Image,
  Text,
  Button,
  ActivityIndicator,
  Switch,
  Keyboard
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { login } from "../../store/actions/auth";

import styles from "./styles";
import { COLORS } from "../../styles/common";

class Login extends Component {
  state = {
    username: "yanis.albon",
    password: "azerty123",
    rememberMe: false
  };

  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.getError = this.getError.bind(this);
  }

  login(e) {
    e.preventDefault();
    Keyboard.dismiss();
    this.props.logUser(
      this.state.username,
      this.state.password,
      this.state.rememberMe
    );
  }

  getError() {
    if (this.props.error) {
      return (
        <Text style={styles.errorMessage}>
          Une erreur s'est glissée dans ton identifiant ou ton mot de passe
        </Text>
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
        <View>
          <View style={styles.formContainer}>
            {this.getError()}
            <TextInput
              style={styles.input}
              placeholder="Nom d'utilisateur"
              value={this.state.username}
              onChangeText={username => this.setState({ username })}
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Mot de passe"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
            <View style={styles.remember}>
              <Switch
                style={styles.rememberSwitch}
                value={this.state.rememberMe}
                onValueChange={rememberMe => this.setState({ rememberMe })}
              />
              <Text style={{ marginTop: 5 }}>Se souvenir de moi</Text>
            </View>
            {this.props.loading ? (
              <ActivityIndicator size="large" color={COLORS.PRIMARY} />
            ) : (
              <Button
                style={styles.submit}
                color={COLORS.PRIMARY}
                title="Se connecter"
                onPress={this.login}
              />
            )}
          </View>
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

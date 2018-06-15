import React, { Component } from "react";
import { TextInput, View, Image, Text, Button, StatusBar } from "react-native";

import styles from "./styles";
import { COLORS } from "../../styles/common";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.getError = this.getError.bind(this);
  }

  getError() {
    if (false) {
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
        <StatusBar
          backgroundColor={COLORS.BACKGROUND}
          barStyle="dark-content"
        />
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
            <TextInput placeholder="Nom d'utilisateur" />
            <TextInput
              secureTextEntry={true}
              placeholder="Mot de passe"
              style={{ marginBottom: 15 }}
            />
            <Button
              style={styles.submit}
              color={COLORS.PRIMARY}
              title="Se connecter"
              onPress={() => false}
            />
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

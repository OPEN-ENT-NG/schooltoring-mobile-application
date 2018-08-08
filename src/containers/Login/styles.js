import { StyleSheet, Platform } from "react-native";

import { COLORS } from "../../styles/common";

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND,
    flex: 1,
    justifyContent: "space-between"
  },
  logoContainer: {
    alignSelf: "center",
    marginTop: 70
  },
  logo: {
    width: 75,
    height: 75,
    alignSelf: "center"
  },
  title: {
    textAlign: "center",
    fontSize: 21,
    marginTop: 10
  },
  formContainer: {
    width: "80%",
    alignSelf: "center"
  },
  errorMessage: {
    color: COLORS.SECONDARY,
    marginVertical: 10
  },
  collectivite: {
    alignSelf: "center",
    width: 150,
    height: 21,
    marginLeft: 20
  },
  illustrationContainer: {
    flexDirection: "row"
  },
  illustrationPart: {
    flex: 0.5
  },
  illustration: {
    width: 150,
    height: 173,
    alignSelf: "flex-end"
  },
  centered: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  remember: {
    marginBottom: 15,
    flexDirection: "row"
  },
  rememberSwitch: {
    ...Platform.select({
      ios: {
        marginRight: 10
      }
    })
  }
});

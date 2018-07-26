import { StyleSheet, Platform } from "react-native";

import { COLORS } from "../../styles/common";

const styles = StyleSheet.create({
  input: {
    height: 50,
    ...Platform.select({
      ios: {
        borderWidth: 1,
        borderColor: COLORS.GREY,
        marginBottom: 15,
        padding: 10,
        borderRadius: 3
      }
    })
  }
});

export default styles;

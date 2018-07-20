import { StyleSheet } from "react-native";

import { COLORS } from "../../styles/common";

export default StyleSheet.create({
  input: {
    backgroundColor: COLORS.WHITE
  },
  list: {
    marginTop: 50,
    backgroundColor: COLORS.WHITE,
    position: "absolute",
    zIndex: 10
  },
  item: {
    padding: 20
  }
});

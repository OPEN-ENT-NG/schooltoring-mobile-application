import { StyleSheet } from "react-native";

import { COLORS } from "../../styles/common";

export default StyleSheet.create({
  input: {
    backgroundColor: COLORS.WHITE
  },
  list: {
    backgroundColor: COLORS.WHITE,
    position: "absolute",
    zIndex: 10,
    position: "relative"
  },
  item: {
    padding: 20
  }
});

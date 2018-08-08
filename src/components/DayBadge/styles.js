import { StyleSheet } from "react-native";

import { COLORS } from "../../styles/common";

export default StyleSheet.create({
  item: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    backgroundColor: COLORS.GREY
  },
  itemText: {
    flex: 1,
    color: COLORS.WHITE,
    fontSize: 20
  },
  available: {
    backgroundColor: COLORS.NEGATIVE
  }
});

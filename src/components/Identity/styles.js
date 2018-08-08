import { StyleSheet } from "react-native";

import { COLORS } from "../../styles/common";

const text = { color: COLORS.TEXT };

export default StyleSheet.create({
  top: {
    flexDirection: "row",
    flex: 0
  },
  topRight: {
    marginLeft: 15,
    justifyContent: "space-evenly"
  },
  name: {
    ...text,
    fontWeight: "bold",
    fontSize: 26
  },
  titleText: {
    ...text,
    fontSize: 20
  }
});

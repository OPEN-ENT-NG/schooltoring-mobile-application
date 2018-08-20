import { StyleSheet } from "react-native";

import { COLORS } from "../../styles/common";

export default StyleSheet.create({
  message: {
    paddingVertical: 5,
    alignItems: "flex-end"
  },
  avatar: {
    paddingHorizontal: 10,
    justifyContent: "center"
  },
  bubble: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 10,
    maxWidth: "50%",
    minWidth: "25%"
  },
  text: {
    color: COLORS.TEXT
  }
});

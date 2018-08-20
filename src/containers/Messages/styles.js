import { StyleSheet } from "react-native";
import { COLORS } from "../../styles/common";

export default StyleSheet.create({
  inputContainer: {
    padding: 8,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.WHITE,
    position: "absolute",
    bottom: 0
  },
  input: {
    flex: 8
  },
  icon: {
    justifyContent: "flex-end",
    padding: 5
  }
});

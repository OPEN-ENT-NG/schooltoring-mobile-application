import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../styles/common";

export default StyleSheet.create({
  inputContainer: {
    padding: 8,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.WHITE,
    width: "100%",
    maxHeight: Dimensions.get("window").height * 0.2
  },
  input: {
    flex: 1,
    fontSize: 16
  },
  icon: {
    padding: 5,
    flex: 0
  }
});

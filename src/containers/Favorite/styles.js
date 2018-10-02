import { StyleSheet } from "react-native";

export default StyleSheet.create({
  error: {
    width: "80%",
    alignSelf: "center",
    fontSize: 20,
    marginVertical: 100
  },
  errorContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%"
  },
  modal: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  list: {
    height: "100%",
    width: "100%",
    backgroundColor: "transparent"
  }
});

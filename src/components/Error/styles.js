import { StyleSheet } from "react-native";

const image = {
  flex: 1,
  flexDirection: "row",
  alignItems: "flex-end"
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
  messageContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  message: {
    width: "80%",
    alignSelf: "center",
    fontSize: 20
  },
  left: {
    ...image,
    justifyContent: "flex-start",
    left: -30
  },
  right: {
    ...image,
    justifyContent: "flex-end",
    right: -30
  }
});

export default styles;

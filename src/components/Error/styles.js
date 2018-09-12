import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
  imageCritical: {
    height: "100%",
    position: "absolute",
    bottom: 0,
    left: -30
  },
  imageUncritical: {
    height: "100%",
    position: "absolute",
    bottom: 0,
    right: -30
  }
});

export default styles;

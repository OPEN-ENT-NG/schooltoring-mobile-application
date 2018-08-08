import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  imageCritical: {
    width: 280,
    height: 301,
    position: "absolute",
    bottom: 0,
    left: -30
  },
  imageUncritical: {
    width: 262,
    height: 301,
    position: "absolute",
    bottom: 0,
    right: -30
  }
});

export default styles;

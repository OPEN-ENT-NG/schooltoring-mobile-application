import { StyleSheet } from "react-native";

const img = {
  height: "100%",
  position: "absolute",
  bottom: 0
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
  left: {
    ...img,
    left: -30
  },
  right: {
    ...img,
    right: -30
  }
});

export default styles;

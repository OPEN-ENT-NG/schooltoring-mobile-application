import { StyleSheet } from "react-native";

import { COLORS } from "../../styles/common";

export default StyleSheet.create({
  input: {
    paddingVertical: 10
  },
  item: {
    padding: 20
  },
  scrollviewContainer: {
    left: 0,
    right: 0,
    top: 40,
    position: "absolute",
    zIndex: 200
  },
  scrollview: {
    width: "100%",
    backgroundColor: COLORS.WHITE,
    zIndex: 300
  }
});

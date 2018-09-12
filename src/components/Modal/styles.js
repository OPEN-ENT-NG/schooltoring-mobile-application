import { StyleSheet } from "react-native";

import { COLORS } from "../../styles/common";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(10, 10, 10, 0.6)",
    ...StyleSheet.absoluteFillObject
  },
  image: {
    backgroundColor: COLORS.PRIMARY,
    padding: 15
  },
  message: {
    backgroundColor: COLORS.BACKGROUND,
    padding: 10
  },
  title: { color: COLORS.TEXT, margin: 5, fontWeight: "bold" },
  text: { margin: 5 }
});

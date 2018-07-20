import { StyleSheet } from "react-native";

import { COLORS } from "../../styles/common";

export default StyleSheet.create({
  header: {
    backgroundColor: COLORS.LIGHT_GREY,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10
  },
  titleContainer: {
    flex: 0
  },
  back: { flex: 1 },
  title: {
    fontSize: 25,
    marginLeft: 10
  }
});

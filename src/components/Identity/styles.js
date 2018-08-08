import { StyleSheet } from "react-native";

import { COLORS } from "../../styles/common";

const text = { color: COLORS.TEXT };

export default StyleSheet.create({
  top: {
    flexDirection: "row",
    flex: 1
  },
  topRight: {
    marginLeft: 15,
    justifyContent: "space-evenly",
    flexGrow: 1,
    flex: 1
  },
  name: {
    ...text,
    fontWeight: "bold",
    fontSize: 26
  },
  titleText: {
    ...text,
    fontSize: 20
  },
  avatarContainer: {
    padding: 10
  }
});

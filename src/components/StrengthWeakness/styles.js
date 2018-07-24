import { StyleSheet } from "react-native";

import { COLORS } from "../../styles/common";

export default StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    flex: 1,
    justifyContent: "space-evenly"
  },
  list: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap"
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 0,
    padding: 15
  },
  subjectLabel: {
    color: COLORS.TEXT
  }
});

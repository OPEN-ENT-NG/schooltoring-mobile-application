import { StyleSheet } from "react-native";

import { COLORS } from "../../styles/common";

const textColor = {
  color: COLORS.TEXT
};

export default StyleSheet.create({
  conversation: {
    flexDirection: "row",
    paddingHorizontal: 10
  },
  avatar: {
    alignSelf: "flex-start",
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    marginHorizontal: 5
  },
  content: {
    flex: 4,
    justifyContent: "space-evenly",
    borderBottomColor: "#000",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  name: {
    ...textColor,
    fontWeight: "bold",
    fontSize: 20
  },
  message: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  icon: {
    fontSize: 20,
    marginRight: 10
  },
  text: {
    ...textColor,
    flex: 5,
    fontSize: 16,
    flexWrap: "wrap"
  },
  date: {
    flexGrow: 2,
    alignItems: "flex-end"
  },
  dateText: {
    ...textColor
  }
});

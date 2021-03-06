import { StyleSheet } from "react-native";

import { COLORS } from "../../styles/common";

const text = {
  color: COLORS.TEXT
};

export default StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    flex: 1,
    justifyContent: "space-evenly"
  },
  item: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 60
  },
  itemSwitch: {
    marginRight: 20
  },
  itemText: {
    ...text,
    fontSize: 18
  },
  list: {
    flex: 1,
    justifyContent: "space-around"
  },
  title: {
    ...text,
    fontSize: 18,
    marginBottom: 40,
    flex: 0
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 0,
    padding: 15
  }
});

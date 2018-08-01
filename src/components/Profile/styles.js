import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../styles/common";

const text = { color: COLORS.TEXT };

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    flexGrow: 1,
    justifyContent: "space-evenly"
  },
  divider: {
    borderBottomColor: COLORS.LIGHT_GREY,
    borderBottomWidth: 1,
    marginVertical: 20
  },
  top: {
    flexDirection: "row",
    flex: 0
  },
  topRight: {
    marginLeft: 15,
    justifyContent: "space-evenly"
  },
  topRightButtons: {
    flexDirection: "row",
    marginBottom: 15
  },
  topRightButton: {
    width: (Dimensions.get("screen").width - 60) / 2,
    flexDirection: "row",
    alignItems: "center",
    padding: 15
  },
  name: {
    ...text,
    fontWeight: "bold",
    fontSize: 26
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  titleText: {
    ...text,
    fontSize: 20
  },
  titleIcon: {
    ...text,
    fontSize: 25,
    marginRight: 5,
    marginLeft: 5
  },
  list: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap"
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30
  },
  itemText: {
    flex: 1,
    color: COLORS.WHITE,
    fontSize: 20
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 0,
    padding: 15
  }
});

import { StyleSheet } from "react-native";
import { COLORS } from "../../styles/common";

export default StyleSheet.create({
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
    flex: 0,
    marginBottom: 20
  },
  topRight: {
    marginLeft: 15,
    justifyContent: "space-evenly"
  },
  main: {
    flex: 1
  },

  name: {
    fontWeight: "bold",
    fontSize: 26
  },

  title: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  titleText: {
    fontSize: 20
  },
  titleIcon: {
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

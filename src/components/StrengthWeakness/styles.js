import { StyleSheet } from "react-native";

import { COLORS } from "../../styles/common";

export const styleStructure = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    color: COLORS.WHITE,
    fontSize: 25,
    marginLeft: 10
  },
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
  }
});

export const styleStrength = StyleSheet.create({
  header: {
    backgroundColor: COLORS.PRIMARY
  },
  items: {
    backgroundColor: COLORS.PRIMARY
  }
});

export const styleWeakness = StyleSheet.create({
  header: {
    backgroundColor: COLORS.SECONDARY
  },
  items: {
    backgroundColor: COLORS.SECONDARY
  }
});

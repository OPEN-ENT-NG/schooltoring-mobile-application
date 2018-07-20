import { StyleSheet } from "react-native";

import { COLORS } from "../../styles/common";

const half = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  padding: 20
};

const image = {
  position: "absolute",
  bottom: 0
};

export default StyleSheet.create({
  topImageContainer: {
    ...image,
    right: 10
  },
  bottomImageContainer: {
    ...image,
    left: 10
  },
  text: {
    color: "white",
    fontSize: 28
  },

  topHalf: {
    ...half,
    backgroundColor: COLORS.SECONDARY,
    justifyContent: "flex-start"
  },
  bottomHalf: {
    ...half,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: "flex-end"
  }
});

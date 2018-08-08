import { StyleSheet } from "react-native";

import { COLORS } from "../../styles/common";

const half = {
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
    fontSize: 24,
    width: "60%"
  },
  textLeft: {
    textAlign: "left"
  },
  textRight: {
    textAlign: "right"
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

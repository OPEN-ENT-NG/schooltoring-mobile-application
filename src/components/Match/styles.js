import { StyleSheet } from "react-native";

import { COLORS } from "../../styles/common";

const center = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center"
};

const roundButton = {
  width: 66,
  height: 66,
  borderRadius: 33,
  ...center
};

export default StyleSheet.create({
  detail: {
    backgroundColor: COLORS.SECONDARY_BACKGROUND,
    padding: 20
  },
  center,
  marginVertical: {
    marginVertical: 15
  },
  roundButton,
  declineButton: {
    ...roundButton,
    backgroundColor: COLORS.SECONDARY
  },
  acceptButton: {
    ...roundButton,
    backgroundColor: COLORS.PRIMARY
  },
  roundButtonIcon: {
    fontSize: 30,
    color: COLORS.WHITE
  },
  favoriteButton: {
    fontSize: 24,
    color: COLORS.GREY
  },
  height30: {
    height: "30%"
  },
  height40: {
    height: "40%"
  },
  width25: {
    width: "25%"
  }
});

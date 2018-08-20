import { StyleSheet, Platform } from "react-native";

import { COLORS } from "../../styles/common";

const roundButton = {
  width: 50,
  height: 50,
  borderRadius: 25
};

const shadowBadge =
  Platform.OS === "android"
    ? {
        elevation: 4
      }
    : {
        shadowColor: COLORS.GREY,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2
      };

const shadowContent =
  Platform.OS === "android"
    ? {
        elevation: 3
      }
    : {
        shadowColor: COLORS.GREY,
        shadowOffset: { width: -2, height: -1 },
        shadowOpacity: 0.5,
        shadowRadius: 1
      };

const text = { color: COLORS.TEXT };

export default StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "stretch",
    margin: 20,
    backgroundColor: COLORS.SECONDARY_BACKGROUND,
    flex: 1,
    ...shadowBadge
  },
  features: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  left: {
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1
  },
  right: {
    backgroundColor: COLORS.WHITE,
    flexDirection: "row",
    flex: 5,
    padding: 3,
    ...shadowContent
  },

  identity: {
    marginLeft: 15,
    flex: 4,
    justifyContent: "space-evenly"
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

  buttons: {
    justifyContent: "space-around",
    padding: 15
  },
  declineButton: {
    ...roundButton,
    backgroundColor: COLORS.SECONDARY
  },
  acceptButton: {
    ...roundButton,
    backgroundColor: COLORS.PRIMARY
  },
  roundButtonIcon: {
    fontSize: 25,
    color: COLORS.WHITE
  }
});

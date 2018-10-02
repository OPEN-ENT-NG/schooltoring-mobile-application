import { StyleSheet, Platform } from "react-native";

import { COLORS } from "../../styles/common";

const shadow =
  Platform.OS === "android"
    ? {
        elevation: 4
      }
    : {
        shadowColor: COLORS.GREY,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 1
      };

export default StyleSheet.create({
  badge: {
    alignItems: "stretch",
    width: "50%",
    padding: 10
  },
  top: {
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.SECONDARY_BACKGROUND,
    ...shadow
  },
  bottom: {
    backgroundColor: COLORS.BACKGROUND,
    ...shadow,
    maxHeight: 120
  },
  name: {
    textAlign: "center",
    color: COLORS.TEXT,
    fontWeight: "bold",
    fontSize: 16
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 5
  },
  chatButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.PRIMARY
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    elevation: 1000,
    zIndex: 5
  }
});

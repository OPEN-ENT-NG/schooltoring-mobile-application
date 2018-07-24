import { StyleSheet } from "react-native";

import { COLORS } from "../../styles/common";

export default backgroundColor => {
  return StyleSheet.create({
    header: {
      backgroundColor: backgroundColor ? backgroundColor : COLORS.LIGHT_GREY,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: 10
    },
    titleContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end"
    },
    title: {
      color: backgroundColor ? COLORS.WHITE : COLORS.TEXT,
      fontSize: 25,
      marginLeft: 10
    }
  });
};

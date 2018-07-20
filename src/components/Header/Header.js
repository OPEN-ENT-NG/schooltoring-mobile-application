import React from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { StackActions } from "react-navigation";

import Icon from "react-native-vector-icons/MaterialIcons";

import styles from "./styles";
import { COLORS } from "../../styles/common";

export default props => {
  const headerStyle = [styles.header, props.headerStyle];
  const titleStyle = [styles.title, props.titleStyle];
  const dispatchPop = () => {
    props.navigation.dispatch(StackActions.pop());
  };

  const extractTextColor = headerStyle => {
    let color =
      StyleSheet.flatten(headerStyle).backgroundColor == COLORS.LIGHT_GREY
        ? COLORS.TEXT
        : COLORS.WHITE;
    return {
      color: color
    };
  };

  return (
    <View style={headerStyle}>
      {(props.hasOwnProperty("noBack") && props.noBack) || (
        <View style={styles.back}>
          <TouchableWithoutFeedback
            hitSlop={{
              top: 20,
              left: 20,
              right: 40,
              bottom: 20
            }}
            onPress={dispatchPop}
          >
            <Icon
              name="arrow-back"
              style={[titleStyle, extractTextColor(headerStyle)]}
            />
          </TouchableWithoutFeedback>
        </View>
      )}
      <View style={styles.titleContainer}>
        {props.children || (
          <Text style={[titleStyle, extractTextColor(headerStyle)]}>
            {props.title}
          </Text>
        )}
      </View>
    </View>
  );
};

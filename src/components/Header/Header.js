import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { StackActions } from "react-navigation";
import PropTypes from "prop-types";

import Icon from "react-native-vector-icons/MaterialIcons";

import getStyle from "./styles";

const Header = props => {
  const dispatchPop = () => {
    props.navigation.dispatch(StackActions.pop());
  };

  const styles = getStyle(props.backgroundColor);

  return (
    <View style={styles.header}>
      {(props.hasOwnProperty("noBack") && props.noBack) || (
        <View>
          <TouchableWithoutFeedback
            hitSlop={{
              top: 20,
              left: 20,
              right: 40,
              bottom: 20
            }}
            onPress={dispatchPop}
            id="header-back-button"
          >
            <Icon name="arrow-back" style={styles.title} />
          </TouchableWithoutFeedback>
        </View>
      )}
      <View style={styles.titleContainer}>
        {props.iconName && <Icon style={styles.title} name={props.iconName} />}
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </View>
  );
};

Header.propTypes = {
  noBack: PropTypes.bool,
  navigation: function(props, propName, componentName) {
    if (
      props["noBack"] === true &&
      (props[propName] == undefined || typeof props[propName] != "object")
    ) {
      return new Error("Please provide a navigation object!");
    }
  },
  iconName: PropTypes.string,
  title: PropTypes.string.isRequired
};

export default Header;

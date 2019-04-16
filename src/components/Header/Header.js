import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { StackActions } from "react-navigation";
import PropTypes from "prop-types";

import Icon from "react-native-vector-icons/MaterialIcons";
import PopupMenu from "../../components/PopupMenu/PopupMenu";

import getStyle from "./styles";
import Touchable from "../Touchable/Touchable";

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
            id="header-back-button">
            <Icon name="arrow-back" style={styles.title} />
          </TouchableWithoutFeedback>
        </View>
      )}
      {props.onTitlePress != undefined && (
        <Touchable style={styles.titleContainer} onPress={props.onTitlePress}>
          {props.iconName && (
            <Icon style={styles.title} name={props.iconName} />
          )}
          <Text style={styles.title}>{props.title}</Text>
        </Touchable>
      )}
      {props.onTitlePress == undefined && (
        <View style={styles.titleContainer}>
          {props.iconName && (
            <Icon style={styles.title} name={props.iconName} />
          )}
          <Text style={styles.title}>{props.title}</Text>
        </View>
      )}
      {props.hasOwnProperty("rightActions") && props.rightActions ? (
        <PopupMenu
          actions={props.rightActions.actions}
          onPress={props.rightActions.onPress}
        />
      ) : null}
    </View>
  );
};

Header.propTypes = {
  noBack: function(props, propName) {
    if (
      props["navigation"] == true &&
      (props[propName] == undefined || typeof props[propName] != "boolean")
    ) {
      return new Error("Please provide a noBack boolean");
    }
  },
  navigation: function(props, propName) {
    if (
      props["noBack"] === false &&
      (props[propName] == undefined || typeof props[propName] != "object")
    ) {
      return new Error("Please provide a navigation object!");
    }
  },
  iconName: PropTypes.string,
  title: PropTypes.string.isRequired,
  rightActions: PropTypes.shape({
    actions: PropTypes.array,
    onPress: PropTypes.func
  }),
  onTitlePress: PropTypes.func
};

export default Header;

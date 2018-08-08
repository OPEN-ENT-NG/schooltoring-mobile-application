import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import Touchable from "../Touchable/Touchable";

import styles from "./styles";

const SubjectBadge = props => (
  <Touchable onPress={() => props.hasOwnProperty("onPress") && props.onPress()}>
    <View style={[styles.item, { backgroundColor: props.color }]}>
      <Text style={styles.itemText}>{props.title}</Text>
    </View>
  </Touchable>
);

SubjectBadge.propTypes = {
  onPress: PropTypes.func,
  color: PropTypes.string,
  title: PropTypes.string.isRequired
};

export default SubjectBadge;

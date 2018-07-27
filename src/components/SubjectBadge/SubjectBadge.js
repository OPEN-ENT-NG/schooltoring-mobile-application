import React from "react";
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableWithoutFeedback
} from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

export const SubjectBadge = props => {
  return (
    <TouchableWithoutFeedback
      onPress={() => props.hasOwnProperty("onPress") && props.onPress()}
    >
      <View style={[styles.item, props.style]}>
        <Text style={styles.itemText}>{props.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

SubjectBadge.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.object,
  title: PropTypes.string.isRequired
};

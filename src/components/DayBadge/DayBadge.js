import React from "react";
import { View, Text } from "react-native";
import Proptypes from "prop-types";

import styles from "./styles";

const DayBadge = props => (
  <View
    style={[
      styles.item,
      props.available ? styles.available : null,
      props.style
    ]}
  >
    <Text style={styles.itemText}>{props.label}</Text>
  </View>
);

DayBadge.proptypes = {
  label: Proptypes.string.isRequired,
  available: Proptypes.bool.isRequired,
  style: Proptypes.object
};

export default DayBadge;

import React from "react";
import { View, ActivityIndicator } from "react-native";
import Proptypes from "prop-types";

import { COLORS } from "../../styles/common";
import styles from "./styles";

const Loader = props => (
  <View style={styles.container}>
    <ActivityIndicator color={props.color || COLORS.SECONDARY} size={"large"} />
  </View>
);

Loader.proptypes = {
  color: Proptypes.string
};

export default Loader;

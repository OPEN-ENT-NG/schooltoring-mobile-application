import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableNativeFeedback,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";
import InputText from "../InputText/InputText";
import Touchable from "../Touchable/Touchable";

import styles from "./styles";

export default class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = { filter: "", output: [] };
    this.updateList = this.updateList.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  updateList(filter) {
    let output = filter
      ? this.props.data.filter(item => this.props.filterItem(item, filter))
      : [];
    this.setState({ filter, output });
  }

  renderItem(item) {
    return (
      <Touchable
        id={this.props.getItemKey(item)}
        onPress={() => {
          this.props.onItemPress(item);
          this.setState({ filter: "", output: [] });
        }}
      >
        <View style={styles.item}>{this.props.renderItem(item)}</View>
      </Touchable>
    );
  }

  render() {
    return (
      <View style={[this.props.style, styles.container]}>
        <InputText
          placeholder={this.props.placeholder}
          onChangeText={filter => this.updateList(filter)}
          value={this.state.filter}
          style={styles.input}
          underlineColorAndroid={this.props.underlineColor}
        />
        <ScrollView
          style={[
            styles.list,
            { maxHeight: Dimensions.get("window").height * 0.7 }
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {this.state.output.map(item => this.renderItem(item))}
        </ScrollView>
      </View>
    );
  }
}

Autocomplete.propTypes = {
  style: PropTypes.object,
  placeholder: PropTypes.string,
  data: PropTypes.array.isRequired,
  filterItem: PropTypes.func.isRequired,
  getItemKey: PropTypes.func.isRequired,
  onItemPress: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired
};

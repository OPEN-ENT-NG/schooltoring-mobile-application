import React, { Component } from "react";
import {
  View,
  TextInput,
  ScrollView,
  Keyboard,
  Platform,
  Dimensions
} from "react-native";

import PropTypes from "prop-types";
import Touchable from "../Touchable/Touchable";

import styles from "./styles";
import { COLORS } from "../../styles/common";

export default class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      output: [],
      listHeight: Dimensions.get("window").height * 0.6
    };
    this.updateList = this.updateList.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.delta = 200;
  }

  componentDidMount() {
    if (Platform.OS === "ios") {
      this.keyboardWillShowEvent = Keyboard.addListener(
        "keyboardWillShow",
        this._updateKeyboardSpace
      );
      this.keyboardWillHideEvent = Keyboard.addListener(
        "keyboardWillHide",
        this._resetKeyboardSpace
      );
    } else if (Platform.OS === "android") {
      this.keyboardWillShowEvent = Keyboard.addListener(
        "keyboardDidShow",
        this._updateKeyboardSpace
      );
      this.keyboardWillHideEvent = Keyboard.addListener(
        "keyboardDidHide",
        this._resetKeyboardSpace
      );
    }
  }

  componentWillUnmount() {
    this.keyboardWillShowEvent && this.keyboardWillShowEvent.remove();
    this.keyboardWillHideEvent && this.keyboardWillHideEvent.remove();
  }

  updateList(filter) {
    let output = filter
      ? this.props.data.filter(item => this.props.filterItem(item, filter))
      : [];
    this.setState({ filter, output });
  }

  _updateKeyboardSpace = e => {
    this.setState({
      listHeight: this.state.listHeight - this.delta
    });
  };

  _resetKeyboardSpace = () => {
    this.setState({ listHeight: this.state.listHeight + this.delta });
  };

  renderItem(item) {
    return (
      <Touchable
        style={{ backgroundColor: COLORS.SECONDARY }}
        key={this.props.getItemKey(item)}
        onPress={() => {
          this.props.onItemPress(item);
          this.setState({ filter: "", output: [] });
        }}>
        <View style={styles.item}>{this.props.renderItem(item)}</View>
      </Touchable>
    );
  }

  render() {
    return (
      <View
        style={[this.props.style, Platform.OS == "ios" ? { zIndex: 100 } : {}]}>
        <TextInput
          placeholder={this.props.placeholder}
          onChangeText={filter => this.updateList(filter)}
          value={this.state.filter}
          style={styles.input}
          underlineColorAndroid={this.props.underlineColor}
        />
        {this.state.output.length > 0 && (
          <View
            style={[
              styles.scrollviewContainer,
              { height: this.state.listHeight }
            ]}>
            <ScrollView
              style={styles.scrollview}
              keyboardShouldPersistTaps="handled">
              {this.state.output.map(item => this.renderItem(item))}
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}

Autocomplete.propTypes = {
  placeholder: PropTypes.string,
  data: PropTypes.array.isRequired,
  filterItem: PropTypes.func.isRequired,
  getItemKey: PropTypes.func.isRequired,
  onItemPress: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired
};

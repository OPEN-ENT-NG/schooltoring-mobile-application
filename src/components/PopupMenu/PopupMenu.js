import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  UIManager,
  ActionSheetIOS,
  findNodeHandle,
  Platform,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import I18n from "../../api/I18n";

const ICON_SIZE = 24;

export default class PopupMenu extends Component {
  static propTypes = {
    // array of strings, will be list items of Menu
    actions: PropTypes.arrayOf(PropTypes.string).isRequired,
    onPress: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      icon: null
    };
  }

  onError() {
    console.log("Popup Error");
  }

  onPress = () => {
    if (this.state.icon) {
      if (Platform.OS === "android") {
        UIManager.showPopupMenu(
          findNodeHandle(this.state.icon),
          this.props.actions,
          this.onError,
          (action, index) => {
            if (action === "itemSelected") {
              this.props.onPress(index);
            }
          }
        );
      } else {
        let options = [...this.props.actions, I18n.t("cancel")];
        ActionSheetIOS.showActionSheetWithOptions({ options }, index => {
          if (index !== options.length - 1) {
            this.props.onPress(index);
          }
        });
      }
    }
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.onPress}>
          <Icon
            name="more-vert"
            size={ICON_SIZE}
            color={"grey"}
            ref={this.onRef}
          />
        </TouchableOpacity>
      </View>
    );
  }

  onRef = icon => {
    if (!this.state.icon) {
      this.setState({ icon });
    }
  };
}

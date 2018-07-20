import React, { Component } from "react";
import { Image, View } from "react-native";
import PropTypes from "prop-types";

export default class Avatar extends Component {
  render() {
    return (
      <View style={this.props.style}>
        <Image
          style={{
            height: this.props.size,
            width: this.props.size,
            borderRadius: this.props.size
          }}
          source={
            this.props.source.includes("http")
              ? {
                  uri: this.props.source,
                  headers: {
                    Authorization:
                      axios.defaults.headers.common["Authorization"]
                  }
                }
              : require("../../assets/img/no-avatar.png")
          }
        />
      </View>
    );
  }
}

Avatar.propTypes = {
  style: PropTypes.object,
  size: PropTypes.number.isRequired,
  source: PropTypes.string.isRequired
};

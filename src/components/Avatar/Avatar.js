import React, { Component } from "react";
import { Image, View } from "react-native";
import { connect } from "react-redux";
import axios from "axios";

import PropTypes from "prop-types";

class Avatar extends Component {
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
            this.props.avatarSrc
              ? {
                  uri: `${global.config.auth.endpoint}${this.props.avatarSrc}`,
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

const mapStateToProps = ({ user }) => ({
  avatarSrc: user.userinfo.avatar
});

export default connect(
  mapStateToProps,
  null
)(Avatar);

Avatar.propTypes = {
  style: PropTypes.object,
  size: PropTypes.number.isRequired
};

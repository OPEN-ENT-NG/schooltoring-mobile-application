import React from "react";
import { Image, View } from "react-native";
import axios from "axios";

import PropTypes from "prop-types";

export const Avatar = props => (
      <View style={props.style}>
        <Image
          style={{
            height: props.size,
            width: props.size,
            borderRadius: props.size / 2,
            overflow: "hidden"
          }}
          source={
            props.src
              ? {
                  uri: `${global.config.auth.endpoint}${props.src}`,
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


Avatar.propTypes = {
  size: PropTypes.number.isRequired,
  style: PropTypes.object,
  src: PropTypes.string
};
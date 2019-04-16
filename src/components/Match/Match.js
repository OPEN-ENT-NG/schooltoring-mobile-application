import React, { Component } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import Proptypes from "prop-types";

import Identity from "../Identity/Identity";
import SubjectBadge from "../SubjectBadge/SubjectBadge";
import DayBadge from "../DayBadge/DayBadge";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import Touchable from "../Touchable/Touchable";

import I18n from "../../api/I18n";

import styles from "./styles";
import { COLORS } from "../../styles/common";

class Match extends Component {
  renderAvailabilites() {
    let days = Object.keys(this.props.availabilities);
    let render = [];
    days.forEach(day =>
      render.push(
        <DayBadge
          key={day}
          style={{ marginHorizontal: 3 }}
          label={I18n.t(`availability.${day}`)
            .charAt(0)
            .toUpperCase()}
          available={this.props.availabilities[day]}
        />
      )
    );
    return render;
  }

  render() {
    return (
      <View>
        <View style={[styles.height30, styles.center]}>
          <Touchable
            style={styles.center}
            onPress={this.props.viewProfile}
            hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}>
            <Identity
              userinfo={this.props.userinfo}
              avatar={{ size: 100, src: this.props.userinfo.avatar }}
            />
          </Touchable>
        </View>
        <View
          style={[
            styles.detail,
            styles.height40,
            { justifyContent: "space-evenly" }
          ]}>
          <View
            style={[
              styles.center,
              styles.marginVertical,
              { marginBottom: 40, flexWrap: "wrap" }
            ]}>
            {this.props.features.map(feature => (
              <SubjectBadge
                key={feature.subjectId}
                title={feature.subjectLabel}
                color={
                  this.props.state.toUpperCase() === "STRENGTH"
                    ? COLORS.SECONDARY
                    : COLORS.PRIMARY
                }
              />
            ))}
          </View>
          <View style={[styles.center, styles.marginVertical]}>
            {this.renderAvailabilites()}
          </View>
        </View>
        <View style={[styles.height30, styles.center]}>
          <View
            style={[
              styles.center,
              {
                flex: 1,
                justifyContent: "flex-end"
              }
            ]}>
            <View style={[styles.width25, styles.center]}>
              <SecondaryButton
                onPress={this.props.onClear}
                style={styles.declineButton}>
                <Icon name="clear" style={styles.roundButtonIcon} />
              </SecondaryButton>
            </View>
            <View style={[styles.width25, styles.center]}>
              <SecondaryButton
                onPress={this.props.onChat}
                style={styles.acceptButton}>
                <Icon name="send" style={styles.roundButtonIcon} />
              </SecondaryButton>
            </View>
            <View style={[styles.width25, styles.center]}>
              <SecondaryButton
                onPress={this.props.onFavorite}
                style={styles.roundButton}>
                <Icon
                  name="favorite"
                  color={this.props.isFavorite ? "red" : COLORS.GREY}
                  style={styles.favoriteButton}
                />
              </SecondaryButton>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

Match.proptypes = {
  userinfo: Proptypes.shape({
    username: Proptypes.string.isRequired,
    avatar: Proptypes.string.isRequired,
    classNames: Proptypes.array.isRequired
  }),
  features: Proptypes.array.isRequired,
  availabilities: Proptypes.shape({
    monday: Proptypes.bool.isRequired,
    tuesday: Proptypes.bool.isRequired,
    wednesday: Proptypes.bool.isRequired,
    thursday: Proptypes.bool.isRequired,
    friday: Proptypes.bool.isRequired,
    saturday: Proptypes.bool.isRequired,
    sunday: Proptypes.bool.isRequired
  }).isRequired,
  state: Proptypes.string.isRequired,
  onClear: Proptypes.func.isRequired,
  onChat: Proptypes.func.isRequired,
  onFavorite: Proptypes.func.isRequired,
  isFavorite: Proptypes.bool,
  viewProfile: Proptypes.func.isRequired
};

export default Match;

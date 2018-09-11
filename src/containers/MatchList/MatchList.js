import React, { Component } from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchMatches } from "../../store/actions/match";
import { postRequest } from "../../store/actions/request";
import { toggleModal } from "../../store/actions/modal";
import I18n from "../../api/I18n";
import EventTracker from "../../api/EventTracker";

import Match from "../../components/Match/Match";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

import { COLORS } from "../../styles/common";

const PAGE_SIZE = 10;

class MatchList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      currentIndex: 0
    };

    this.skipProfile = this.skipProfile.bind(this);
    this.loadMore = this.loadMore.bind(this);

    this.props.fetchMatches(props.navigation.state.routeName, this.state.page);
  }

  loadMore() {
    this.setState(
      {
        currentIndex: 0,
        page: this.state.page + 1
      },
      () => {
        this.props.fetchMatches(
          this.props.navigation.state.routeName,
          this.state.page
        );
      }
    );
  }

  skipProfile() {
    if (this.state.currentIndex === PAGE_SIZE - 1) {
      return this.loadMore();
    }
    this.setState({
      currentIndex: this.state.currentIndex + 1
    });
  }

  render() {
    if (this.props.loading) {
      return (
        <Loader
          color={
            this.props.navigation.state.routeName === "Strength"
              ? COLORS.SECONDARY
              : COLORS.PRIMARY
          }
        />
      );
    }

    if (
      this.props.list.length === 0 ||
      this.state.currentIndex >= this.props.list.length
    ) {
      const message = (
        <Text
          style={{
            width: "80%",
            alignSelf: "center",
            fontSize: 20,
            marginVertical: 100
          }}
        >
          {I18n.t(
            `${this.props.navigation.state.routeName.toLowerCase()}.matchError`
          )}
        </Text>
      );
      return (
        <Error
          message={message}
          critical={this.props.navigation.state.routeName === "Strength"}
        />
      );
    }

    return (
      <Match
        userinfo={this.props.list[this.state.currentIndex].userinfo}
        features={this.props.list[this.state.currentIndex].features}
        availabilities={this.props.list[this.state.currentIndex].availabilities}
        state={this.props.navigation.state.routeName}
        onClear={() => {
          this.skipProfile();
          let category =
            this.props.navigation.state.routeName.toUpperCase() === "STRENGTH"
              ? EventTracker.category.SEEK_HELP
              : EventTracker.category.OFFER_HELP;
          EventTracker.trackEvent(
            EventTracker.events[category].skip,
            EventTracker.category[category]
          );
        }}
        onChat={async () => {
          await this.props.postRequest(
            this.props.navigation.state.routeName,
            this.props.list[this.state.currentIndex].userinfo.id
          );
          let category =
            this.props.navigation.state.routeName.toUpperCase() === "STRENGTH"
              ? EventTracker.category.SEEK_HELP
              : EventTracker.category.OFFER_HELP;
          EventTracker.trackEvent(
            EventTracker.events[category].request,
            EventTracker.category[category]
          );
          let state =
            this.props.navigation.state.routeName.toUpperCase() === "STRENGTH"
              ? "helpRequestSent"
              : "helpOfferSent";
          this.props.toggleModal(
            I18n.t(`${state}.title`),
            I18n.t(`${state}.message`).replace(
              "[name]",
              this.props.list[this.state.currentIndex].userinfo.username
            ),
            require("../../assets/img/send.png")
          );
          this.skipProfile();
        }}
        onFavorite={() => false}
      />
    );
  }
}

const mapStateToProps = ({ matches }) => ({
  loading: matches.loading,
  list: matches.list
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchMatches, postRequest, toggleModal },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchList);

import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchMatches } from "../../store/actions/match";
import { postRequest } from "../../store/actions/request";
import { toggleModal } from "../../store/actions/modal";
import { addFavorite, deleteFavorite } from "../../store/actions/favorite";
import I18n from "../../api/I18n";
import EventTracker from "../../api/EventTracker";

import Match from "../../components/Match/Match";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";

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

  isFavorite(userId) {
    return this.props.favoris.some(fav => fav.id === userId);
  }

  toggleFavorite(user) {
    if (this.isFavorite(user.id)) {
      this.toggleModal(user);
    } else {
      this.props.addFavorite(user);
    }
  }

  toggleModal(user) {
    this.props.toggleModal({
      title: I18n.t(`favorite.deleteTitle`),
      text: I18n.t(`favorite.deleteMessage`).replace(
        "[name]",
        user.userinfo.username
      ),
      children: (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end"
          }}
        >
          <SecondaryButton
            title={"ANNULER"}
            onPress={() => {
              this.props.toggleModal();
            }}
          />
          <SecondaryButton
            title={"SUPPRIMER"}
            onPress={async () => {
              this.props.toggleModal();
              this.props.deleteFavorite(user.id);
            }}
          />
        </View>
      )
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
      const errorParams =
        this.props.navigation.state.routeName === "Strength"
          ? { imgSrc: require("../../assets/img/gars1b.png"), side: "left" }
          : { imgSrc: require("../../assets/img/fille1.png"), side: "right" };
      return (
        <Error
          message={message}
          imgSrc={errorParams.imgSrc}
          side={errorParams.side}
        />
      );
    }

    const match = this.props.list[this.state.currentIndex];
    return (
      <Match
        userinfo={match.userinfo}
        features={match.features}
        availabilities={match.availabilities}
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
            match.userinfo.id
          );
          let state =
            this.props.navigation.state.routeName.toUpperCase() === "STRENGTH"
              ? "helpRequestSent"
              : "helpOfferSent";
          this.props.toggleModal({
            title: I18n.t(`${state}.title`),
            text: I18n.t(`${state}.message`).replace(
              "[name]",
              match.userinfo.username
            ),
            imageSrc: require("../../assets/img/send.png")
          });
          this.skipProfile();
        }}
        isFavorite={this.isFavorite(match.userinfo.id)}
        onFavorite={() =>
          this.toggleFavorite({
            id: match.userinfo.id,
            userinfo: { ...match.userinfo }
          })
        }
      />
    );
  }
}

const mapStateToProps = ({ matches, favorite }) => ({
  loading: matches.loading,
  list: matches.list,
  favoris: favorite.list
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchMatches, postRequest, toggleModal, addFavorite, deleteFavorite },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchList);

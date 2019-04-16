import React, { Component } from "react";
import { FlatList, Text, View, AppState } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { fetchFavorite, deleteFavorite } from "../../store/actions/favorite";
import { postRequest } from "../../store/actions/request";
import { toggleModal } from "../../store/actions/modal";

import I18n from "../../api/I18n";
import NavigationService from "../../api/Navigation";

import FavoriteBadge from "../../components/FavoriteBadge/FavoriteBadge";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";

import styles from "./styles";

class Favorite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appState: "active"
    };

    this.toggleModal = this.toggleModal.bind(this);

    this.props.fetchFavorite();
  }

  componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      this.props.fetchFavorite();
    }
    this.setState({ appState: nextAppState });
  };

  toggleLoading = userId => {
    let newState = { ...this.state };
    newState[userId] = !newState[userId];
    this.setState(newState);
  };

  async toggleModal(user) {
    this.props.toggleModal({
      title: I18n.t(`favorite.deleteTitle`),
      text: I18n.t(`favorite.deleteMessage`).replace(
        "[name]",
        user.userinfo.username
      ),
      children: (
        <View style={styles.modal}>
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
              this.toggleLoading(user.id);
              await this.props.deleteFavorite(user.id);
              this.toggleLoading(user.id);
            }}
          />
        </View>
      )
    });
  }

  render() {
    if (this.props.loading || this.props.error) {
      return <Loader />;
    }

    if (this.props.list.length === 0) {
      return (
        <Error
          message={I18n.t("favorite.error")}
          imgSrc={require("../../assets/img/fille2.png")}
          side="left"
        />
      );
    }

    return (
      <View
        style={{
          height: "100%",
          width: "100%"
        }}>
        <FlatList
          style={styles.list}
          onRefresh={this.props.fetchFavorite}
          refreshing={this.props.loading}
          data={this.props.list}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <FavoriteBadge
                loading={!!this.state[item.id]}
                userinfo={item.userinfo}
                chatDisabled={!item.conversation_id}
                onAvatarPress={() =>
                  NavigationService.navigate("ViewProfile", {
                    userinfo: item.userinfo,
                    id: item.id
                  })
                }
                onDelete={() => this.toggleModal(item)}
                onChat={() => {
                  NavigationService.navigate("Messages", {
                    conversationId: item.conversation_id,
                    userinfo: item.userinfo
                  });
                }}
              />
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ favorite }) => ({
  loading: favorite.loading,
  list: favorite.list,
  error: favorite.error
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchFavorite, deleteFavorite, toggleModal, postRequest },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorite);

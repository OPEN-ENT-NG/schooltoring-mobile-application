import React, { Component } from "react";
import { View } from "react-native";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { toggleModal } from "../../store/actions/modal";
import { addFavorite, deleteFavorite } from "../../store/actions/favorite";
import ProfileService from "../../api/Profile";
import I18n from "../../api/I18n";

import Profile from "../../components/Profile/Profile";
import Loader from "../../components/Loader/Loader";
import Header from "../../components/Header/Header";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";

export class ViewProfile extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header
        navigation={navigation}
        title={navigation.getParam("userinfo").username}
      />
    )
  });

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.navigation.getParam("id"),
      profile: this.props.navigation.getParam("profile"),
      userinfo: this.props.navigation.getParam("userinfo")
    };
  }

  componentWillMount() {
    if (this.state.userinfo == null) {
      this.setState({ userinfo: {} });
    } else if (this.state.profile == null) {
      ProfileService.getProfile(this.state.id).then(({ data }) => {
        this.setState({ profile: data });
      });
    }
  }

  isFavorite = () => {
    return this.props.favoris.some(fav => fav.id === this.state.id);
  };

  toggleFavorite = () => {
    if (this.isFavorite()) {
      this.toggleModal();
    } else {
      this.props.addFavorite(this.state.userinfo);
    }
  };

  toggleModal = () => {
    this.props.toggleModal({
      title: I18n.t(`favorite.deleteTitle`),
      text: I18n.t(`favorite.deleteMessage`).replace(
        "[name]",
        this.state.userinfo.username
      ),
      children: (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end"
          }}>
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
              this.props.deleteFavorite(this.state.id);
            }}
          />
        </View>
      )
    });
  };

  render() {
    if (!this.state.id || !this.state.profile || !this.state.userinfo) {
      return <Loader />;
    } else {
      return (
        <Profile
          isFavorite={this.isFavorite()}
          toggleFavorite={this.toggleFavorite}
          viewOnly={true}
          subjects={this.props.subjects}
          profile={this.state.profile}
          userinfo={this.state.userinfo}
        />
      );
    }
  }
}

const mapStateToProps = ({ favorite, subjects }) => {
  return {
    subjects: subjects.list,
    favoris: favorite.list
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { toggleModal, addFavorite, deleteFavorite },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProfile);

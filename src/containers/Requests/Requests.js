import React, { Component } from "react";
import { ScrollView, View, RefreshControl, Text } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";

import { fetchRequests, updateRequest } from "../../store/actions/request";

import NavigationService from "../../api/Navigation";
import RequestBadge from "../../components/RequestBadge/RequestBadge";
import Loader from "../../components/Loader/Loader";
import Header from "../../components/Header/Header";
import Error from "../../components/Error/Error";
import EventTracker from "../../api/EventTracker";
import I18n from "../../api/I18n";
import { COLORS } from "../../styles/common";

class RequestsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.toggleLoading = this.toggleLoading.bind(this);
    this.props.fetchRequests();
  }

  toggleLoading(requestId) {
    let newState = { ...this.state };
    newState[requestId] = !newState[requestId];
    this.setState(newState);
  }

  render() {
    const refreshControl = (
      <RefreshControl
        onRefresh={this.props.fetchRequests}
        refreshing={this.props.loading}
      />
    );

    const errorMessage = (
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "100%"
        }}
      >
        <Error
          message={
            <Text
              style={{
                width: "80%",
                height: "50%",
                justifyContent: "center",
                alignSelf: "center",
                fontSize: 20
              }}
            >
              {I18n.t(
                `${this.props.navigation.state.routeName.toLowerCase()}.error`
              )}
            </Text>
          }
          critical={true}
        />
      </View>
    );

    if (this.props.loading || this.props.error) {
      return <Loader />;
    }

    return (
      <View
        style={{
          height: "100%",
          width: "100%"
        }}
      >
        {this.props.list.length === 0 && errorMessage}
        <ScrollView
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "transparent"
          }}
          refreshControl={refreshControl}
        >
          {this.props.list.map(item => (
            <RequestBadge
              key={item.id.toString()}
              subjects={item.features}
              userinfo={item.userinfo}
              state={item.state}
              loading={this.state[item.id]}
              onAccept={async () => {
                this.toggleLoading(item.id);
                let data = await this.props.updateRequest(item.id, "ACCEPT");
                this.toggleLoading(item.id);
                let event =
                  item.state.toUpperCase() === "STRENGTH"
                    ? EventTracker.events.REQUEST.SEEK_ACCEPT
                    : EventTracker.events.REQUEST.OFFER_ACCEPT;
                EventTracker.trackEvent(event, EventTracker.category.REQUEST);
                NavigationService.navigate("Messages", {
                  conversationId: data.id,
                  userinfo: data.student
                });
              }}
              onRefuse={async () => {
                this.toggleLoading(item.id);
                await this.props.updateRequest(item.id, "CANCEL");
                this.toggleLoading(item.id);
                let event =
                  item.state.toUpperCase() === "STRENGTH"
                    ? EventTracker.events.REQUEST.SEEK_REFUSE
                    : EventTracker.events.REQUEST.OFFER_REFUSE;
                EventTracker.trackEvent(event, EventTracker.category.REQUEST);
              }}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ requests, user }) => ({
  loading: requests.loading,
  list: requests.list,
  error: requests.error,
  userStrength: user.profile.strengths
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRequests, updateRequest }, dispatch);
}

const Requests = connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestsComponent);

export default createStackNavigator(
  { Requests },
  {
    cardStyle: {
      backgroundColor: COLORS.BACKGROUND
    },
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header
          navigation={navigation}
          noBack={true}
          title={I18n.t(`${navigation.state.routeName.toLowerCase()}.title`)}
        />
      )
    })
  }
);

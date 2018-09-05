import React, { Component } from "react";
import { ScrollView } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  fetchRequests,
  acceptRequest,
  refuseRequest
} from "../../store/actions/request";

import NavigationService from "../../api/Navigation";
import RequestBadge from "../../components/RequestBadge/RequestBadge";
import Loader from "../../components/Loader/Loader";
import EventTracker from "../../api/EventTracker";
import { COLORS } from "../../styles/common";

export class Requests extends Component {
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
    if (this.props.loading || this.props.error) {
      return <Loader />;
    }

    return (
      <ScrollView style={{ flex: 1, backgroundColor: COLORS.BACKGROUND }}>
        {this.props.list.map(request => (
          <RequestBadge
            key={request.id}
            subjects={request.features}
            userinfo={request.userinfo}
            state={request.state}
            loading={this.state[request.id]}
            onAccept={async () => {
              this.toggleLoading(request.id);
              await this.props.acceptRequest(request.id);
              this.toggleLoading(request.id);
              let event =
                request.state.toUpperCase() === "STRENGTH"
                  ? EventTracker.events.REQUEST.SEEK_ACCEPT
                  : EventTracker.events.REQUEST.OFFER_ACCEPT;
              EventTracker.trackEvent(event, EventTracker.category.REQUEST);
              NavigationService.navigate("Messages", {
                state: request.state,
                requestId: request.id,
                userinfo: request.userinfo,
                state: request.state
              });
            }}
            onRefuse={async () => {
              this.toggleLoading(request.id);
              await this.props.refuseRequest(request.id);
              this.toggleLoading(request.id);
              let event =
                request.state.toUpperCase() === "STRENGTH"
                  ? EventTracker.events.REQUEST.SEEK_REFUSE
                  : EventTracker.events.REQUEST.OFFER_REFUSE;
              EventTracker.trackEvent(event, EventTracker.category.REQUEST);
            }}
          />
        ))}
      </ScrollView>
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
  return bindActionCreators(
    { fetchRequests, acceptRequest, refuseRequest },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Requests);

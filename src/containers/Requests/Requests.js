import React, { Component } from "react";
import { ScrollView, View } from "react-native";
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

export class Requests extends Component {
  constructor(props) {
    super(props);

    this.props.fetchRequests();
  }

  render() {
    if (this.props.loading || this.props.error) {
      return <Loader />;
    }

    return (
      <ScrollView style={{ flex: 1 }}>
        {this.props.list.map(request => (
          <RequestBadge
            key={request.id}
            subjects={request.features}
            userinfo={request.userinfo}
            state={request.state}
            onAccept={async () => {
              await this.props.acceptRequest(request.id);
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
              await this.props.refuseRequest(request);
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

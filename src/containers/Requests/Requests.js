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
import { COLORS } from "../../styles/common";

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
              NavigationService.navigate("Messages", {
                state: request.state,
                requestId: request.id,
                userinfo: request.userinfo,
                state: request.state
              });
            }}
            onRefuse={() => this.props.refuseRequest(request)}
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

import React, { Component } from "react";
import { ScrollView, RefreshControl, View, AppState } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { fetchConversations } from "../../store/actions/conversation";

import moment from "moment/min/moment-with-locales";
import I18n from "../../api/I18n";
import Conversation from "../../components/Conversation/Conversation";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

class Conversations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appState: "active"
    };

    this.props.fetchConversations();
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
      this.props.fetchConversations();
    }
    this.setState({ appState: nextAppState });
  };

  getDate = timestamp => {
    moment.locale("fr");
    moment.updateLocale("fr", I18n.t("locale"));
    let now = moment();
    let date = moment.utc(timestamp);
    date.local();

    if (date.isSame(now, "day")) {
      return date.format("HH:mm");
    } else if (
      date.isBefore(moment().startOf("day")) &&
      date.isAfter(
        moment()
          .subtract(1, "d")
          .startOf("day")
      )
    ) {
      return date.calendar(now);
    } else if (date.isSame(now, "week")) {
      return date.format("ddd");
    } else if (date.isSame(now, "year")) {
      return date.format("DD MMM");
    } else {
      return date.format("DD MMM Y");
    }
  };

  render() {
    const refreshControl = (
      <RefreshControl
        onRefresh={this.props.fetchConversations}
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
        }}>
        <Error
          message={I18n.t(`conversations.error`)}
          imgSrc={require("../../assets/img/fille1.png")}
          side="right"
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
        }}>
        {this.props.list.length === 0 && errorMessage}
        <ScrollView
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "transparent"
          }}
          refreshControl={refreshControl}>
          {this.props.list.map(item => (
            <Conversation
              key={item.id.toString()}
              state={item.state}
              userinfo={item.userinfo}
              date={this.getDate(item.date)}
              message={item.message}
              onPress={() =>
                this.props.navigation.navigate("Messages", {
                  conversationId: item.id,
                  userinfo: item.userinfo
                })
              }
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ conversations }) => ({
  loading: conversations.loading_conversations,
  list: conversations.conversations,
  error: conversations.error_conversations
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchConversations }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Conversations);

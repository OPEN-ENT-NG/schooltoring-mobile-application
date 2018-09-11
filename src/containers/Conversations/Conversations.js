import React, { Component } from "react";
import { FlatList } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { fetchConversations } from "../../store/actions/conversation";

import moment from "moment";
import fr from "moment/locale/fr";
import I18n from "react-native-i18n";
import Conversation from "../../components/Conversation/Conversation";
import Loader from "../../components/Loader/Loader";

class Conversations extends Component {
  constructor(props) {
    super(props);

    this.props.fetchConversations();
  }

  getDate = timestamp => {
    moment.locale(fr, I18n.t("locale"));
    let now = moment();
    let date = moment(timestamp);

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
    if (this.props.loading || this.props.error) {
      return <Loader />;
    }

    return (
      <FlatList
        style={{ flex: 1 }}
        onRefresh={this.props.fetchConversations}
        refreshing={this.props.loading}
        keyExtractor={item => item.id.toString()}
        data={this.props.list}
        renderItem={({ item }) => (
          <Conversation
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
        )}
      />
    );
  }
}

const mapStateToProps = ({ conversations }) => ({
  loading: conversations.loading_conversations,
  list: conversations.list,
  error: conversations.error_conversations
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchConversations }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Conversations);

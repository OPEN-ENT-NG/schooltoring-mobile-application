import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { fetchConversations } from "../../store/actions/conversation";

import Conversation from "../../components/Conversation/Conversation";
import Loader from "../../components/Loader/Loader";
import { COLORS } from "../../styles/common";

class Conversations extends Component {
  constructor(props) {
    super(props);

    this.props.fetchConversations();
  }

  render() {
    if (this.props.loading || this.props.error) {
      return <Loader />;
    }

    if (this.props.list.length > 0) {
      return (
        <ScrollView style={{ flex: 1 }}>
          {this.props.list.map(conversation => (
            <Conversation
              key={conversation.id}
              state={conversation.state}
              userinfo={conversation.userinfo}
              date={conversation.date}
              message={conversation.message}
              onPress={() =>
                this.props.navigation.navigate("Messages", {
                  state: conversation.state,
                  requestId: conversation.id,
                  userinfo: conversation.userinfo,
                  state: conversation.state
                })
              }
            />
          ))}
        </ScrollView>
      );
    } else {
      return <View style={{ flex: 1, backgroundColor: COLORS.LIGHT_GREY }} />;
    }
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

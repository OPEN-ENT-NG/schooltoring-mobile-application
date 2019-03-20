import React, { Component } from "react";
import {
  FlatList,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  AppState
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Icon from "react-native-vector-icons/MaterialIcons";
import I18n from "../../api/I18n";
import moment from "moment";

import { fetchMessages, postMessage } from "../../store/actions/conversation";
import ConversationAction from "../../store/definitions/conversation";
import store from "../../store/store";
import styles from "./styles";
import { COLORS } from "../../styles/common";

import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";

class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      appState: "active",
      conversationId: this.props.navigation.getParam("conversationId")
    };

    if (!this.props.list) {
      this.props.fetchMessages(this.state.conversationId);
    }
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
      this.props.fetchMessages(this.state.conversationId);
    }
    this.setState({ appState: nextAppState });
  };

  getOwnerColor(ownerId) {
    return ownerId === this.props.userinfo.userId
      ? COLORS.PRIMARY_EXTRA_LIGHT
      : COLORS.PRIMARY_LIGTH;
  }

  getOwnerAvatar(ownerId) {
    return ownerId === this.props.userinfo.userId
      ? this.props.userinfo.avatar
      : this.props.navigation.getParam("userinfo").avatar;
  }

  getDirection(ownerId) {
    return ownerId === this.props.userinfo.userId ? "right" : "left";
  }

  getMessageList(children) {
    return Platform.select({
      ios: (
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={70}
          enabled>
          {children}
        </KeyboardAvoidingView>
      ),
      android: <KeyboardAvoidingView enabled>{children}</KeyboardAvoidingView>
    });
  }

  render() {
    if ((this.props.loading && !this.props.list) || this.props.error) {
      return <Loader color={COLORS.PRIMARY} />;
    }

    const view = (
      <View
        style={{
          width: "100%",
          height: "100%"
        }}>
        <FlatList
          style={{
            flex: 1
          }}
          inverted={true}
          data={this.props.list}
          extraData={this.props.list}
          keyExtractor={item => item.date}
          renderItem={({ item }) => (
            <Message
              direction={this.getDirection(item.owner)}
              avatar={this.getOwnerAvatar(item.owner)}
              color={this.getOwnerColor(item.owner)}
              message={item.text}
            />
          )}
          onEndReached={() => {
            return (
              this.props.endReached ||
              this.props.fetchMessages(
                this.state.conversationId,
                this.props.list[this.props.list.length - 1].date
              )
            );
          }}
          onEndReachedThreshold={0.2}
          ListFooterComponent={() => {
            return this.props.endReached ? null : (
              <Loader color={COLORS.PRIMARY} />
            );
          }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={I18n.t("conversations.placeholder")}
            style={styles.input}
            onChangeText={message => this.setState({ message })}
            value={this.state.message}
            underlineColorAndroid="transparent"
            multiline={true}
          />
          <View style={styles.icon}>
            <TouchableWithoutFeedback
              onPress={async () => {
                if (!this.state.message) return;
                this.setState({ message: "" });
                this.props.postMessage(this.state.conversationId, {
                  text: this.state.message
                });
                let newMessage = {
                  text: this.state.message,
                  owner: this.props.userinfo.userId,
                  date: moment().format()
                };
                store.dispatch({
                  type: ConversationAction.NEW_MESSAGE,
                  message: newMessage,
                  conversationId: this.props.navigation.getParam(
                    "conversationId"
                  )
                });
              }}>
              <Icon name="send" size={30} />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );

    return this.getMessageList(view);
  }
}

const mapStateToProps = ({ conversations, user }, { navigation }) => {
  return {
    loading: conversations.loading_messages,
    list: conversations.messages[navigation.getParam("conversationId")],
    error: conversations.error_messages,
    endReached: conversations.endReached,
    userinfo: user.userinfo
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMessages, postMessage }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);

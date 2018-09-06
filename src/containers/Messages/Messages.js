import React, { Component } from "react";
import {
  FlatList,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Icon from "react-native-vector-icons/MaterialIcons";
import I18n from "react-native-i18n";
import moment from "moment";

import { fetchMessages, postMessage } from "../../store/actions/conversation";
import ConversationAction from "../../store/definitions/conversation";
import store from "../../store/store";
import styles from "./styles";
import { COLORS } from "../../styles/common";

import Header from "../../components/Header/Header";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";

class Messages extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header
        navigation={navigation}
        noBack={false}
        title={navigation.getParam("userinfo").username}
      />
    )
  });

  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      message: ""
    };

    if (!props.list.hasOwnProperty(props.navigation.getParam("requestId"))) {
      props.fetchMessages(props.navigation.getParam("requestId"));
    }

    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.setState({ page: this.state.page + 1 }, () => {
      this.props.fetchMessages(
        this.props.navigation.getParam("requestId"),
        this.state.page
      );
    });
  }

  getColors() {
    return this.props.navigation.getParam("state").toUpperCase() === "WEAKNESS"
      ? { primary: COLORS.PRIMARY_EXTRA_LIGHT, secondary: COLORS.PRIMARY_LIGTH }
      : {
          primary: COLORS.SECONDARY_EXTRA_LIGHT,
          secondary: COLORS.SECONDARY_LIGHT
        };
  }

  getOwnerColor(ownerId) {
    let colors = this.getColors();
    return ownerId === this.props.userinfo.userId
      ? colors.primary
      : colors.secondary;
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
          enabled
        >
          {children}
        </KeyboardAvoidingView>
      ),
      android: <KeyboardAvoidingView enabled>{children}</KeyboardAvoidingView>
    });
  }

  render() {
    if (
      (this.props.loading &&
        !this.props.list[this.props.navigation.getParam("requestId")]) ||
      this.props.error
    ) {
      return <Loader color={this.getColors().primary} />;
    }

    const view = (
      <View
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        <FlatList
          style={{
            flex: 1
          }}
          inverted={true}
          data={this.props.list[this.props.navigation.getParam("requestId")]}
          extraData={
            this.props.list[this.props.navigation.getParam("requestId")]
          }
          keyExtractor={item => item.date}
          renderItem={({ item }) => (
            <Message
              direction={this.getDirection(item.owner)}
              avatar={this.getOwnerAvatar(item.owner)}
              color={this.getOwnerColor(item.owner)}
              message={item.text}
            />
          )}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={() => {
            return this.props.endReached ? null : (
              <Loader color={this.getColors().primary} />
            );
          }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={I18n.t("conversation.placeholder")}
            style={styles.input}
            ref={ref => (this.textInput = ref)}
            onChangeText={message => this.setState({ message })}
            underlineColorAndroid="transparent"
            multiline={true}
          />
          <View style={styles.icon}>
            <TouchableWithoutFeedback
              onPress={async () => {
                if (!this.state.message) return;
                this.textInput.clear();
                this.props.postMessage(
                  this.props.navigation.getParam("requestId"),
                  { text: this.state.message }
                );
                let newMessage = {
                  text: this.state.message,
                  owner: this.props.userinfo.userId,
                  date: moment().format()
                };
                store.dispatch({
                  type: ConversationAction.NEW_MESSAGE,
                  message: newMessage,
                  request: this.props.navigation.getParam("requestId")
                });
              }}
            >
              <Icon name="send" size={30} />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );

    return this.getMessageList(view);
  }
}

const mapStateToProps = ({ conversations, user }) => {
  return {
    loading: conversations.loading_messages,
    list: conversations.messages,
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

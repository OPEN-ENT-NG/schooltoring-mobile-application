import actions from "../definitions/conversation";
import Conversation from "../../api/Conversation";
import EventTracker from "../../api/EventTracker";
import store from "../../store/store";

export function fetchConversations() {
  return async dispatch => {
    dispatch({
      type: actions.LOADING_CONVERSATIONS
    });
    try {
      const conversations = await Conversation.getConversations();

      dispatch({
        type: actions.FETCH_CONVERSATIONS,
        conversations
      });
    } catch (err) {
      dispatch({
        type: actions.CONVERSATIONS_ERROR
      });
      throw err;
    }
  };
}

export function fetchMessages(conversationId, lastMessage) {
  return async dispatch => {
    dispatch({
      type: actions.LOADING_MESSAGES
    });
    try {
      let messages = await Conversation.getMessages(
        conversationId,
        lastMessage
      );

      let endReached = false;
      if (!messages || messages.length < 20) {
        endReached = true;
      }

      dispatch({
        type: actions.FETCH_MESSAGES,
        messages,
        reset: !lastMessage,
        conversationId,
        endReached
      });
    } catch (err) {
      dispatch({
        type: actions.MESSAGES_ERROR
      });
      throw err;
    }
  };
}

export function postMessage(conversationId, message) {
  return async dispatch => {
    try {
      await Conversation.postMessage(conversationId, message);
      EventTracker.trackEvent(
        EventTracker.events.MESSAGE.SEND,
        EventTracker.category.MESSAGE
      );
    } catch (err) {
      dispatch({
        type: actions.MESSAGES_ERROR
      });
      throw err;
    }
  };
}

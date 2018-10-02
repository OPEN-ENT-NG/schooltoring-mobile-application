import actions from "../definitions/conversation";
import Conversation from "../../api/Conversation";
import EventTracker from "../../api/EventTracker";

export function fetchConversations() {
  return async dispatch => {
    dispatch({
      type: actions.LOADING_CONVERSATIONS
    });
    try {
      const list = await Conversation.getConversations();

      dispatch({
        type: actions.FETCH_CONVERSATIONS,
        list
      });
    } catch (err) {
      dispatch({
        type: actions.CONVERSATIONS_ERROR
      });
      throw err;
    }
  };
}

export function fetchMessages(conversationId, page) {
  return async dispatch => {
    dispatch({
      type: actions.LOADING_MESSAGES
    });
    try {
      const list = await Conversation.getMessages(conversationId, page);
      dispatch({
        type: actions.FETCH_MESSAGES,
        list,
        conversationId,
        endReached: list.length < 20
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

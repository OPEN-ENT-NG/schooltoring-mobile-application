import actions from "../definitions/conversation";
import Conversation from "../../api/Conversation";

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

export function fetchMessages(requestId, page) {
  return async dispatch => {
    dispatch({
      type: actions.LOADING_MESSAGES
    });
    try {
      const list = await Conversation.getMessages(requestId, page);
      dispatch({
        type: actions.FETCH_MESSAGES,
        list,
        requestId,
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

export function postMessage(requestId, message) {
  return async dispatch => {
    try {
      await Conversation.postMessage(requestId, message);
    } catch (err) {
      dispatch({
        type: actions.MESSAGES_ERROR
      });
      throw err;
    }
  };
}

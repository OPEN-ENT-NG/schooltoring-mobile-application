import ConversationAction from "../definitions/conversation";
const defaultState = {
  loading_conversations: false,
  loading_messages: false,
  error_conversations: false,
  error_messages: false,
  list: [],
  messages: {}
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ConversationAction.LOADING_CONVERSATIONS: {
      return {
        ...state,
        loading_conversations: true,
        error_conversations: false
      };
    }
    case ConversationAction.LOADING_MESSAGES: {
      return {
        ...state,
        loading_messages: true,
        error_messages: false
      };
    }
    case ConversationAction.FETCH_CONVERSATIONS: {
      return {
        ...state,
        list: action.list,
        loading_conversations: false,
        error_conversations: false
      };
    }
    case ConversationAction.FETCH_MESSAGES: {
      const newState = {
        ...state,
        messages: {
          ...state.messages
        },
        loading_messages: false,
        error_messages: false,
        endReached: action.endReached
      };
      newState.messages[action.requestId] =
        action.requestId in newState.messages
          ? [...newState.messages[action.requestId], ...action.list]
          : action.list;
      return newState;
    }
    case ConversationAction.CONVERSATIONS_ERROR: {
      return {
        ...state,
        loading_conversations: false,
        error_conversations: true
      };
    }
    case ConversationAction.MESSAGES_ERROR: {
      return {
        ...state,
        loading_messages: false,
        error_messages: true
      };
    }
    case ConversationAction.NEW_MESSAGE: {
      const newState = {
        ...state,
        messages: {
          ...state.messages
        }
      };
      newState.messages[action.request] =
        action.request in newState.messages
          ? [action.message, ...newState.messages[action.request]]
          : [action.message];
      return newState;
    }

    default:
      return state;
  }
}

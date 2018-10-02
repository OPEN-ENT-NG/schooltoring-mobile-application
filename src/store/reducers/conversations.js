import ConversationAction from "../definitions/conversation";
const defaultState = {
  loading_conversations: false,
  loading_messages: false,
  error_conversations: false,
  error_messages: false,
  conversations: [],
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
        conversations: action.conversations,
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
      if (action.reset || !(action.conversationId in newState.messages)) {
        newState.messages[action.conversationId] = action.messages;
      } else {
        newState.messages[action.conversationId] = [
          ...newState.messages[action.conversationId],
          ...action.messages
        ];
      }
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
      newState.messages[action.conversationId] =
        action.conversationId in newState.messages
          ? newState.messages[action.conversationId].find(
              message =>
                message.date === action.message.date &&
                message.owner === action.message.owner
            )
            ? newState.messages[action.conversationId]
            : [action.message, ...newState.messages[action.conversationId]]
          : [action.message];
      return newState;
    }

    default:
      return state;
  }
}

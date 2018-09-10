import RequestActions from "../definitions/request";

const defaultState = {
  loading: false,
  error: false,
  list: []
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case RequestActions.LOADING_REQUESTS: {
      return {
        ...state,
        loading: true,
        error: false
      };
    }
    case RequestActions.FETCH_REQUESTS: {
      return {
        ...state,
        list: action.list,
        loading: false,
        error: false
      };
    }
    case RequestActions.REQUESTS_ERROR: {
      return {
        ...state,
        list: action.list,
        loading: false,
        error: true
      };
    }
    case RequestActions.REQUEST_ANSWERED: {
      return {
        ...state,
        list: state.list.filter(item => item.id != action.conversationId)
      };
    }
    default:
      return state;
  }
}

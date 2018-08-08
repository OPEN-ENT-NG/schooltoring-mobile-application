import MatchActions from "../definitions/match";

const defaultState = {
  loading: true,
  list: []
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case MatchActions.LOADING_MATCHES: {
      return {
        ...state,
        loading: true
      };
    }
    case MatchActions.FETCH_MATCHES: {
      return {
        ...state,
        list: action.list,
        loading: false
      };
    }
    default:
      return state;
  }
}

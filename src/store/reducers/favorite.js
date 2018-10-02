import FavoriteActions from "../definitions/favorite";
import AuthActions from "../definitions/auth";

const defaultState = {
  loading: false,
  error: false,
  list: []
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case FavoriteActions.LOADING_FAVORITE: {
      return {
        ...state,
        loading: true,
        error: false
      };
    }
    case AuthActions.LOGIN:
    case FavoriteActions.FETCH_FAVORITE: {
      return {
        ...state,
        list: action.favorite,
        loading: false,
        error: false
      };
    }
    case FavoriteActions.FAVORITE_ERROR: {
      return {
        ...state,
        loading: false,
        error: true
      };
    }
    case FavoriteActions.DELETE_FAVORITE: {
      return {
        ...state,
        list: state.list.filter(item => item.id != action.userId)
      };
    }
    case FavoriteActions.ADD_FAVORITE: {
      return {
        ...state,
        list: [...state.list, action.user]
      };
    }
    default:
      return state;
  }
}

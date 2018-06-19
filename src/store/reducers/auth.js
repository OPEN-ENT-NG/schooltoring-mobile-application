import AuthActions from "../definitions/auth";

const defaultState = {
  isLoggedIn: false,
  loading: {
    fetch: false,
    form: false
  },
  error: false
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case AuthActions.LOGIN: {
      return {
        ...state,
        isLoggedIn: true,
        loading: {
          fetch: false,
          form: false
        }
      };
    }
    case AuthActions.FETCH_LOADING: {
      return {
        ...state,
        loading: {
          fetch: true,
          form: false
        }
      };
    }
    case AuthActions.FORM_LOADING: {
      return {
        ...state,
        loading: {
          fetch: false,
          form: true
        }
      };
    }
    case AuthActions.LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        loading: {
          fetch: false,
          form: false
        }
      };
    }
    default:
      return state;
  }
}

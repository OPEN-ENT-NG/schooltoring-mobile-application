import AuthActions from "../definitions/auth";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case AuthActions.LOGIN: {
      return {
        ...state,
        list: action.subjects
      };
    }
    default:
      return state;
  }
}

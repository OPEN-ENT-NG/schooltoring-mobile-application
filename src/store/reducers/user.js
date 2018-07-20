import AuthActions from "../definitions/auth";
import ProfileActions from "../definitions/profile";

const defaultState = {
  profile: null,
  error: false,
  loading: false
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case AuthActions.LOGIN: {
      return {
        ...state,
        userinfo: action.userinfo,
        profile:
          Object.keys(action.profile).length === 0 ? null : action.profile
      };
    }
    case ProfileActions.PROFILE_SAVED: {
      return {
        ...state,
        profile: action.profile,
        error: false,
        loading: false
      };
    }
    case ProfileActions.SAVING_PROFILE: {
      return {
        ...state,
        profile: null,
        error: false,
        loading: true
      };
    }
    case ProfileActions.PROFILE_ERROR: {
      return {
        ...state,
        profile: null,
        error: true,
        loading: false
      };
    }
    default:
      return state;
  }
}

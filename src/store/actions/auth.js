import actions from "../definitions/auth";
import OAuth2 from "../../api/OAuth2";
import UserInfos from "../../api/UserInfos";
import Subjects from "../../api/Subjects";
import Profile from "../../api/Profile";

export function login(username, password, rememberMe) {
  return async dispatch => {
    dispatch({
      type: actions.FORM_LOADING
    });
    try {
      await OAuth2.getAccessToken(username, password, rememberMe);
      let userinfo = await UserInfos.getUser();
      let subjects = await Subjects.getSubjects(userinfo.structures[0]);
      let profile = await Profile.getProfile();
      dispatch({ type: actions.LOGIN, userinfo, subjects, profile });
    } catch (err) {
      dispatch({
        type: actions.LOGOUT,
        error: true
      });
      throw err;
    }
  };
}

export function logout() {
  return async dispatch => {
    dispatch({
      type: actions.FORM_LOADING
    });
    try {
      await OAuth2.disconnectUser();
      dispatch({
        type: actions.LOGOUT
      });
    } catch (err) {
      dispatch({
        type: actions.LOGIN,
        error: true
      });
      throw err;
    }
  };
}

export function fetchLogin() {
  return async dispatch => {
    dispatch({
      type: actions.FETCH_LOADING
    });
    const isAlreadyLoggedIn = await OAuth2.isAlreadyLoggedIn();
    if (isAlreadyLoggedIn) {
      await OAuth2.reconnectUser();
      let userinfo = await UserInfos.getUser();
      let subjects = await Subjects.getSubjects(userinfo.structures[0]);
      let profile = await Profile.getProfile();
      dispatch({ type: actions.LOGIN, userinfo, subjects, profile });
    } else {
      dispatch({
        type: actions.LOGOUT
      });
    }
  };
}

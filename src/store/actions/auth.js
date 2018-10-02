import actions from "../definitions/auth";
import OAuth2 from "../../api/OAuth2";
import UserInfos from "../../api/UserInfos";
import Subjects from "../../api/Subjects";
import Profile from "../../api/Profile";
import Favorite from "../../api/Favorite";
import EventTracker from "../../api/EventTracker";

export function login(username, password) {
  return async dispatch => {
    dispatch({
      type: actions.FORM_LOADING
    });
    try {
      await OAuth2.getAccessToken(username, password);
      let userinfo = await UserInfos.getUser();
      if (userinfo.type.toUpperCase() !== "STUDENT") {
        dispatch({ type: actions.FORBIDDEN });
        return;
      }
      let subjects = await Subjects.getSubjects(userinfo.structures[0]);
      let profile = await Profile.getProfile();
      let favorite = await Favorite.getFavorite();
      EventTracker.trackEvent(
        EventTracker.events.AUTHENTICATION.connected,
        EventTracker.category.AUTHENTICATION
      );
      dispatch({ type: actions.LOGIN, userinfo, subjects, profile, favorite });
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
      EventTracker.trackEvent(
        EventTracker.events.AUTHENTICATION.disconnected,
        EventTracker.category.AUTHENTICATION
      );
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
      if (userinfo.type.toUpperCase() !== "STUDENT") {
        dispatch({ type: actions.FORBIDDEN });
        return;
      }
      let subjects = await Subjects.getSubjects(userinfo.structures[0]);
      let profile = await Profile.getProfile();
      let favorite = await Favorite.getFavorite();
      EventTracker.trackEvent(
        EventTracker.events.AUTHENTICATION.connected,
        EventTracker.category.AUTHENTICATION
      );
      dispatch({ type: actions.LOGIN, userinfo, subjects, profile, favorite });
    } else {
      dispatch({
        type: actions.LOGOUT
      });
    }
  };
}

import oAuth2 from "../../api/OAuth2";

import actions from "../definitions/auth";
import OAuth2 from "../../api/OAuth2";

export function login(username, password, rememberMe) {
  return async dispatch => {
    dispatch({
      type: actions.FORM_LOADING
    });
    try {
      await oAuth2.getAccessToken(username, password, rememberMe);
      dispatch({
        type: actions.LOGIN
      });
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
      dispatch({
        type: actions.LOGIN
      });
    } else {
      dispatch({
        type: actions.LOGOUT
      });
    }
  };
}

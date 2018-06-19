import { AsyncStorage } from "react-native";
import axios from "axios";
import Base64 from "base-64";

async function getAuth(grantType, authParams) {
  try {
    const body =
      `grant_type=${grantType}&${authParams}` +
      `&client_id=${global.config.auth.client_id}&client_secret=${
        global.config.auth.secret
      }` +
      `&scope=${global.config.auth.scope}`;

    const request = {
      method: "POST",
      url: `${global.config.auth.endpoint}/auth/oauth2/token`,
      headers: {
        Authorization: `Basic ${Base64.encode(
          `${global.config.auth.client_id}:${global.config.auth.secret}`
        )}`,
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Accept: "application/json;charset=UTF-8"
      },
      data: body
    };
    const { data } = await axios(request);
    return data;
  } catch (err) {
    throw err;
  }
}

async function getAccessToken(username, password, rememberMe) {
  try {
    const authData = await getAuth(
      "password",
      `username=${username}&password=${password}`
    );
    setDefaultAuthorizationHeader(authData.token_type, authData.access_token);

    if (rememberMe) {
      storeAuthenticationData(authData);
    }
  } catch (err) {
    throw err;
  }
}

async function reconnectUser() {
  try {
    const { refresh_token } = await getAuthenticationData();
    const refreshData = await getAuth(
      "refresh_token",
      `refresh_token=${refresh_token}`
    );
    setDefaultAuthorizationHeader(
      refreshData.token_type,
      refreshData.access_token
    );
    storeAuthenticationData(refresh_token);
  } catch (err) {
    throw err;
  }
}

async function isAlreadyLoggedIn() {
  try {
    const data = await getAuthenticationData();
    return data.hasOwnProperty("refresh_token");
  } catch (err) {
    throw err;
  }
}

async function getAuthenticationData() {
  try {
    const data = await AsyncStorage.getItem("auth@token");
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
}

function setDefaultAuthorizationHeader(tokenType, accessToken) {
  return (axios.defaults.headers.common[
    "Authorization"
  ] = `${tokenType} ${accessToken}`);
}

async function storeAuthenticationData(authData) {
  try {
    AsyncStorage.setItem("auth@token", JSON.stringify(authData));
  } catch (err) {
    throw err;
  }
}

export default {
  getAccessToken,
  reconnectUser,
  isAlreadyLoggedIn
};

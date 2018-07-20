import axios from "axios";

async function getUser() {
  try {
    const request = {
      method: "GET",
      url: `${global.config.auth.endpoint}/auth/oauth2/userinfo`,
      headers: {
        Accept: "application/json;charset=UTF-8; version=2.1"
      }
    };
    const { data } = await axios(request);
    data.avatar = await getAvatar();
    return data;
  } catch (err) {
    throw err;
  }
}

async function getAvatar() {
  try {
    const request = {
      method: "GET",
      url: `${global.config.auth.endpoint}/userbook/api/person`,
      headers: {
        Accept: "application/json;charset=UTF-8"
      }
    };
    const { data } = await axios(request);
    return data.result["0"].photo;
  } catch (err) {
    throw err;
  }
}

export default {
  getUser
};

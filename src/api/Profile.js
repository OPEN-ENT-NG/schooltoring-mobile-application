import axios from "axios";

async function getProfile(userId) {
  let paramUserId = userId ? `?userid=${userId}` : "";
  try {
    const request = {
      method: "GET",
      url: `${global.config.auth.endpoint}/schooltoring/profile${paramUserId}`
    };
    const { data } = await axios(request);
    return data;
  } catch (err) {
    throw err;
  }
}

async function setProfile(profile) {
  try {
    const request = {
      method: "POST",
      url: `${global.config.auth.endpoint}/schooltoring/profile`,
      data: profile
    };

    const { data } = await axios(request);
    return data;
  } catch (err) {
    throw err;
  }
}

async function updateProfile(profile) {
  try {
    const request = {
      method: "PUT",
      url: `${global.config.auth.endpoint}/schooltoring/profile`,
      data: profile
    };
    const { data } = await axios(request);
    return data;
  } catch (err) {
    throw err;
  }
}

export default {
  getProfile,
  setProfile,
  updateProfile
};

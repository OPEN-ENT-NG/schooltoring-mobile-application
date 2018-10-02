import axios from "axios";

async function getFavorite() {
  try {
    const request = {
      method: "GET",
      url: `${global.config.auth.endpoint}/schooltoring/favorites`
    };
    const { data } = await axios(request);
    return data;
  } catch (err) {
    throw err;
  }
}

async function postFavorite(userId) {
  try {
    const request = {
      method: "POST",
      data: {
        id: userId
      },
      url: `${global.config.auth.endpoint}/schooltoring/favorite`
    };
    const { data } = await axios(request);
    return data;
  } catch (err) {
    throw err;
  }
}

async function deleteFavorite(userId) {
  try {
    const request = {
      method: "DELETE",
      url: `${global.config.auth.endpoint}/schooltoring/favorite/${userId}`
    };
    const { data } = await axios(request);

    return data;
  } catch (err) {
    throw err;
  }
}

export default {
  getFavorite,
  postFavorite,
  deleteFavorite
};

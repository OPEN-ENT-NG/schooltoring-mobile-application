import axios from "axios";

async function getMatches(state, page) {
  try {
    const request = {
      method: "GET",
      url: `${
        global.config.auth.endpoint
      }/schooltoring/match/${state}?page=${page}`
    };
    const { data } = await axios(request);
    return data;
  } catch (err) {
    throw err;
  }
}

export default {
  getMatches
};

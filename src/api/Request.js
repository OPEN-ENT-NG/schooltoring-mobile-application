import axios from "axios";

async function getRequests() {
  try {
    const request = {
      method: "GET",
      url: `${global.config.auth.endpoint}/schooltoring/requests`
    };
    const { data } = await axios(request);
    return data;
  } catch (err) {
    throw err;
  }
}

async function postRequest(state, userId) {
  try {
    const request = {
      method: "POST",
      data: {
        student_id: userId,
        state: state.toUpperCase()
      },
      url: `${global.config.auth.endpoint}/schooltoring/request`
    };
    const { data } = await axios(request);
    return data;
  } catch (err) {
    throw err;
  }
}

async function putRequest(requestId, status) {
  try {
    const request = {
      method: "PUT",
      url: `${
        global.config.auth.endpoint
      }/schooltoring/request/${requestId}/${status.toUpperCase()}`
    };
    const { data } = await axios(request);
    return data;
  } catch (err) {
    throw err;
  }
}

export default {
  getRequests,
  postRequest,
  putRequest
};

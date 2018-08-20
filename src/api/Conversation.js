import axios from "axios";

async function getConversations() {
  try {
    const request = {
      method: "GET",
      url: `${global.config.auth.endpoint}/schooltoring/conversations`
    };
    const { data } = await axios(request);
    return data;
  } catch (err) {
    throw err;
  }
}

async function getMessages(requestId, page) {
  let pageParameter = page ? `?page=${page}` : "";
  try {
    const request = {
      method: "GET",
      url: `${
        global.config.auth.endpoint
      }/schooltoring/conversation/${requestId}/messages${pageParameter}`
    };
    const { data } = await axios(request);
    return data;
  } catch (err) {
    throw err;
  }
}

async function postMessage(requestId, message) {
  try {
    const request = {
      method: "POST",
      url: `${
        global.config.auth.endpoint
      }/schooltoring/conversation/${requestId}/message`,
      data: message
    };
    await axios(request);
  } catch (err) {
    throw err;
  }
}

export default {
  getConversations,
  getMessages,
  postMessage
};

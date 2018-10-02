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

async function getMessages(conversationId, page) {
  let pageParameter = page ? `?page=${page}` : "";
  try {
    const request = {
      method: "GET",
      url: `${
        global.config.auth.endpoint
      }/schooltoring/conversation/${conversationId}/messages${pageParameter}`
    };
    const { data } = await axios(request);
    return data;
  } catch (err) {
    throw err;
  }
}

async function postMessage(conversationId, message) {
  try {
    const request = {
      method: "POST",
      url: `${
        global.config.auth.endpoint
      }/schooltoring/conversation/${conversationId}/message`,
      data: message
    };
    return await axios(request);
  } catch (err) {
    throw err;
  }
}

export default {
  getConversations,
  getMessages,
  postMessage
};

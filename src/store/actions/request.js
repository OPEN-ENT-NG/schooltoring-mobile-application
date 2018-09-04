import actions from "../definitions/request";
import Request from "../../api/Request";
import NavigationService from "../../api/Navigation";
import { COLORS } from "../../styles/common";

export function fetchRequests() {
  return async dispatch => {
    dispatch({
      type: actions.LOADING_REQUESTS
    });
    try {
      const list = await Request.getRequests();
      dispatch({
        type: actions.FETCH_REQUESTS,
        list
      });
    } catch (err) {
      dispatch({
        type: actions.REQUESTS_ERROR
      });
      throw err;
    }
  };
}

export function postRequest(state, userId) {
  return async dispatch => {
    try {
      const request = await Request.postRequest(state, userId);
      return request;
    } catch (err) {
      dispatch({
        type: actions.REQUESTS_ERROR
      });
      throw err;
    }
  };
}

export function acceptRequest(requestId) {
  return updateRequest(requestId, "ACCEPTED");
}

export function refuseRequest(requestId) {
  return updateRequest(requestId, "CANCELED");
}

function updateRequest(requestId, status) {
  return async dispatch => {
    try {
      await Request.putRequest(requestId, status);
      dispatch({
        type: actions.REQUEST_ANSWERED,
        requestId
      });
    } catch (err) {
      dispatch({
        type: actions.REQUESTS_ERROR
      });
      throw err;
    }
  };
}

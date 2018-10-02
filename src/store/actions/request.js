import actions from "../definitions/request";
import Request from "../../api/Request";
import EventTracker from "../../api/EventTracker";

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
      let category =
        state.toUpperCase() === "STRENGTH"
          ? EventTracker.category.SEEK_HELP
          : EventTracker.category.OFFER_HELP;
      EventTracker.trackEvent(
        EventTracker.events[category].request,
        EventTracker.category[category]
      );
      return request;
    } catch (err) {
      dispatch({
        type: actions.REQUESTS_ERROR
      });
      throw err;
    }
  };
}

export function updateRequest(requestId, status) {
  return async dispatch => {
    try {
      const data = await Request.putRequest(requestId, status);
      dispatch({
        type: actions.REQUEST_ANSWERED,
        requestId
      });
      return data;
    } catch (err) {
      dispatch({
        type: actions.REQUESTS_ERROR
      });
      throw err;
    }
  };
}

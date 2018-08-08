import actions from "../definitions/match";
import Match from "../../api/Match";

export function fetchMatches(state, page) {
  return async dispatch => {
    dispatch({
      type: actions.LOADING_MATCHES
    });
    try {
      const list = await Match.getMatches(state, page);
      dispatch({
        type: actions.FETCH_MATCHES,
        list
      });
    } catch (err) {
      dispatch({
        type: actions.MATCHES_ERROR
      });
      throw err;
    }
  };
}

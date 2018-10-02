import actions from "../definitions/favorite";
import Favorite from "../../api/Favorite";
import EventTracker from "../../api/EventTracker";

export function fetchFavorite() {
  return async dispatch => {
    dispatch({
      type: actions.LOADING_FAVORITE
    });
    try {
      const favorite = await Favorite.getFavorite();
      dispatch({
        type: actions.FETCH_FAVORITE,
        favorite
      });
    } catch (err) {
      dispatch({
        type: actions.FAVORITE_ERROR
      });
      throw err;
    }
  };
}

export function deleteFavorite(userId) {
  return async dispatch => {
    try {
      await Favorite.deleteFavorite(userId);
      EventTracker.trackEvent(
        EventTracker.events.FAVORITE.DELETE,
        EventTracker.category.FAVORITE
      );
      dispatch({
        type: actions.DELETE_FAVORITE,
        userId
      });
    } catch (err) {
      dispatch({
        type: actions.FAVORITE_ERROR
      });
      throw err;
    }
  };
}

export function addFavorite(user) {
  return async dispatch => {
    try {
      await Favorite.postFavorite(user.id);
      EventTracker.trackEvent(
        EventTracker.events.FAVORITE.ADD,
        EventTracker.category.FAVORITE
      );
      dispatch({
        type: actions.ADD_FAVORITE,
        user
      });
    } catch (err) {
      dispatch({
        type: actions.FAVORITE_ERROR
      });
      throw err;
    }
  };
}

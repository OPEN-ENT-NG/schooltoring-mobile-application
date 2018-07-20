import actions from "../definitions/profile";
import Profile from "../../api/Profile";

export function saveProfile(param) {
  return async dispatch => {
    dispatch({
      type: actions.SAVING_PROFILE
    });
    try {
      await Profile.setProfile(param);
      let returnValue = await Profile.getProfile();
      dispatch({
        type: actions.PROFILE_SAVED,
        profile: returnValue
      });
    } catch (err) {
      dispatch({
        type: actions.PROFILE_ERROR
      });
      throw err;
    }
  };
}

import actions from "../definitions/modal";
import store from "../store";

export function toggleModal(params) {
  return async dispatch => {
    dispatch({
      type: store.getState().modal.isVisible ? actions.HIDE : actions.SHOW,
      ...params
    });
  };
}

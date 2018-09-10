import actions from "../definitions/modal";
import store from "../store";

export function toggleModal(title, text, imageSrc) {
  return async dispatch => {
    dispatch({
      type: store.getState().modal.isVisible ? actions.HIDE : actions.SHOW,
      title,
      text,
      imageSrc
    });
  };
}

import ModalActions from "../definitions/modal";

const defaultState = {
  isVisible: false
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ModalActions.SHOW: {
      return {
        ...state,
        isVisible: true,
        title: action.title,
        text: action.text,
        imageSrc: action.imageSrc
      };
    }
    case ModalActions.HIDE: {
      return {
        ...state,
        isVisible: false
      };
    }
    default:
      return state;
  }
}

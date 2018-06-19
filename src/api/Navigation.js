import { NavigationActions } from "react-navigation";
import store from "../store/store";

const navigator = {};

function register(navigatorRef) {
  navigator.ref = navigatorRef;
}

function navigate(routeName, params) {
  navigator.ref.dispatch(NavigationActions.navigate({ routeName, params }));
}

export default {
  register,
  navigate
};

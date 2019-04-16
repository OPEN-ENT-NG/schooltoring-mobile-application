import { NavigationActions, StackActions } from "react-navigation";

const navigator = {};

function register(navigatorName, navigatorRef) {
  if (navigatorRef) {
    navigator[navigatorName] = navigatorRef;
  }
}

function navigate(routeName, params) {
  navigator.root.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

export default {
  register,
  navigate
};

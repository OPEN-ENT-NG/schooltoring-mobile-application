import { NavigationActions, StackActions } from "react-navigation";

const navigator = {};

function register(navigatorName, navigatorRef) {
  navigator[navigatorName] = navigatorRef;
}

function navigate(routeName, params) {
  let action = null;
  if (routeName in navigator) {
    action = navigator[routeName].dispatch(
      StackActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({
            routeName: navigator[routeName].state.nav.routes[0].routeName
          })
        ]
      })
    );
  }

  navigator.root.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
      action
    })
  );
}

export default {
  register,
  navigate
};

import { NavigationActions, StackActions } from "react-navigation";

const navigator = {};

function register(navigatorName, navigatorRef) {
  navigator[navigatorName] = navigatorRef;
}

function navigate(routeName, params) {
  navigator.root.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

function resetProfile() {
  if ("profile" in navigator) {
    navigator["profile"].dispatch(
      StackActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({
            routeName: "Profile"
          })
        ]
      })
    );
  }
}

export default {
  register,
  navigate,
  resetProfile
};

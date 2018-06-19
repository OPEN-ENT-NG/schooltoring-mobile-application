import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import Login from "../Login/Login";
import AuthLoader from "../AuthLoader/AuthLoader";
import Main from "../Main/Main";

import NavigationService from "../../api/Navigation";

const AppNavigator = createBottomTabNavigator({ Main });

const MainNavigator = createSwitchNavigator(
  { AuthLoader, App: AppNavigator, Login },
  { initialRouteName: "AuthLoader" }
);

NavigationService.register(MainNavigator);

export default MainNavigator;

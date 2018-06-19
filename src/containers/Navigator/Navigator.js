import {
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";

import Home from "../Home/Home";
import Requests from "../Requests/Requests";
import Messages from "../Messages/Messages";
import Profile from "../Profile/Profile";

import NavigationService from "../../api/Navigation";

const Navigator = createBottomTabNavigator({
  Home,
  Requests,
  Messages,
  Profile
});

NavigationService.register(Navigator);

export default Navigator;

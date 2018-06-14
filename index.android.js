import { AppRegistry } from "react-native";
import App from "./src/App";

import config from "./app.json";

global.config = config;

AppRegistry.registerComponent("Schooltoring", () => App);

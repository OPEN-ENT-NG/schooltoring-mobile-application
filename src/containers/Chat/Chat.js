import { createStackNavigator } from "react-navigation";

import Conversations from "../Conversations/Conversations";
import Messages from "../Messages/Messages";
import { COLORS } from "../../styles/common";

const Chat = createStackNavigator(
  {
    Conversations,
    Messages
  },
  {
    cardStyle: {
      backgroundColor: COLORS.BACKGROUND
    },
    navigationOptions: () => ({
      header: null
    })
  }
);

export default Chat;

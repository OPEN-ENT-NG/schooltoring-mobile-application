import React from "react";
import { shallow } from "enzyme";
import moment from "moment";

import state from "../../jest/state.json";
import Conversation from "./Conversation";

const conversation = {
  userinfo: state.userinfo,
  state: "STRENGTH",
  date: "2018-08-20T12:35:24+00:00",
  message: "Test message 1"
};

const onPress = jest.fn();

const rendered = shallow(
  <Conversation
    state={conversation.state}
    userinfo={conversation.userinfo}
    date={moment(conversation.date).format("DD MMM Y")}
    message={conversation.message}
    onPress={onPress}
  />
);

describe("Render", () => {
  test("Conversation should render without crashing", () =>
    expect(rendered).toMatchSnapshot());

  test(`Username and message should be respectively '${
    conversation.userinfo.username
  }' and '${conversation.message}'`, () => {
    const usernameText = rendered.find("Text").find('[id="username-field"]');
    const messageText = rendered.find("Text").find('[id="message-field"]');

    expect(usernameText.contains(conversation.userinfo.username)).toBeTruthy();
    expect(messageText.contains(conversation.message)).toBeTruthy();
  });
});

describe("Interactions", () => {
  test("A press on conversation should call onPress prop function", () => {
    onPress.mockReset();
    const onPressButton = rendered.find("Touchable");
    onPressButton.props().onPress();

    expect(onPress).toHaveBeenCalled();
  });
});

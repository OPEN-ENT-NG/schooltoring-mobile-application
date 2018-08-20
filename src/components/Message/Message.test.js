import React from "react";
import { shallow } from "enzyme";

import { COLORS } from "../../styles/common";
import state from "../../jest/state.json";
import Message from "./Message";

const message = {
  avatar: state.userinfo.avatar,
  color: COLORS.PRIMARY,
  message: "Test message"
};

const renderedLeftMessage = shallow(
  <Message
    direction="left"
    color={message.color}
    avatar={message.avatar}
    message={message.message}
  />
);

const renderedRightMessage = shallow(
  <Message
    direction="right"
    color={message.color}
    avatar={message.avatar}
    message={message.message}
  />
);

describe("Render", () => {
  test("Left message should render without crashing", () =>
    expect(renderedLeftMessage).toMatchSnapshot());

  test("Right message should render without crashing", () =>
    expect(renderedRightMessage).toMatchSnapshot());

  test(`Avatar source should be '${global.config.auth.endpoint}${
    message.avatar
  }'`, () => {
    expect(
      renderedLeftMessage
        .find("Avatar")
        .dive()
        .find("Image")
        .props().source.uri
    ).toEqual(`${global.config.auth.endpoint}${message.avatar}`);
  });

  test(`Message text should be '${message.message}'`, () => {
    expect(
      renderedLeftMessage.find("Text").contains(message.message)
    ).toBeTruthy();
  });
});

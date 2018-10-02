import React from "react";
import { Text } from "react-native";
import { shallow } from "enzyme";

import FavoriteBadge from "./FavoriteBadge";

const onChat = jest.fn();
const onDelete = jest.fn();
const userinfo = {
  username: "Yanis ALBON",
  avatar: "/workspace/document/d4ac4110-06d5-4926-9db9-cc5ca3bcede5"
};

const rendered = shallow(
  <FavoriteBadge
    onChat={onChat}
    onDelete={onDelete}
    userinfo={userinfo}
    loading={false}
  />
);

describe("Render", () => {
  test("FavoriteBadge should render without crashing", () => {
    expect(rendered).toMatchSnapshot();
  });

  test("Rendered title should be the username in the userinfo", () => {
    expect(
      rendered
        .find(Text)
        .first()
        .contains(userinfo.username)
    ).toBeTruthy();
  });

  test(`Avatar source should be '${global.config.auth.endpoint}${
    userinfo.avatar
  }'`, () => {
    expect(
      rendered
        .find("Avatar")
        .dive()
        .find("Image")
        .props().source.uri
    ).toEqual(`${global.config.auth.endpoint}${userinfo.avatar}`);
  });
});

describe("Interactions", () => {
  test("Press onDelete button should trigger mocked function", () => {
    const onDeleteButton = rendered.find('[id="on-delete-button"]');
    onDeleteButton.simulate("press");
    expect(onDelete).toHaveBeenCalled();
  });

  test("Press onChat button should trigger mocked function", () => {
    const onChatButton = rendered.find('[id="on-chat-button"]');
    onChatButton.simulate("press");
    expect(onChat).toHaveBeenCalled();
  });
});

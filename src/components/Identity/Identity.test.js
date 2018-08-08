import React from "react";
import { shallow } from "enzyme";

import Identity from "./Identity";

import state from "../../jest/state.json";

const config = { auth: { endpoint: "http://ent3-core.gdapublic.fr" } };

beforeAll(() => {
  global.config = config;
});

let rendered;

describe("Render", () => {
  test("It should render without crashing", () => {
    rendered = shallow(
      <Identity
        userinfo={state.userinfo}
        avatar={{ size: 120, src: state.userinfo.avatar }}
      />
    );

    expect(rendered).toMatchSnapshot();
  });

  test(`Username and Class name should be respectively '${
    state.userinfo.username
  }' and '${state.userinfo.classNames[0].split("$")[1]}'`, () => {
    const usernameText = rendered.find("Text").find('[id="username-field"]');
    const classnameText = rendered.find("Text").find('[id="classname-field"]');

    expect(usernameText.contains(state.userinfo.username)).toBeTruthy();
    expect(
      classnameText.contains(state.userinfo.classNames[0].split("$")[1])
    ).toBeTruthy();
  });

  test(`Avatar source should be '${config.auth.endpoint}${
    state.userinfo.avatar
  }'`, () => {
    expect(
      rendered
        .find("Avatar")
        .dive()
        .find("Image")
        .props().source.uri
    ).toEqual(`${global.config.auth.endpoint}${state.userinfo.avatar}`);
  });
});

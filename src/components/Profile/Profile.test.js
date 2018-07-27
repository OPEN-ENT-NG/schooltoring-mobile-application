import React from "react";
import { shallow } from "enzyme";

import { Profile } from "./Profile";

import state from "../../jest/TestData.json";

test("Profile renders without crashing", () => {
  const navigation = { push: jest.fn() };
  global.config = { auth: { endpoint: "http://ent3-core.gdapublic.fr" } };

  const rendered = shallow(
    <Profile {...state} navigation={navigation} saveProfile={jest.fn()} />
  );
  expect(rendered).toMatchSnapshot();
});

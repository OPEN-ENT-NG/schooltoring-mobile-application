import React from "react";
import renderer from "react-test-renderer";

import { Profile } from "./Profile";

import state from "../../TestData.json";

test("Profile renders without crashing", () => {
  const navigation = { push: jest.fn() };
  global.config = { auth: { endpoint: "http://ent3-core.gdapublic.fr" } };

  const rendered = renderer
    .create(
      <Profile {...state} navigation={navigation} saveProfile={jest.fn()} />
    )
    .toJSON();
  expect(rendered).toMatchSnapshot();
});

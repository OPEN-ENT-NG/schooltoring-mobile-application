import React from "react";
import renderer from "react-test-renderer";

import sinon from "sinon";

import { Avatar } from "./Avatar";

test("Avatar renders the same with given size", () => {
  const rendered = renderer.create(<Avatar size={30} />).toJSON();
  expect(rendered).toMatchSnapshot();
});

test("Avatar renders the same with given size", () => {
  const rendered = renderer.create(<Avatar />).toJSON();

  sinon.assert.callCount(console.error, 1);
  expectMissingProp("size", "Avatar");
});

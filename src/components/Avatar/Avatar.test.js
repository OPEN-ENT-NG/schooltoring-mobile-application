import React from "react";
import { shallow } from "enzyme";

import { Avatar } from "./Avatar";

import TestData from "../../jest/TestData.json";

test("Avatar renders if size given", () => {
  const rendered = shallow(<Avatar size={30} />);
  expect(rendered).toMatchSnapshot();
});

test("Avatar renders if size and src given", () => {
  const rendered = shallow(<Avatar size={30} src={TestData.testAvatar} />);
  expect(rendered).toMatchSnapshot();
});

test("Error logged if no size given", () => {
  const PropTypes = jest.spyOn(global.console, "error");
  const rendered = shallow(<Avatar />);
  expect(rendered).toMatchSnapshot();
  expect(PropTypes).toHaveBeenCalled();
});

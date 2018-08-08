import React from "react";
import { shallow } from "enzyme";

import Avatar from "./Avatar";

import stateMocked from "../../jest/state.json";

describe("Render", () => {
  test("Avatar should render without crashing", () => {
    const rendered = shallow(<Avatar size={30} />);
    expect(rendered).toMatchSnapshot();
  });

  test("Avatar should render with given source and size", () => {
    const rendered = shallow(<Avatar size={30} src={stateMocked.testAvatar} />);
    expect(rendered).toMatchSnapshot();
  });

  test("An error should be logged if no size given", () => {
    const PropTypes = jest.spyOn(global.console, "error");
    const rendered = shallow(<Avatar />);
    expect(rendered).toMatchSnapshot();
    expect(PropTypes).toHaveBeenCalled();
  });
});

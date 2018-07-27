import React from "react";
import { shallow } from "enzyme";

import { SubjectBadge } from "./SubjectBadge";

test("SubjectBadge renders without crashing", () => {
  const rendered = shallow(<SubjectBadge title="Test" />);
  expect(rendered).toMatchSnapshot();
});
test("Error logged if no title given", () => {
  const PropTypes = jest.spyOn(global.console, "error");
  const rendered = shallow(<SubjectBadge />);
  expect(rendered).toMatchSnapshot();
  expect(PropTypes).toHaveBeenCalled();
});

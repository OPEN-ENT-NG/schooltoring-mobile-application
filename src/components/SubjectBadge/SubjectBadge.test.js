import React from "react";
import renderer from "react-test-renderer";

import { SubjectBadge } from "./SubjectBadge";

test("SubjectBadge renders without crashing", () => {
  const rendered = renderer.create(<SubjectBadge title="Test" />).toJSON();
  expect(rendered).toMatchSnapshot();
});

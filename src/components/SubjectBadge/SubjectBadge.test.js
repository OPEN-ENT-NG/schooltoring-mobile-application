import React from "react";
import { Text } from "react-native";
import { shallow } from "enzyme";

import SubjectBadge from "./SubjectBadge";

describe("Render", () => {
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

  test("Rendered title is the same than the title prop given", () => {
    const title = "Badge title";
    const rendered = shallow(<SubjectBadge title={title} />);

    expect(
      rendered
        .find(Text)
        .first()
        .contains(title)
    );
  });
});

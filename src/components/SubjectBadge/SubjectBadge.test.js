import React from "react";
import { Text } from "react-native";
import { shallow } from "enzyme";

import SubjectBadge from "./SubjectBadge";

import { COLORS } from "../../styles/common";

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

  test(`SubjectBadge with ${
    COLORS.PRIMARY
  } props should render with background color as ${COLORS.PRIMARY}`, () => {
    const rendered = shallow(<SubjectBadge color={COLORS.PRIMARY} />);
    expect(
      rendered
        .find("Touchable")
        .children()
        .props().style[1].backgroundColor
    ).toEqual(COLORS.PRIMARY);
  });
});

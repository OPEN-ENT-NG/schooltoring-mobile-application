import React from "react";
import { shallow } from "enzyme";

import Loader from "./Loader";

import { COLORS } from "../../styles/common";

const component = shallow(<Loader />);
const componentWithColor = shallow(<Loader color={COLORS.PRIMARY} />);

describe("Render", () => {
  test("Loader should render without crashing", () => {
    expect(component).toMatchSnapshot();
  });

  test(`Loader without color prop should render an ActivityIndicator with ${
    COLORS.SECONDARY
  } color`, () => {
    expect(component.find("ActivityIndicator").props().color).toEqual(
      COLORS.SECONDARY
    );
  });

  test(`Loader with color prop as ${
    COLORS.PRIMARY
  } should render an ActivityIndicator with ${COLORS.SECONDARY} color`, () => {
    expect(componentWithColor.find("ActivityIndicator").props().color).toEqual(
      COLORS.PRIMARY
    );
  });
});

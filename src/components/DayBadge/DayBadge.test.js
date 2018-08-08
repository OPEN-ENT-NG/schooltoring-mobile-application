import React from "react";
import { shallow } from "enzyme";

import DayBadge from "./DayBadge";
import { COLORS } from "../../styles/common";

const label = "L";

const rendered = shallow(<DayBadge label="L" available={true} />);
const renderedNotAvailable = shallow(
  <DayBadge label={label} avaiable={false} />
);
describe("Render", () => {
  test("DayBadge should render without crashing", () => {
    expect(rendered).toMatchSnapshot();
  });

  test(`DayBadge label should render '${label}'`, () => {
    expect(rendered.find("Text").contains(label)).toBeTruthy();
  });

  test(`DayBadge without availability should render background as ${
    COLORS.GREY
  }`, () => {
    expect(renderedNotAvailable.props().style[0].backgroundColor).toEqual(
      COLORS.GREY
    );
  });

  test(`DayBadge with availability should render background as ${
    COLORS.NEGATIVE
  }`, () => {
    expect(rendered.props().style[1].backgroundColor).toEqual(COLORS.NEGATIVE);
  });
});

import React from "react";
import { shallow } from "enzyme";

import Loader from "./Loader";

describe("Render", () => {
  test("Loader should render without crashing", () => {
    const component = shallow(<Loader />);
    expect(component).toMatchSnapshot();
  });
});

import React from "react";

import { shallow } from "enzyme";

import Touchable from "./Touchable";

const onPressCb = jest.fn();
const rendered = shallow(<Touchable onPress={onPressCb} />);

describe("Render", () => {
  test("Touchable should render without crashing", () => {
    expect(rendered).toMatchSnapshot();
  });
});

describe("Interactions", () => {
  test("Press on touchable should trigger onPress prop function", () => {
    rendered.simulate("press");
    expect(onPressCb).toHaveBeenCalled();
  });
});

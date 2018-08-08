import React from "react";
import { shallow } from "enzyme";

import Home from "./Home";

const navigation = {
  push: jest.fn().mockImplementation(routeName => routeName)
};

const rendered = shallow(<Home navigation={navigation} />);
describe("Render", () => {
  test("It should render without crashing", () =>
    expect(rendered).toMatchSnapshot());

  test("It should render 2 buttons", () => {
    expect(rendered.find("Touchable").length).toEqual(2);
  });
});

describe("Interactions", () => {
  test("On press on top button should trigger navigation.push function with 'Strength' parameter", () => {
    navigation.push.mockReset();

    const button = rendered.find("Touchable").at(0);
    button.props().onPress();
    expect(navigation.push).toHaveBeenCalled();
    expect(navigation.push.mock.calls[0][0]).toBe("Strength");
  });

  test("On press on bottom button should trigger navigation.push function with 'Weakness' parameter", () => {
    navigation.push.mockReset();

    const button = rendered.find("Touchable").at(1);
    button.props().onPress();
    expect(navigation.push).toHaveBeenCalled();
    expect(navigation.push.mock.calls[0][0]).toBe("Weakness");
  });
});

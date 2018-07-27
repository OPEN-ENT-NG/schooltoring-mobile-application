import React from "react";
import { TouchableOpacity } from "react-native";
import { shallow } from "enzyme";

import { SecondaryButton } from "./SecondaryButton";

test("SecondaryButton renders without crashing", () => {
  const component = shallow(
    <SecondaryButton onPress={jest.fn()} title="Test" />
  );
  expect(component).toMatchSnapshot();
});

test("Error logged if no onPress or title given", () => {
  const PropTypes = jest.spyOn(global.console, "error");
  const rendered = shallow(<SecondaryButton />);
  expect(rendered).toMatchSnapshot();
  expect(PropTypes).toHaveBeenCalled();
});

test("onPress function properly called", () => {
  const mockCallBack = jest.fn();
  const component = shallow(
    <SecondaryButton onPress={mockCallBack} title="Test" />
  );
  component.find(TouchableOpacity).prop("onPress")();
  expect(mockCallBack).toHaveBeenCalled();
  expect(component).toMatchSnapshot();
});

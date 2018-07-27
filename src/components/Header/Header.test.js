import React from "react";
import { TouchableWithoutFeedback, Text } from "react-native";
import { shallow, mount } from "enzyme";

import { Header } from "./Header";

test("Header renders without crashing with given title", () => {
  const rendered = shallow(<Header title="Test" />);
  expect(rendered).toMatchSnapshot();
});

test("Error logged when no props title given", () => {
  const PropTypes = jest.spyOn(global.console, "error");
  const rendered = shallow(<Header />);
  expect(PropTypes).toHaveBeenCalled();
});

test("Rendered title is the same than the title prop given", () => {
  const title = "test";
  const rendered = mount(<Header title={title} />);
  console.log(rendered.find("Text").text());
  expect(
    rendered
      .find("Text")
      .first()
      .text()
  ).toBe(title);
});

test.skip("Header renders without crashing with given title and back/navigation parameter", () => {
  const callback = jest.fn(param => true);
  const navigation = {
    dispatch: callback
  };
  const rendered = shallow(<Header title="Test" navigation={navigation} />);
  rendered.find(TouchableWithoutFeedback).prop("onPress")();

  expect(callback).toHaveBeenCalled();
  expect(rendered).toMatchSnapshot();
});

import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { shallow } from "enzyme";

import { SecondaryButton } from "./SecondaryButton";

describe("Render", () => {
  test("SecondaryButton should render without crashing", () => {
    const component = shallow(
      <SecondaryButton onPress={jest.fn()} title="Test" />
    );
    expect(component).toMatchSnapshot();
  });
  test("An error should be logged if no onPress or title given", () => {
    const PropTypes = jest.spyOn(global.console, "error");
    const rendered = shallow(<SecondaryButton />);
    expect(rendered).toMatchSnapshot();
    expect(PropTypes).toHaveBeenCalled();
  });
  test("Rendered title is the same than the title prop given", () => {
    const title = "Button title";
    const rendered = shallow(<SecondaryButton title={title} />);

    expect(
      rendered
        .find(Text)
        .first()
        .contains(title)
    );
  });
});

describe("Interactions", () => {
  test("Press on the back button should trigger mocked function", () => {
    const mockCallBack = jest.fn();
    const component = shallow(
      <SecondaryButton onPress={mockCallBack} title="Test" />
    );
    component.find(TouchableOpacity).prop("onPress")();
    expect(mockCallBack).toHaveBeenCalled();
  });
});

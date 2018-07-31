import React from "react";
import { TextInput } from "react-native";
import { shallow } from "enzyme";

import InputText from "./InputText";

const placeholder = "Placeholder text",
  value = "",
  onChangeTextCb = jest.fn(),
  testValue = "value text",
  rendered = shallow(
    <InputText
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeTextCb}
    />
  ),
  input = rendered.find(TextInput);

describe("Render", () => {
  test("InputText should render without crashing", () => {
    expect(rendered).toMatchSnapshot();
  });

  test(`InputText should render placerholder as '${placeholder}'`, () => {
    expect(input.props().placeholder).toEqual(placeholder);
  });

  test(`InputText should render value as '${testValue}'`, () => {
    const component = shallow(
      <InputText value={testValue} onChangeText={onChangeTextCb} />
    );

    expect(component.find(TextInput).props().value).toEqual(testValue);
  });

  test("InputText with secureTextEntry prop display password field", () => {
    const component = shallow(
      <InputText
        value={testValue}
        onChangeText={onChangeTextCb}
        secureTextEntry={true}
      />
    );

    expect(component.find(TextInput).props().secureTextEntry).toBeTruthy();
  });
});

describe("Interaction", () => {
  test("InputText change should trigger onChangeText prop function", () => {
    input.simulate("changeText");
    expect(onChangeTextCb).toHaveBeenCalled();
  });
});

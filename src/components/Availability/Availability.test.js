import React from "react";
import { Switch } from "react-native";
import { shallow } from "enzyme";

import Availability from "./Availability";

import state from "../../jest/state.json";

let newState;
const navigation = {
  push: jest.fn(),
  pop: jest.fn()
};
let onChangeScreen = jest.fn().mockImplementation((screen, state) => {
  newState = state;
});

const rendered = shallow(
    <Availability
      {...state}
      navigation={navigation}
      onChangeScreen={onChangeScreen}
    />
  ),
  switches = rendered.find(Switch),
  days = Object.keys(state.profile.availabilities),
  renderedWithSaveButton = shallow(
    <Availability
      {...state}
      navigation={navigation}
      onChangeScreen={onChangeScreen}
      saveButton={true}
    />
  );

describe("Render", () => {
  test("Availability without save button should render without crashing", () => {
    expect(rendered).toMatchSnapshot();
  });

  test("Availability with save button should render without crashing", () => {
    expect(renderedWithSaveButton).toMatchSnapshot();
  });

  test("Availaibility without save button should render 2 Secondary Buttons", () => {
    expect(rendered.find("SecondaryButton").length).toEqual(2);
  });

  test("Availability with save button should render only 1 Secondary Button", () => {
    expect(renderedWithSaveButton.find("SecondaryButton").length).toEqual(1);
  });
  test(`${days.length} switch should be rendered`, () => {
    expect(switches.length).toEqual(days.length);
  });

  test("Switches values should match with state values", () => {
    for (let i = 0; i < days.length; i++) {
      expect(switches.at(i).props().value).toEqual(
        state.profile.availabilities[days[i]]
      );
    }
  });
});

describe("Interactions", () => {
  const skipButton = rendered.find("SecondaryButton").at(0);
  const nextButton = rendered.find("SecondaryButton").at(1);
  const saveButton = renderedWithSaveButton.find("SecondaryButton").first();

  test("Changing switch values should update state", () => {
    let item, newState;
    for (let i = 0; i < switches.length; i++) {
      item = switches.at(i);
      item.props().value = !item.props().value;
      item.props().onValueChange();
    }
    newState = rendered.update().state();
    for (let i = 0; i < days.length; i++) {
      expect(newState[days[i]]).not.toEqual(
        state.profile.availabilities[days[i]]
      );
    }
  });

  test("Press 'Next' button should trigger onChangeScreen function and navigation.push function", () => {
    nextButton.props().onPress();
    expect(onChangeScreen).toHaveBeenCalled();
    expect(navigation.push).toHaveBeenCalled();
  });

  test("Press 'Skip' button should trigger onChangeScreen function and navigation.push function", () => {
    onChangeScreen.mockReset();
    navigation.push.mockReset();
    skipButton.props().onPress();

    expect(onChangeScreen).toHaveBeenCalled();
    expect(navigation.push).toHaveBeenCalled();
  });

  test("Press 'Skip' button should set all days as false", () => {
    onChangeScreen.mockReset();
    skipButton.props().onPress();
    days.forEach(day => {
      expect(newState[day]).toBeFalsy();
    });
  });

  test("Press 'Save' button should trigger onChangeScreen function and navigator.pop function", () => {
    onChangeScreen.mockReset();
    navigation.pop.mockReset();
    saveButton.props().onPress();

    expect(onChangeScreen).toHaveBeenCalled();
    expect(navigation.pop).toHaveBeenCalled();
  });
});

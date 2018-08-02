import React from "react";
import { shallow } from "enzyme";

import StrengthWeakness from "./StrengthWeakness";
import SubjectBadge from "../SubjectBadge/SubjectBadge";

import state from "../../jest/state.json";

const navigation = {
  state: {
    routeName: "Strength"
  },
  push: jest.fn(),
  pop: jest.fn()
};

const onChangeScreen = jest.fn();

const rendered = shallow(
  <StrengthWeakness
    {...state}
    onChangeScreen={onChangeScreen}
    navigation={navigation}
  />
);

const renderedWithSaveButton = shallow(
  <StrengthWeakness
    {...state}
    onChangeScreen={onChangeScreen}
    navigation={navigation}
    saveButton={true}
  />
);

describe("Render", () => {
  test("StrengthWeakness with no save button should render without crashing", () => {
    expect(rendered).toMatchSnapshot();
  });

  test("StrengthWeakness should render 3 SubjectBadge given props", () => {
    const badges = rendered.find(SubjectBadge);
    expect(badges.length).toEqual(3);
  });

  test("StrengthWeakness with no save button should render 2 secondary buttons", () => {
    expect(rendered.find("SecondaryButton").length).toEqual(2);
  });

  test("StrengthWeakness with save button should render without crashing", () => {
    expect(renderedWithSaveButton).toMatchSnapshot();
  });

  test("StrengthWeakness with save  button should render only 1 secondary button", () => {
    expect(renderedWithSaveButton.find("SecondaryButton").length).toEqual(1);
  });
});

describe("Interactions", () => {
  const skipButton = rendered.find("SecondaryButton").at(0);
  const nextButton = rendered.find("SecondaryButton").at(1);
  const saveButton = renderedWithSaveButton.find("SecondaryButton");
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

  test("Press 'Save' button should trigger onCHangeScreen function and navigation.pop", () => {
    onChangeScreen.mockReset();
    navigation.pop.mockReset();
    saveButton.props().onPress();

    expect(onChangeScreen).toHaveBeenCalled();
    expect(navigation.pop).toHaveBeenCalled();
  });
});

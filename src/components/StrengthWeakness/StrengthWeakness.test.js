import React from "react";
import { shallow } from "enzyme";

import StrengthWeakness from "./StrengthWeakness";
import SubjectBadge from "../SubjectBadge/SubjectBadge";

import state from "../../jest/state.json";

const navigation = {
  state: {
    routeName: "Strength"
  },
  push: jest.fn()
};

const onChangeScreen = jest.fn();

let rendered = shallow(
  <StrengthWeakness
    {...state}
    onChangeScreen={onChangeScreen}
    navigation={navigation}
  />
);

describe("Render", () => {
  test("StrengthWeakness should render without crashing", () => {
    expect(rendered).toMatchSnapshot();
  });

  test("TrengthWeakness should render 3 SubjectBadge given props", () => {
    const badges = rendered.find(SubjectBadge);
    expect(badges.length).toEqual(3);
  });
});

describe("Interactions", () => {
  const skipButton = rendered.find("SecondaryButton").at(0);
  const nextButton = rendered.find("SecondaryButton").at(1);
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
});

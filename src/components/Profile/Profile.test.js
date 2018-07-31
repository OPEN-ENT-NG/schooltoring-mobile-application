import React from "react";
import { Text } from "react-native";
import { shallow } from "enzyme";

import { Profile } from "./Profile";
import Touchable from "../Touchable/Touchable";

import state from "../../jest/state.json";
import { COLORS } from "../../styles/common";

const navigation = { push: jest.fn() };
const strengthsName = [
  "SCIENCES PHYSIQUES ET CHIMIE APPLIQUEE",
  "SCIENCES INDUSTRIELLES DE L'INGENIEUR",
  "MATHEMATIQUES"
];
const weaknessesName = [
  "ESPAGNOL LV2",
  "HISTOIRE-GEOGRAPHIE",
  "ECONOMIE-DROIT"
];
const availabilities = [false, true, false, true, false, false, true];

beforeAll(() => {
  global.config = { auth: { endpoint: "http://ent3-core.gdapublic.fr" } };
});

describe("Render", () => {
  let rendered;

  test("Profile should render without crashing", () => {
    rendered = shallow(
      <Profile {...state} navigation={navigation} saveProfile={jest.fn()} />
    );
    expect(rendered).toMatchSnapshot();
  });

  test(`Username and Class name should be respectively '${
    state.userinfo.username
  }' and '${state.userinfo.classNames[0].split("$")[1]}'`, () => {
    const usernameText = rendered.find(Text).find('[id="username-field"]');
    const classnameText = rendered.find(Text).find('[id="classname-field"]');

    expect(usernameText.contains(state.userinfo.username)).toBeTruthy();
    expect(
      classnameText.contains(state.userinfo.classNames[0].split("$")[1])
    ).toBeTruthy();
  });

  test("Profile render strengths should be the same as props", () => {
    const badges = rendered
      .find('[id="strengths-section"]')
      .dive()
      .find("SubjectBadge");

    expect(badges.length).toEqual(strengthsName.length);
    for (let i = 0; i < strengthsName.length; i++) {
      expect(
        badges
          .at(i)
          .dive()
          .find(Touchable)
          .contains(strengthsName[i])
      ).toBeTruthy();
    }
  });

  test("Profile render weaknesses should be the same as props", () => {
    const badges = rendered
      .find('[id="weaknesses-section"]')
      .dive()
      .find("SubjectBadge");

    expect(badges.length).toEqual(weaknessesName.length);
    for (let i = 0; i < weaknessesName.length; i++) {
      expect(
        badges
          .at(i)
          .dive()
          .find(Touchable)
          .contains(weaknessesName[i])
      ).toBeTruthy();
    }
  });

  test("Profile render availabilities should be the same as props", () => {
    const days = rendered
      .find('[id="availabilities-section"]')
      .dive()
      .childAt(1)
      .children();

    expect(days.length).toEqual(availabilities.length);
    for (let i = 0; i < days.length; i++) {
      let day = days.get(i);
      expect(day.props.style[1].backgroundColor).toEqual(
        availabilities[i] ? COLORS.NEGATIVE : COLORS.GREY
      );
    }
  });
});

describe("Interactions", () => {
  test("ProfileItem editing button should be called on press", () => {
    const rendered = shallow(
      <Profile {...state} navigation={navigation} saveProfile={jest.fn()} />
    );

    const button = rendered
      .find('[id="strengths-section"]')
      .dive()
      .find(Touchable);

    button.prop("onPress")();

    expect(navigation.push).toHaveBeenCalled();
  });
});

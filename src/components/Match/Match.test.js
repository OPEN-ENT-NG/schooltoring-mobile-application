import React from "react";
import { shallow } from "enzyme";

import Match from "./Match";

const match = {
  id: "49abe348-0b13-4ce0-ac8c-01fa7b7e8f68",
  matches: 3,
  availabilities: {
    monday: true,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
  },
  features: [
    { subjectId: "1474925-1517929209848", subjectLabel: "FRANCAIS" },
    { subjectId: "1480091-1517929209848", subjectLabel: "ALLEMAND LV2" },
    { subjectId: "1474895-1517929209848", subjectLabel: "ANGLAIS LV1" }
  ],
  userinfo: {
    id: "49abe348-0b13-4ce0-ac8c-01fa7b7e8f68",
    username: "Amel AMAIRI",
    classNames: ["VERSAILLES-7133$BTS1TPIL"],
    avatar: "/workspace/document/916c2df5-13d2-48cf-9f54-4402c36d4af0"
  }
};

const onClear = jest.fn();
const onChat = jest.fn();
const onFavorite = jest.fn();

const renderedStrengths = shallow(
  <Match
    userinfo={match.userinfo}
    features={match.features}
    availabilities={match.availabilities}
    state="STRENGTH"
    onClear={onClear}
    onChat={onChat}
    onFavorite={onFavorite}
  />
);

const renderedWkeanesses = shallow(
  <Match
    userinfo={match.userinfo}
    features={match.features}
    availabilities={match.availabilities}
    state="WEAKNESS"
    onClear={onClear}
    onChat={onChat}
    onFavorite={onFavorite}
  />
);

describe("Render", () => {
  test("Strength match should render without crashing", () =>
    expect(renderedStrengths).toMatchSnapshot());

  test("Weaknesse match should render without crashing", () =>
    expect(renderedWkeanesses).toMatchSnapshot());

  test("Match should render 3 features", () =>
    expect(renderedStrengths.find("SubjectBadge").length).toEqual(3));

  test("Match shoould render 'FRANCAIS', 'ALLEMAND LV2' and 'ANGLAIS LV1' as features", () => {
    const features = renderedStrengths.find("SubjectBadge");
    expect(
      features
        .at(0)
        .dive()
        .find("Text")
        .contains("FRANCAIS")
    ).toBeTruthy();
    expect(
      features
        .at(1)
        .dive()
        .find("Text")
        .contains("ALLEMAND LV2")
    ).toBeTruthy();
    expect(
      features
        .at(2)
        .dive()
        .find("Text")
        .contains("ANGLAIS LV1")
    ).toBeTruthy();
  });

  test("Match should render 7 availabilities", () =>
    expect(renderedStrengths.find("DayBadge").length).toEqual(7));

  test("Match should render 3 SecondaryButtons", () =>
    expect(renderedStrengths.find("SecondaryButton").length).toEqual(3));

  test("Match should render 3 buttons with respectively 'clear', 'chat' and 'favorite' as Icon", () => {
    const buttons = renderedStrengths.find("SecondaryButton");

    expect(
      buttons
        .at(0)
        .children()
        .find("Icon")
        .props().name
    ).toEqual("clear");
    expect(
      buttons
        .at(1)
        .children()
        .find("Icon")
        .props().name
    ).toEqual("chat");
    expect(
      buttons
        .at(2)
        .children()
        .find("Icon")
        .props().name
    ).toEqual("favorite");
  });
});

describe("Interactions", () => {
  test("On press on clear button should call onClear prop function", () => {
    onClear.mockReset();
    const onClearButton = renderedStrengths.find("SecondaryButton").at(0);
    onClearButton.props().onPress();

    expect(onClear).toHaveBeenCalled();
  });

  test("On press on chat button should call onChat prop function", () => {
    onChat.mockReset();
    const onClearButton = renderedStrengths.find("SecondaryButton").at(1);
    onClearButton.props().onPress();

    expect(onChat).toHaveBeenCalled();
  });

  test("On press on favorite button should call onClear prop function", () => {
    onFavorite.mockReset();
    const onClearButton = renderedStrengths.find("SecondaryButton").at(2);
    onClearButton.props().onPress();

    expect(onFavorite).toHaveBeenCalled();
  });
});

import React from "react";
import { shallow } from "enzyme";

import { COLORS } from "../../styles/common";
import state from "../../jest/state.json";
import RequestBadge from "./RequestBadge";

const request = {
  userinfo: state.userinfo,
  subjects: [
    { subjectId: "1474925-1517929209848", subjectLabel: "FRANCAIS" },
    { subjectId: "1480091-1517929209848", subjectLabel: "ALLEMAND LV2" },
    { subjectId: "1474895-1517929209848", subjectLabel: "ANGLAIS LV1" }
  ]
};

const onAccept = jest.fn();
const onRefuse = jest.fn();

const rendered = shallow(
  <RequestBadge
    userinfo={request.userinfo}
    subjects={request.subjects}
    onAccept={onAccept}
    onRefuse={onRefuse}
  />
);

describe("Render", () => {
  test("RequestBadge match should render without crashing", () =>
    expect(rendered).toMatchSnapshot());

  test(`Avatar source should be '${global.config.auth.endpoint}${
    request.userinfo.avatar
  }'`, () => {
    expect(
      rendered
        .find("Avatar")
        .dive()
        .find("Image")
        .props().source.uri
    ).toEqual(`${global.config.auth.endpoint}${request.userinfo.avatar}`);
  });

  test(`Username and Class name should be respectively '${
    request.userinfo.username
  }' and '${request.userinfo.classNames[0].split("$")[1]}'`, () => {
    const usernameText = rendered.find("Text").find('[id="username-field"]');
    const classnameText = rendered.find("Text").find('[id="classname-field"]');

    expect(usernameText.contains(request.userinfo.username)).toBeTruthy();
    expect(
      classnameText.contains(request.userinfo.classNames[0].split("$")[1])
    ).toBeTruthy();
  });

  test("RequestBadge should render 3 subjects", () =>
    expect(rendered.find("SubjectBadge").length).toEqual(3));

  test("RequestBadge should render 'FRANCAIS', 'ALLEMAND LV2' and 'ANGLAIS LV1' as subjects", () => {
    const features = rendered.find("SubjectBadge");
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

  test("RequestBadge should render 2 SecondaryButtons", () =>
    expect(rendered.find("SecondaryButton").length).toEqual(2));

  test("RequestBadge should render 2 buttons with respectively 'clear' and 'chat' as Icon", () => {
    const buttons = rendered.find("SecondaryButton");

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
  });
});

describe("Interactions", () => {
  test("On press on clear button should call onRefuse prop function", () => {
    onRefuse.mockReset();
    const onRefuseButton = rendered.find("SecondaryButton").at(0);
    onRefuseButton.props().onPress();

    expect(onRefuse).toHaveBeenCalled();
  });

  test("On press on chat button should call onAccept prop function", () => {
    onAccept.mockReset();
    const onAcceptButton = rendered.find("SecondaryButton").at(1);
    onAcceptButton.props().onPress();

    expect(onAccept).toHaveBeenCalled();
  });
});

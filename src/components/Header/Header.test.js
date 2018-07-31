import React from "react";
import { Text } from "react-native";
import { shallow } from "enzyme";

import { COLORS } from "../../styles/common";
import { Header } from "./Header";

jest.mock("react-navigation", () => ({
  StackActions: {
    pop: jest.fn()
  }
}));

const callback = jest.fn();
const navigation = {
  dispatch: callback
};

describe("Render", () => {
  test("Header should render without crashing", () => {
    const rendered = shallow(<Header title="Test" navigation={navigation} />);
    expect(rendered).toMatchSnapshot();
  });

  test("An error should be logged when no props title given", () => {
    const PropTypes = jest.spyOn(global.console, "error");
    const rendered = shallow(<Header />);
    expect(PropTypes).toHaveBeenCalled();
  });
  test("Rendered title should be the same as the title prop given", () => {
    const title = "test";
    const rendered = shallow(<Header title={title} />);
    expect(
      rendered
        .find(Text)
        .first()
        .contains(title)
    ).toBeTruthy();
  });

  test("Header with noBack props set as 'false' should render a back button", () => {
    const rendered = shallow(
      <Header title="Test" noBack={false} navigation={navigation} />
    );

    const backButton = rendered.find('[id="header-back-button"]');
    const backIcon = backButton.find("Icon");

    expect(backButton.exists()).toBeTruthy();
    expect(backIcon.exists()).toBeTruthy();
  });

  test("Header with background color props should render with background color", () => {
    const rendered = shallow(
      <Header
        title="Test"
        navigation={navigation}
        backgroundColor={COLORS.PRIMARY}
      />
    );

    expect(rendered.props().style.backgroundColor).toEqual(COLORS.PRIMARY);
  });
});

describe("Interactions", () => {
  const rendered = shallow(
    <Header title="Test" noBack={false} navigation={navigation} />
  );

  test("Press on back button should trigger mocked function", () => {
    const backButton = rendered.find('[id="header-back-button"]');

    backButton.props().onPress();
    expect(navigation.dispatch).toHaveBeenCalled();
  });
});

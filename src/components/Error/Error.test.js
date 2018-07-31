import React from "react";
import { Text } from "react-native";

import { shallow } from "enzyme";

import Error from "./Error";

const message = "Error message";
const messageComponent = (
  <Text id="error-message-component">Error message 2</Text>
);

describe("Render", () => {
  test("Error page should render without crashing", () => {
    const rendered = shallow(<Error message={message} />);

    expect(rendered).toMatchSnapshot();
  });

  test("Error page should render a simple text", () => {
    const rendered = shallow(<Error message={message} />);

    expect(
      rendered
        .children()
        .at(0)
        .contains(message)
    );
  });

  test("Error page should render a React Component", () => {
    const rendered = shallow(<Error message={messageComponent} />);

    expect(
      rendered.find("[id='error-message-component']").exists()
    ).toBeTruthy();
  });
});

import React from "react";
import { shallow } from "enzyme";

import { SecondaryButton } from "./SecondaryButton";

test("SecondaryButton renders without crashing", () => {
  const mockCallBack = jest.fn();
  const component = shallow(
    <SecondaryButton onPress={mockCallBack} title="Test" />
  );
  component.find();
  expect(rendered).toMatchSnapshot();
});

import React from "react";
import renderer from "react-test-renderer";

import { Header } from "./Header";

test.only("Header renders without crashing with given title", () => {
  const rendered = renderer.create(<Header title="Test" />).toJSON();
  expect(rendered).toMatchSnapshot();
});
test("Header renders without crashing with given title and back/navigation parameter", () => {
  const navigation = {
    dispatch: js.mock()
  };
  const rendered = renderer
    .create(<Header title="Test" noBack={true} navigation={navigation} />)
    .toJSON();
  expect(rendered).toMatchSnapshot();
});

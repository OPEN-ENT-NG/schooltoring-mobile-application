import React from "react";
import { shallow } from "enzyme";

import PopupMenu from "./PopupMenu";

const actions = ["Se connecter", "Se déconnecter"];
const onPressMenuItem = jest.fn();

const rendered = shallow(
  <PopupMenu actions={actions} onPress={onPressMenuItem} />
);

describe("Render", () => {
  test("PopupMenu should render without crashing", () => {
    expect(rendered).toMatchSnapshot();
  });

  test("PopupMenu should render a 'more-vert' icon", () => {
    expect(
      rendered
        .find("Icon")
        .first()
        .props().name
    ).toEqual("more-vert");
  });
});

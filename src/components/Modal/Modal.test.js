import React from "react";
import { shallow } from "enzyme";

import Modal from "./Modal";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import Touchable from "../Touchable/Touchable";

const onPress = jest.fn();
const title = "title";
const text = "text";
const img = require("../../assets/img/send.png");

const rendered = shallow(
  <Modal title={title} text={text} imageSrc={img} onPress={onPress} />
);

describe("Render", () => {
  test("Modal should render without crashing", () => {
    expect(rendered).toMatchSnapshot();
  });

  test("Modal should render with proper title and message", () => {
    const renderedTitle = rendered.find('[id="title"]');
    const renderedText = rendered.find('[id="text"]');

    expect(renderedTitle.contains(title)).toBeTruthy();
    expect(renderedText.contains(text)).toBeTruthy();
  });
});

describe("Interactions", () => {
  test("Modal close button should be called on press", () => {
    const button = rendered
      .find(SecondaryButton)
      .dive()
      .find(Touchable);

    button.prop("onPress")();

    expect(onPress).toHaveBeenCalled();
  });
});

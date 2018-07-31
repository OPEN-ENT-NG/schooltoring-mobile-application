import React from "react";
import { TextInput, ScrollView } from "react-native";
import { shallow } from "enzyme";

import Autocomplete from "./Autocomplete";
import InputText from "../InputText/InputText";

import state from "../../jest/state.json";

const placeholder = "placeholder text";

describe("Render", () => {
  const rendered = shallow(
    <Autocomplete
      placeholder={placeholder}
      data={state.subjects}
      filterItem={jest.fn()}
      getItemKey={jest.fn()}
      onItemPress={jest.fn()}
      renderItem={jest.fn()}
    />
  );

  test("Autocomplete should render without crashing", () => {
    expect(rendered).toMatchSnapshot();
  });

  test(`Placeholder text should equal '${placeholder}'`, () => {
    const input = rendered.find(InputText);
    expect(input.prop("placeholder")).toEqual(placeholder);
  });

  test("An error should be logged if no required props are given", () => {
    const PropTypes = jest.spyOn(global.console, "error");
    const component = shallow(<Autocomplete />);
    expect(component).toMatchSnapshot();
    expect(PropTypes).toHaveBeenCalled();
  });
});

describe("Interactions", () => {
  const filterItem = jest.fn(() => true),
    getItemKey = jest.fn(),
    onItemPress = jest.fn(),
    renderItem = jest.fn(),
    value = "ANG",
    data = [
      {
        subjectId: "1475566-1517929209848",
        subjectCode: "ZIP-220700",
        subjectLabel: "ESSAI DE SYSTEMES"
      },
      {
        subjectId: "1475710-1517929209848",
        subjectCode: "ZIP-341700",
        subjectLabel: "VENTE(TP,PRESENTATION,EXPR.,COMPORTEMENT"
      },
      {
        subjectId: "1475847-1517929209848",
        subjectCode: "ZIP-308600",
        subjectLabel: "CHIMIE-BIOCHIMIE-SCIENCES DU VIVANT"
      }
    ];
  const rendered = shallow(
    <Autocomplete
      placeholder={placeholder}
      data={data}
      filterItem={filterItem}
      getItemKey={getItemKey}
      onItemPress={onItemPress}
      renderItem={renderItem}
    />
  );
  let itemList;

  test("On change text should trigger filter item props", () => {
    const inputText = rendered.find(InputText);
    const input = inputText.dive().find(TextInput);
    input.value = value;
    inputText.props().onChangeText(value);
    expect(filterItem).toHaveBeenCalled();
  });

  test("Search event should display 3 items", () => {
    rendered.update();
    itemList = rendered.find(ScrollView).children();
    expect(itemList.length).toEqual(3);
  });

  test("Choose autocomplete item should trigger on item press props function", () => {
    const item = itemList.first();
    item.simulate("press");
    expect(onItemPress).toHaveBeenCalled();
  });

  test("Autocomplete list should empty after item selection", () => {
    rendered.update();
    itemList = rendered.find(ScrollView).children();
    expect(itemList.length).toEqual(0);
  });
});

import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import PropTypes from "prop-types";

import Icon from "react-native-vector-icons/MaterialIcons";
import I18n from "../../api/I18n";

import Header from "../Header/Header";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import Autocomplete from "../Autocomplete/Autocomplete";
import SubjectBadge from "../SubjectBadge/SubjectBadge";

import { styleStrength, styleWeakness, styleStructure } from "./styles";
import { COLORS } from "../../styles/common";

export default class StrengthWeakness extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <Header
          navigation={navigation}
          headerStyle={
            navigation.state.routeName === "Strength"
              ? styleStrength.header
              : styleWeakness.header
          }
          noBack={navigation.state.params && navigation.state.params.noBack}
        >
          <View style={styleStructure.header}>
            <Icon
              style={styleStructure.title}
              name={
                navigation.state.routeName === "Strength"
                  ? "thumb-up"
                  : "thumb-down"
              }
            />
            <Text style={styleStructure.title}>
              {I18n.t(`${navigation.state.routeName.toLowerCase()}.title`)}
            </Text>
          </View>
        </Header>
      )
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      subjects:
        props.screenProps.profile[
          props.navigation.state.routeName === "Strength"
            ? "strengths"
            : "weaknesses"
        ] || []
    };
  }

  getRouteName() {
    return this.props.navigation.state.routeName;
  }

  chooseStrengthWeakness(strength, weakness) {
    return this.getRouteName() === "Strength" ? strength : weakness;
  }

  getProfileProperty() {
    return this.chooseStrengthWeakness("strengths", "weaknesses");
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styleStructure.container}>
          <Autocomplete
            placeholder="Choisissez les matières concernées"
            data={this.props.screenProps.subjects}
            getItemKey={item => item.subjectId}
            onItemPress={item => {
              let studentSubjects = [...this.state.subjects, item];
              this.setState({ subjects: studentSubjects });
            }}
            renderItem={subject => <Text>{subject.subjectLabel}</Text>}
            filterItem={(item, filter) =>
              item.subjectLabel.toLowerCase().includes(filter.toLowerCase()) &&
              !this.state.subjects.includes(item)
            }
          />

          <ScrollView
            contentContainerStyle={styleStructure.list}
            keyboardShouldPersistTaps="handled"
          >
            {this.state.subjects.map(subject => (
              <SubjectBadge
                key={subject.subjectId}
                onPress={() => {
                  let newState = this.state.subjects;
                  newState.splice(newState.indexOf(subject), 1);
                  this.setState({ subjects: newState });
                }}
                style={{
                  backgroundColor: this.chooseStrengthWeakness(
                    COLORS.PRIMARY,
                    COLORS.SECONDARY
                  )
                }}
                title={subject.subjectLabel}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styleStructure.buttonView}>
          <SecondaryButton
            onPress={() => {
              this.props.screenProps.onChangeScreen(
                this.getProfileProperty(),
                []
              );
              this.props.navigation.push(
                this.chooseStrengthWeakness("Weakness", "Availability")
              );
            }}
            title={I18n.t("skip")}
          />
          <SecondaryButton
            onPress={() => {
              this.props.screenProps.onChangeScreen(
                this.getProfileProperty(),
                this.state.subjects
              );
              this.props.navigation.push(
                this.chooseStrengthWeakness("Weakness", "Availability")
              );
            }}
            title={I18n.t("next")}
          />
        </View>
      </View>
    );
  }
}

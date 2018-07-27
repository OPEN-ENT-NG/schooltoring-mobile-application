import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import PropTypes from "prop-types";

import I18n from "../../api/I18n";

import { SecondaryButton } from "../SecondaryButton/SecondaryButton";
import Autocomplete from "../Autocomplete/Autocomplete";
import SubjectBadge from "../SubjectBadge/SubjectBadge";

import styles from "./styles";
import { COLORS } from "../../styles/common";

export default class StrengthWeakness extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects:
        props.profile[
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

  getSubjectsByIds(data) {
    return this.props.subjects.filter(({ subjectId }) =>
      data.find(({ subject_id }) => subject_id === subjectId)
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Autocomplete
            placeholder="Choisissez les matières concernées"
            data={this.props.subjects}
            getItemKey={item => item.subjectId}
            onItemPress={item => {
              let studentSubjects = [
                ...this.state.subjects,
                { subject_id: item.subjectId }
              ];
              this.setState({ subjects: studentSubjects });
            }}
            renderItem={subject => (
              <Text style={styles.subjectLabel}>{subject.subjectLabel}</Text>
            )}
            filterItem={(item, filter) =>
              item.subjectLabel.toLowerCase().includes(filter.toLowerCase()) &&
              !this.state.subjects.includes({ subject_id: item.subjectId })
            }
            underlineColor={this.chooseStrengthWeakness(
              COLORS.PRIMARY,
              COLORS.SECONDARY
            )}
          />

          <ScrollView
            contentContainerStyle={styles.list}
            keyboardShouldPersistTaps="handled"
          >
            {this.getSubjectsByIds(this.state.subjects).map(subject => (
              <SubjectBadge
                key={subject.subjectId}
                onPress={() => {
                  let newState = this.state.subjects;
                  newState.splice(
                    newState.indexOf({ subject_id: subject.subjectId }),
                    1
                  );
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
        <View style={styles.buttonView}>
          <SecondaryButton
            onPress={() => {
              this.props.onChangeScreen(this.getProfileProperty(), []);
              this.props.navigation.push(
                this.chooseStrengthWeakness("Weakness", "Availability")
              );
            }}
            title={I18n.t("skip")}
          />
          <SecondaryButton
            onPress={() => {
              this.props.onChangeScreen(
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

StrengthWeakness.propTypes = {
  navigation: PropTypes.object.isRequired,
  subjects: PropTypes.arrayOf(
    PropTypes.shape({
      subjectId: PropTypes.string,
      subjectLabel: PropTypes.string,
      subjectCode: PropTypes.string
    })
  ).isRequired,
  onChangeScreen: PropTypes.func.isRequired
};

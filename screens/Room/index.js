import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Card from "../../components/RoomCard";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateModal: false,
      date: new Date(),
    };
  }

  toggleDateModal = () => {
    this.setState({
      dateModal: !this.state.dateModal,
    });
  };

  handleConfirm = (date) => {
    this.setState({
      date: new Date(date),
      dateModal: !this.state.dateModal,
    });
  };

  render() {
    const { dateModal, date } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}> Star Light Resort </Text>
        <View style={styles.subHeaderContainer}>
          <Text style={styles.branchText}>SK branch</Text>
          <TouchableOpacity onPress={this.toggleDateModal}>
            <Text>Select Date</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.selectDateButton}>
          <Text>{date.toLocaleDateString()}</Text>
        </View>

        <View style={styles.cardContainer}>
          <Card navigation={this.props.navigation}></Card>
          <Card navigation={this.props.navigation}></Card>
          <Card navigation={this.props.navigation}></Card>
          <Card navigation={this.props.navigation}></Card>
          <Card navigation={this.props.navigation}></Card>
          <Card navigation={this.props.navigation}></Card>
        </View>

        {/* Modal */}
        <DateTimePickerModal
          isVisible={dateModal}
          mode="date"
          onConfirm={this.handleConfirm}
          onCancel={this.toggleDateModal}
          date={new Date()}
          isDarkModeEnabled={false}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  headerText: {
    fontWeight: "500",
    fontSize: 30,
  },
  subHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    paddingHorizontal: 7,
  },
  branchText: {
    fontSize: 14,
    color: "#6A0E00",
  },
  selectDateButton: {
    paddingHorizontal: 7,
    alignSelf: "flex-end",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
});

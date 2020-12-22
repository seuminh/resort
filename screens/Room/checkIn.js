import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Form, Item, Input, Label, Picker, Icon } from "native-base";

export default class checkIn extends Component {
  state = {
    checkInDateModal: false,
    checkOutDateModal: false,
    checkInDate: new Date(),
    checkOutDate: new Date(),
    paid: "paid",
  };

  toggleCheckInDateModal = () => {
    this.setState({
      checkInDateModal: !this.state.checkInDateModal,
    });
  };

  toggleCheckOutDateModal = () => {
    this.setState({
      checkOutDateModal: !this.state.checkOutDateModal,
    });
  };

  handleCheckInConfirm = (date) => {
    this.setState({
      checkInDate: new Date(date),
      checkInDateModal: !this.state.checkInDateModal,
    });
  };

  handleCheckOutConfirm = (date) => {
    this.setState({
      checkOutDate: new Date(date),
      checkOutDateModal: !this.state.checkOutDateModal,
    });
  };

  onValueChange = (value) => {
    this.setState({
      selected: value,
    });
  };

  render() {
    const {
      checkInDate,
      checkOutDate,
      checkInDateModal,
      checkOutDateModal,
      paid,
    } = this.state;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}> Star Light Resort </Text>
        <Text style={styles.branchText}>SK branch</Text>
        <View style={styles.bodyContainer}>
          <Text
            style={{
              fontSize: 20,
              //   borderBottomWidth: 1,
              //   borderBottomColor: "red",
              textAlign: "center",
            }}
          >
            Check In Form
          </Text>
          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>ID Number</Label>
              <Input />
            </Item>
            {/* Check In */}
            <View style={styles.checkInContainer}>
              <Text style={styles.biggerText}>Check in :</Text>
              <TouchableOpacity onPress={this.toggleCheckInDateModal}>
                <Text style={[styles.biggerText, { marginLeft: 32 }]}>
                  {checkInDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            </View>
            {/* Check Out */}
            <View style={styles.checkOutContainer}>
              <Text style={styles.biggerText}>Check out :</Text>
              <TouchableOpacity onPress={this.toggleCheckOutDateModal}>
                <Text style={[styles.biggerText, { marginLeft: 20 }]}>
                  {checkOutDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            </View>
            {/* Payment */}
            <View style={styles.paymentContainer}>
              <Text style={styles.biggerText}>Payment :</Text>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{
                  marginLeft: 17,
                  marginTop: -11,
                }}
                selectedValue={paid}
                onValueChange={this.onValueChange}
              >
                <Picker.Item label="Paid" value="paid" />
                <Picker.Item label="Not yet pay" value="notPaid" />
              </Picker>
            </View>
            {/* Room */}
            <View>
              <Text>Room</Text>
            </View>
          </Form>
        </View>

        {/* Modal */}
        <DateTimePickerModal
          isVisible={checkInDateModal}
          mode="date"
          onConfirm={this.handleCheckInConfirm}
          onCancel={this.toggleCheckInDateModal}
          date={new Date()}
          isDarkModeEnabled={false}
        />

        <DateTimePickerModal
          isVisible={checkOutDateModal}
          mode="date"
          onConfirm={this.handleCheckOutConfirm}
          onCancel={this.toggleCheckOutDateModal}
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
  biggerText: {
    fontSize: 17,
  },
  headerText: {
    fontWeight: "500",
    fontSize: 30,
  },
  branchText: {
    fontSize: 14,
    color: "#6A0E00",
    marginVertical: 8,
    paddingHorizontal: 7,
  },
  bodyContainer: {
    paddingHorizontal: 7,
    paddingTop: 8,
    marginVertical: 5,
    flex: 1,
  },
  checkInContainer: {
    flexDirection: "row",
    marginTop: 15,
    paddingLeft: 14,
  },
  checkOutContainer: {
    flexDirection: "row",
    paddingLeft: 14,
    marginTop: 13,
  },
  paymentContainer: {
    paddingLeft: 14,
    marginTop: 13,
    flexDirection: "row",
  },
});

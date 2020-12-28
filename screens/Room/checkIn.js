import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Form, Item, Input, Label, Picker, Icon } from "native-base";
import Unorderedlist from "react-native-unordered-list";
// import CheckBox from "@react-native-community/checkbox";
import { Checkbox } from "react-native-paper";

export default class checkIn extends Component {
  state = {
    checkInDateModal: false,
    checkOutDateModal: false,
    checkInDate: new Date(),
    checkOutDate: new Date(),
    paid: "paid",
    rooms: [
      {
        number: "101",
        status: "busy",
      },
      {
        number: "102",
        status: "available",
      },
      {
        number: "103",
        status: "reserved",
      },
      {
        number: "104",
        status: "available",
      },
    ],
  };

  componentDidMount() {
    this.getRooms();
  }

  getRooms = () => {
    const { rooms } = this.state;
    const filterRooms = rooms.map((room) => {
      if (room.status === "available") {
        return {
          ...room,
          selected: false,
          available: true,
        };
      }
      return {
        ...room,
        selected: false,
        available: false,
      };
    });
    this.setState({
      rooms: filterRooms,
    });
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

  onPaymentChange = (value) => {
    this.setState({
      paid: value,
    });
  };

  onCheckboxChange = (item, index) => {
    const { rooms } = this.state;
    const newRoomData = rooms.map((room) => {
      if (room.status !== "available") {
        return {
          ...room,
        };
      }
      if (room.number == item.number) {
        return {
          ...room,
          selected: !room.selected,
        };
      }
      return {
        ...room,
        selected: room.selected,
      };
    });
    this.setState({
      rooms: newRoomData,
    });
  };

  renderItem = ({ item, index }) => {
    let dotColor =
      item.status === "available"
        ? "#2CC990"
        : item.status === "busy"
        ? "#FC6042"
        : "#FCB941";
    return (
      <TouchableOpacity
        style={styles.roomList}
        onPress={() => this.onCheckboxChange(item, index)}
      >
        {/* <CheckBox
          style={styles.checkBox}
          disabled={false}
          value={true}
          onAnimationType="fill"
          offAnimationType="fade"
          boxType="square"
          onValueChange={() => this.onCheckboxChange(item, index)}
        /> */}
        <View style={{ flexDirection: "row" }}>
          <Checkbox
            disabled={!item.available ? true : false}
            status={!item.selected ? "checked" : "unchecked"}
            // onPress={() => this.onCheckboxChange(item, index)}
          />
          <Text style={[styles.biggerText, { paddingTop: 7 }]}>
            {item.number}
          </Text>
        </View>
        <Unorderedlist
          bulletUnicode={0x2022}
          color={dotColor}
          style={styles.dot}
        ></Unorderedlist>
      </TouchableOpacity>
    );
  };

  render() {
    const {
      checkInDate,
      checkOutDate,
      checkInDateModal,
      checkOutDateModal,
      paid,
      rooms,
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
            <Item floatingLabel>
              <Label>Phone Number</Label>
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
                onValueChange={this.onPaymentChange}
              >
                <Picker.Item label="Paid" value="paid" />
                <Picker.Item label="Not yet pay" value="notPaid" />
              </Picker>
            </View>
            {/* Room */}
            <View style={styles.roomContainer}>
              <Text style={styles.biggerText}>Room :</Text>
              <FlatList
                style={{ marginTop: -10, paddingLeft: 14 }}
                data={rooms}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.number}
              />
            </View>
          </Form>
          <TouchableOpacity>
            <Text>Check</Text>
          </TouchableOpacity>
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
  dot: {
    fontSize: 30,
    marginTop: -2,
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
    paddingBottom: 50,
  },
  checkInContainer: {
    flexDirection: "row",
    marginTop: 20,
    paddingLeft: 14,
  },
  checkOutContainer: {
    flexDirection: "row",
    paddingLeft: 14,
    marginTop: 20,
  },
  paymentContainer: {
    paddingLeft: 14,
    marginTop: 20,
    flexDirection: "row",
  },
  roomContainer: {
    marginTop: 10,
    paddingLeft: 14,
    flexDirection: "row",
  },
  roomList: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 3,
    backgroundColor: "white",
    borderRadius: 8,
    // elevation: 5,
    // shadowColor: "darkslateblue",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    marginVertical: 10,
    marginHorizontal: 5,
    justifyContent: "space-between",
  },
});

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
import { Checkbox } from "react-native-paper";

export default class checkIn extends Component {
  state = {
    checkInDateModal: false,
    checkOutDateModal: false,
    checkInDate: new Date(),
    checkOutDate: new Date(),
    loadingRooms: true,
    length: 1,
    paid: "paid",
    total: 0,
    rooms: [
      {
        number: "101",
        status: "busy",
        price: 20,
      },
      {
        number: "102",
        status: "available",
        price: 20,
      },
      {
        number: "103",
        status: "reserved",
        price: 20,
      },
      {
        number: "104",
        status: "available",
        price: 20,
      },
    ],
  };

  componentDidMount() {
    this.state.checkOutDate.setDate(this.state.checkInDate.getDate() + 1);
    this.fetchRooms();
    this.getFilterdRooms();
    this.calculateLength();
  }

  fetchRooms = () => {
    setTimeout(() => {
      this.setState({
        loadingRooms: false,
      });
    }, 500);
  };

  calculateLength = () => {
    const { checkInDate, checkOutDate } = this.state;
    var diffTime = checkOutDate.getTime() - checkInDate.getTime();
    var diffDay = diffTime / (1000 * 3600 * 24);
    if (Math.round(diffDay) <= 0) {
      this.setState({
        length: "Error",
      });
      return;
    }
    this.setState({
      length: Math.round(diffDay),
    });
  };

  getFilterdRooms = () => {
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
    this.setState(
      {
        checkInDate: new Date(date),
        checkInDateModal: !this.state.checkInDateModal,
      },
      () => {
        this.state.checkOutDate.setDate(this.state.checkInDate.getDate() + 1);
        this.calculateLength();
      }
    );
  };

  handleCheckOutConfirm = (date) => {
    this.setState(
      {
        checkOutDate: new Date(date),
        checkOutDateModal: !this.state.checkOutDateModal,
      },
      () => this.calculateLength()
    );
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
    let selectedRooms = newRoomData.filter((r) => {
      return r.selected === true;
    });
    let totalPrice = selectedRooms.reduce((acc, room) => {
      return acc + room.price;
    }, 0);
    this.setState({
      rooms: newRoomData,
      total: totalPrice,
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
        <View style={{ flexDirection: "row" }}>
          <Checkbox
            disabled={!item.available ? true : false}
            status={item.selected ? "checked" : "unchecked"}
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

  onPrint = () => {
    const { rooms } = this.state;
    let selectedRooms = rooms.filter((r) => {
      return r.selected === true;
    });
    if (selectedRooms.length === 0) alert("Please select any available room");
    console.log(selectedRooms);
  };

  onCheckIn = () => {
    alert("Check In");
  };

  render() {
    const {
      checkInDate,
      checkOutDate,
      checkInDateModal,
      checkOutDateModal,
      paid,
      rooms,
      length,
      loadingRooms,
      total,
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
              <Input keyboardType="numeric" />
            </Item>
            <Item floatingLabel>
              <Label>Number of Guest</Label>
              <Input keyboardType="numeric" />
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
            {/* Length */}
            <View style={styles.lengthContainer}>
              <Text style={styles.biggerText}>Length :</Text>
              <Text style={[styles.biggerText, { marginLeft: 47 }]}>
                {length}
              </Text>
            </View>
            {/* Total */}
            <View style={styles.totalContainer}>
              <Text style={styles.biggerText}>Total price :</Text>
              <Text style={[styles.biggerText, { marginLeft: 22 }]}>
                $ {total}
              </Text>
            </View>
            {/* Payment */}
            <View style={styles.paymentContainer}>
              <Text style={styles.biggerText}>Pay :</Text>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{
                  marginLeft: 57,
                  marginTop: -11,
                }}
                selectedValue={paid}
                onValueChange={this.onPaymentChange}
              >
                <Picker.Item label="Paid" value="paid" />
                <Picker.Item label="Not pay" value="notPaid" />
              </Picker>
            </View>
            {/* Room */}
            <View style={styles.roomContainer}>
              <Text style={styles.biggerText}>Room :</Text>
              {loadingRooms && (
                <ActivityIndicator
                  color="red"
                  size="large"
                  style={{ marginLeft: 50 }}
                ></ActivityIndicator>
              )}
              {!loadingRooms && (
                <FlatList
                  style={{ marginTop: -10, paddingLeft: 14 }}
                  data={rooms}
                  renderItem={this.renderItem}
                  keyExtractor={(item) => item.number}
                />
              )}
            </View>
          </Form>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity style={styles.btnPrint} onPress={this.onPrint}>
              <Text style={[styles.biggerText, { color: "#fff" }]}>Print</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnCheckIn}
              onPress={this.onCheckIn}
            >
              <Text style={[styles.biggerText, { color: "#fff" }]}>
                Check In
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal */}
        <DateTimePickerModal
          date={checkInDate}
          isVisible={checkInDateModal}
          mode="date"
          onConfirm={this.handleCheckInConfirm}
          onCancel={this.toggleCheckInDateModal}
          isDarkModeEnabled={false}
        />

        <DateTimePickerModal
          date={checkOutDate}
          isVisible={checkOutDateModal}
          mode="date"
          onConfirm={this.handleCheckOutConfirm}
          onCancel={this.toggleCheckOutDateModal}
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
  lengthContainer: {
    flexDirection: "row",
    paddingLeft: 14,
    marginTop: 20,
  },
  totalContainer: {
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
  btnPrint: {
    padding: 10,
    backgroundColor: "darkslateblue",
    alignSelf: "center",
    marginTop: 20,
    paddingHorizontal: 60,
  },
  btnCheckIn: {
    padding: 10,
    backgroundColor: "darkslateblue",
    alignSelf: "center",
    marginTop: 20,
    paddingHorizontal: 45,
  },
});

import React, { Component, useState, useEffect } from "react";
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
import { useQuery } from "react-query";
import { useAuthState } from "../../../context";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Form, Item, Input, Label, Picker, Icon } from "native-base";
import Unorderedlist from "react-native-unordered-list";
import {
  Checkbox,
  Portal,
  Provider,
  Dialog,
  Button,
  DefaultTheme,
} from "react-native-paper";

import * as Print from "expo-print";
import checkIn from "../Booking/checkIn";

// export default class checkIn extends Component {
//    state = {
//       checkInDateModal: false,
//       checkOutDateModal: false,
//       overlayLoading: false,
//       checkInDate: new Date(),
//       checkOutDate: new Date(),
//       loadingRooms: true,
//       length: 1,
//       paid: "notPaid",
//       total: 0,
//       action: "",
//       dialog: false,
//       checkInInfo: {},
//       rooms: [
// {
//    number: "101",
//    status: "busy",
//    price: 20,
// },
// {
//    number: "102",
//    status: "available",
//    price: 20,
// },
// {
//    number: "103",
//    status: "reserved",
//    price: 20,
// },
// {
//    number: "104",
//    status: "available",
//    price: 20,
// },
//       ],
//    };

//    componentDidMount() {
//       this.state.checkOutDate.setDate(this.state.checkInDate.getDate() + 1);
//       this.fetchRooms();
//       this.getFilterdRooms();
//       this.calculateLength();
//    }

//    fetchRooms = () => {
//       setTimeout(() => {
//          this.setState({
//             loadingRooms: false,
//          });
//       }, 500);
//    };

// calculateLength = () => {
//    const { checkInDate, checkOutDate } = this.state;
//    var diffTime = checkOutDate.getTime() - checkInDate.getTime();
//    var diffDay = diffTime / (1000 * 3600 * 24);
//    if (Math.round(diffDay) <= 0) {
//       this.setState({
//          length: "Error",
//       });
//       return;
//    }
//    this.setState({
//       length: Math.round(diffDay),
//    });
// };

// getFilterdRooms = () => {
//    const { rooms } = this.state;
//    const filterRooms = rooms.map((room) => {
//       if (room.status === "available") {
//          return {
//             ...room,
//             selected: false,
//             available: true,
//          };
//       }
//       return {
//          ...room,
//          selected: false,
//          available: false,
//       };
//    });
//    this.setState({
//       rooms: filterRooms,
//    });
// };

//    toggleCheckInDateModal = () => {
//       this.setState({
//          checkInDateModal: !this.state.checkInDateModal,
//       });
//    };

//    toggleCheckOutDateModal = () => {
//       this.setState({
//          checkOutDateModal: !this.state.checkOutDateModal,
//       });
//    };

//    handleCheckInConfirm = (date) => {
//       this.setState(
//          {
//             total: 0,
//             loadingRooms: true,
//             checkInDate: new Date(date),
//             checkInDateModal: !this.state.checkInDateModal,
//          },
//          () => {
//             this.fetchRooms();
//             this.state.checkOutDate.setDate(
//                this.state.checkInDate.getDate() + 1
//             );
//             this.calculateLength();
//          }
//       );
//    };

//    handleCheckOutConfirm = (date) => {
//       this.setState(
//          {
//             total: 0,
//             loadingRooms: true,
//             checkOutDate: new Date(date),
//             checkOutDateModal: !this.state.checkOutDateModal,
//          },
//          () => {
//             this.fetchRooms();
//             this.calculateLength();
//          }
//       );
//    };

//    onPaymentChange = (value) => {
//       this.setState({
//          paid: value,
//       });
//    };

// onCheckboxChange = (item, index) => {
//    const { rooms } = this.state;
//    const newRoomData = rooms.map((room) => {
//       if (room.status !== "available") {
//          return {
//             ...room,
//          };
//       }
//       if (room.number == item.number) {
//          return {
//             ...room,
//             selected: !room.selected,
//          };
//       }
//       return {
//          ...room,
//          selected: room.selected,
//       };
//    });
//    let selectedRooms = newRoomData.filter((r) => {
//       return r.selected === true;
//    });
//    let totalPrice = selectedRooms.reduce((acc, room) => {
//       return acc + room.price;
//    }, 0);
//    totalPrice *= this.state.length;
//    this.setState({
//       rooms: newRoomData,
//       total: totalPrice,
//    });
// };

// renderItem = ({ item, index }) => {
//    let dotColor =
//       item.status === "available"
//          ? "#2CC990"
//          : item.status === "busy"
//          ? "#FC6042"
//          : "#FCB941";
//    return (
//       <TouchableOpacity
//          key={index}
//          style={styles.roomList}
//          onPress={() => this.onCheckboxChange(item, index)}
//       >
//          <View style={{ flexDirection: "row" }}>
//             <Checkbox
//                disabled={!item.available ? true : false}
//                status={item.selected ? "checked" : "unchecked"}
//                // onPress={() => this.onCheckboxChange(item, index)}
//             />
//             <Text style={[styles.biggerText, { paddingTop: 7 }]}>
//                {item.number}
//             </Text>
//          </View>
//          <Unorderedlist
//             bulletUnicode={0x2022}
//             color={dotColor}
//             style={styles.dot}
//          ></Unorderedlist>
//       </TouchableOpacity>
//    );
// };

// onPrint = () => {
//    const { rooms, checkInInfo } = this.state;
//    // let selectedRooms = rooms.filter((r) => {
//    //    return r.selected === true;
//    // });
//    let selectedRooms = [];
//    rooms.map((r) => {
//       if (r.selected) selectedRooms.push(r.number);
//    });
//    if (selectedRooms.length === 0) alert("Please select any available room");
//    else {
//       checkInInfo.checkInDate = this.state.checkInDate.toLocaleDateString();
//       checkInInfo.checkOutDate = this.state.checkOutDate.toLocaleDateString();
//       checkInInfo.length = this.state.length;
//       checkInInfo.total = this.state.total;
//       if (this.state.paid === "paid")
//          checkInInfo.deposit = checkInInfo.total;
//       else checkInInfo.deposit = 0;
//       checkInInfo.rooms = selectedRooms;
//       console.log(checkInInfo);
//       Print.printAsync({
//          uri: "https://graduateland.com/api/v2/users/jesper/cv",
//       });
//    }
// };

//    onCheckIn = () => {
//       alert("Check In");
//       this.setState({
//          dialog: false,
//          action: "",
//       });
//    };

//    onClear = () => {
//       alert("Clear");
//       this.setState({
//          action: "",
//          dialog: false,
//          checkInInfo: {},
//       });
//    };

// onProceed = () => {
//    if (this.state.action === "clear") this.onClear();
//    else this.onCheckIn();
// };

// onHandleChangeText = (value, nameInput) => {
//    this.setState({
//       checkInInfo: {
//          ...this.state.checkInInfo,
//          [nameInput]: value,
//       },
//    });
// };

//    render() {
//       const {
//          checkInDate,
//          checkOutDate,
//          checkInDateModal,
//          checkOutDateModal,
//          paid,
//          rooms,
//          length,
//          loadingRooms,
//          total,
//          overlayLoading,
//          dialog,
//          checkInInfo,
//       } = this.state;
// const theme = {
//    ...DefaultTheme,
// };
//       return (
// <Provider theme={theme}>
//    <ScrollView style={styles.container}>
//       <Text style={styles.headerText}> Star Light Resort </Text>
//       <Text style={styles.branchText}>SK branch</Text>
//       <View style={styles.bodyContainer}>
//          <Text
//             style={{
//                fontSize: 20,
//                //   borderBottomWidth: 1,
//                //   borderBottomColor: "red",
//                textAlign: "center",
//             }}
//          >
//             Check In Form
//          </Text>
//          <Form>
//             <Item floatingLabel>
//                <Label>Name</Label>
//                <Input
//                   value={checkInInfo.name}
//                   onChangeText={(value) =>
//                      this.onHandleChangeText(value, "name")
//                   }
//                />
//             </Item>
//             <Item floatingLabel>
//                <Label>ID Number</Label>
//                <Input
//                   keyboardType="numeric"
//                   value={checkInInfo.id}
//                   onChangeText={(value) =>
//                      this.onHandleChangeText(value, "id")
//                   }
//                />
//             </Item>
//             <Item floatingLabel>
//                <Label>Phone Number</Label>
//                <Input
//                   keyboardType="numeric"
//                   value={checkInInfo.phone}
//                   onChangeText={(value) =>
//                      this.onHandleChangeText(value, "phone")
//                   }
//                />
//             </Item>
//             <Item floatingLabel last>
//                <Label>Number of Guest</Label>
//                <Input
//                   keyboardType="numeric"
//                   value={checkInInfo.person}
//                   onChangeText={(value) =>
//                      this.onHandleChangeText(value, "person")
//                   }
//                />
//             </Item>
//             {/* Check In */}
//             <View style={styles.checkInContainer}>
//                <Text style={[styles.biggerText, { flex: 1 }]}>
//                   Check in :
//                </Text>
//                <TouchableOpacity
//                   onPress={this.toggleCheckInDateModal}
//                   style={{ flex: 2 }}
//                >
//                   <Text style={[styles.biggerText]}>
//                      {checkInDate.toLocaleDateString()}
//                   </Text>
//                </TouchableOpacity>
//             </View>
//             {/* Check Out */}
//             <View style={styles.checkOutContainer}>
//                <Text style={[styles.biggerText, { flex: 1 }]}>
//                   Check out :
//                </Text>
//                <TouchableOpacity
//                   onPress={this.toggleCheckOutDateModal}
//                   style={{ flex: 2 }}
//                >
//                   <Text style={[styles.biggerText]}>
//                      {checkOutDate.toLocaleDateString()}
//                   </Text>
//                </TouchableOpacity>
//             </View>
//             {/* Length */}
//             <View style={styles.lengthContainer}>
//                <Text style={[styles.biggerText, { flex: 1 }]}>
//                   Length :
//                </Text>
//                <Text style={[styles.biggerText, { flex: 2 }]}>
//                   {length}
//                </Text>
//             </View>
//             {/* Total */}
//             <View style={styles.totalContainer}>
//                <Text style={[styles.biggerText, { flex: 1 }]}>
//                   Total price :
//                </Text>
//                <Text style={[styles.biggerText, { flex: 2 }]}>
//                   $ {total}
//                </Text>
//             </View>
//             {/* Payment */}
//             <View style={styles.paymentContainer}>
//                <Text style={[styles.biggerText, { flex: 1 }]}>
//                   Pay :
//                </Text>
//                <View style={{ flex: 2 }}>
//                   <Picker
//                      mode="dropdown"
//                      iosIcon={<Icon name="arrow-down" />}
//                      style={{
//                         marginTop: -11,
//                         marginLeft: -15,
//                      }}
//                      selectedValue={paid}
//                      onValueChange={this.onPaymentChange}
//                   >
//                      <Picker.Item label="Paid" value="paid" />
//                      <Picker.Item label="Not pay" value="notPaid" />
//                   </Picker>
//                </View>
//             </View>
//             {/* Room */}
//             <View style={styles.roomContainer}>
//                <Text style={styles.biggerText}>Room :</Text>
//                {loadingRooms && (
//                   <ActivityIndicator
//                      color="red"
//                      size="large"
//                      style={{ marginLeft: 50 }}
//                   ></ActivityIndicator>
//                )}
//                {!loadingRooms && (
//                   <FlatList
//                      style={{ marginTop: -10, paddingLeft: 14 }}
//                      data={rooms}
//                      renderItem={this.renderItem}
//                      keyExtractor={(item) => item.number}
//                   />
//                )}
//             </View>
//          </Form>
//          <View
//             style={{
//                flexDirection: "row",
//                justifyContent: "space-around",
//                marginTop: 20,
//             }}
//          >
//             <Button
//                onPress={() =>
//                   this.setState({
//                      action: "clear",
//                      dialog: true,
//                   })
//                }
//                uppercase={false}
//                mode="outlined"
//                color="#D9534F"
//                style={{ borderColor: "#D9534F", borderWidth: 1 }}
//             >
//                Clear
//             </Button>
//             <Button
//                mode="outlined"
//                onPress={this.onPrint}
//                uppercase={false}
//                color="#0275D8"
//                style={{ borderColor: "#0275D8", borderWidth: 1 }}
//             >
//                Print
//             </Button>
//             <Button
//                mode="outlined"
//                onPress={() =>
//                   this.setState({
//                      action: "checkIn",
//                      dialog: true,
//                   })
//                }
//                uppercase={false}
//                style={{ borderWidth: 1, borderColor: "#AA75F6" }}
//             >
//                Check In
//             </Button>
//          </View>
//       </View>

//       {/* Dialog */}
//       <Portal>
//          <Dialog
//             visible={dialog}
//             onDismiss={() =>
//                this.setState({ dialog: false, action: "" })
//             }
//          >
//             <Dialog.Content>
//                <Text>Are you sure you want to proceed?</Text>
//             </Dialog.Content>
//             <Dialog.Actions style={{ marginTop: -20 }}>
//                <Button
//                   onPress={() =>
//                      this.setState({ dialog: false, action: "" })
//                   }
//                   uppercase={false}
//                >
//                   Cancel
//                </Button>
//                <Button onPress={this.onProceed} uppercase={false}>
//                   Confirm
//                </Button>
//             </Dialog.Actions>
//          </Dialog>
//       </Portal>

//       {/* OverLay Loading */}
//       <Portal>
//          <Dialog
//             visible={overlayLoading}
//             dismissable={false}
//             style={{ backgroundColor: "transparent", elevation: 0 }}
//          >
//             <ActivityIndicator
//                size="large"
//                color="red"
//             ></ActivityIndicator>
//          </Dialog>
//       </Portal>

//       {/* Modal */}
//       <DateTimePickerModal
//          date={checkInDate}
//          isVisible={checkInDateModal}
//          mode="date"
//          onConfirm={this.handleCheckInConfirm}
//          onCancel={this.toggleCheckInDateModal}
//          isDarkModeEnabled={false}
//       />

//       <DateTimePickerModal
//          date={checkOutDate}
//          isVisible={checkOutDateModal}
//          mode="date"
//          onConfirm={this.handleCheckOutConfirm}
//          onCancel={this.toggleCheckOutDateModal}
//          isDarkModeEnabled={false}
//       />
//    </ScrollView>
// </Provider>
//       );
//    }
// }

const theme = {
  ...DefaultTheme,
};

const index = ({ navigation }) => {
  //   console.log({ room: navigation.getParam("rooms") });
  const [checkInDateModal, setCheckInDateModal] = useState(false);
  const [checkOutDateModal, setCheckOutDateModal] = useState(false);
  const [overlayLoading, setOverlayLoading] = useState(false);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(
    new Date(new Date().setDate(checkInDate.getDate() + 1))
  );
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [length, setLength] = useState(0);
  const [paid, setPaid] = useState("notPaid");
  const [total, setTotal] = useState(0);
  const [action, setAction] = useState("");
  const [dialog, setDialog] = useState(false);
  const [checkInInfo, setCheckInInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const authState = useAuthState();

  const { status, data } = useQuery(
    ["rooms", checkOutDate, checkInDate],
    () => {
      setLoadingRooms(true);

      return fetch(
        `http://10.0.2.2:5000/api/v1/rooms/belong?startDate=${checkInDate.toLocaleDateString()}&endDate=${checkOutDate.toLocaleDateString()}`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setLoadingRooms(false);
          setRooms(data);
          return data;
        });
    }
  );
  console.log(data);

  useEffect(() => {
    // setCheckOutDate(checkOutDate.setDate(checkInDate.getDate() + 1));
    //  checkOutDate.setDate(checkInDate.getDate() + 1);
    //  fetchRooms();
    //   getFilterdRooms();
    calculateLength();
  }, []);

  useEffect(() => {
    calculateLength();
  }, [checkOutDate, checkInDate]);

  const fetchRooms = () => {
    setTimeout(() => {
      setLoadingRooms(false);
    }, 500);
  };

  //  const getFilterdRooms = () => {
  //    const filterRooms = rooms.map((room) => {
  //      if (room.status === "available") {
  //        return {
  //          ...room,
  //          selected: false,
  //          available: true,
  //        };
  //      }
  //      return {
  //        ...room,
  //        selected: false,
  //        available: false,
  //      };
  //    });
  //    setRooms(filterRooms);
  //  };

  const calculateLength = () => {
    var diffTime = checkOutDate.getTime() - checkInDate.getTime();
    var diffDay = diffTime / (1000 * 3600 * 24);
    if (Math.round(diffDay) <= 0) {
      setLength("Error");
      return;
    }
    setLength(Math.round(diffDay));
  };

  const handleCheckInConfirm = (date) => {
    setCheckInDate(date);
    checkOutDate.setDate(date.getDate() + 1);
    setCheckInDateModal(false);
    setTotal(0);
    setLoadingRooms(true);
    fetchRooms();
  };

  const handleCheckOutConfirm = (date) => {
    setCheckOutDateModal(false);
    setCheckOutDate(date);
    setTotal(0);
    setLoadingRooms(true);
    fetchRooms();
  };

  const onCheckboxChange = (item, index) => {
    console.log(item);
    const newRoomData = rooms.map((room) => {
      if (!room.selected) {
        room.selected = false;
      }
      if (room.reservation.length > 0) {
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
    totalPrice *= length;
    setRooms(newRoomData);
    setTotal(totalPrice);
  };

  const renderItem = ({ item, index }) => {
    let status = "available";
    if (item.reservation.length > 0) {
      status = item.reservation[0].status;
    }
    let dotColor =
      status === "available" || status === "checkOut"
        ? "#2CC990"
        : status === "checkIn"
        ? "#FC6042"
        : "#FCB941";
    return (
      <TouchableOpacity
        key={index}
        style={styles.roomList}
        onPress={() => onCheckboxChange(item, index)}
      >
        <View style={{ flexDirection: "row" }}>
          <Checkbox
            disabled={!status === "available" ? true : false}
            status={item.selected ? "checked" : "unchecked"}
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

  const onPrint = () => {
    let selectedRooms = [];
    rooms.map((r) => {
      if (r.selected) selectedRooms.push(r.number);
    });
    if (selectedRooms.length === 0) alert("Please select any available room");
    else {
      checkInInfo.checkInDate = checkInDate.toLocaleDateString();
      checkInInfo.checkOutDate = checkOutDate.toLocaleDateString();
      checkInInfo.length = length;
      checkInInfo.total = total;
      if (paid === "paid") checkInInfo.deposit = checkInInfo.total;
      else checkInInfo.deposit = 0;
      checkInInfo.rooms = selectedRooms;
      console.log(checkInInfo);
      Print.printAsync({
        uri: "https://graduateland.com/api/v2/users/jesper/cv",
      });
    }
  };

  const onCheckIn = () => {
    alert("Check In");
    setDialog(false);
    setAction("");
  };

  const onClear = () => {
    alert("Clear");
    setAction("");
    setDialog(false);
    setCheckInInfo({});
  };

  const onProceed = () => {
    if (action === "clear") onClear();
    else onCheckIn();
  };

  const onHandleChangeText = (value, nameInput) => {
    setCheckInInfo({
      ...checkInInfo,
      [nameInput]: value,
    });
  };

  return (
    <Provider theme={theme}>
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}> Star Light Resort </Text>
        <Text style={styles.branchText}>SK branch</Text>
        <View style={styles.bodyContainer}>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Check In Form
          </Text>
          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input
                value={checkInInfo.name}
                onChangeText={(value) => onHandleChangeText(value, "name")}
              />
            </Item>
            <Item floatingLabel>
              <Label>ID Number</Label>
              <Input
                keyboardType="numeric"
                value={checkInInfo.id}
                onChangeText={(value) => onHandleChangeText(value, "id")}
              />
            </Item>
            <Item floatingLabel>
              <Label>Phone Number</Label>
              <Input
                keyboardType="numeric"
                value={checkInInfo.phone}
                onChangeText={(value) => onHandleChangeText(value, "phone")}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Number of Guest</Label>
              <Input
                keyboardType="numeric"
                value={checkInInfo.person}
                onChangeText={(value) => onHandleChangeText(value, "person")}
              />
            </Item>
            {/* Check In */}
            <View style={styles.checkInContainer}>
              <Text style={[styles.biggerText, { flex: 1 }]}>Check in :</Text>
              <TouchableOpacity
                onPress={() => setCheckInDateModal(true)}
                style={{ flex: 2 }}
              >
                <Text style={[styles.biggerText]}>
                  {checkInDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            </View>
            {/* Check Out */}
            <View style={styles.checkOutContainer}>
              <Text style={[styles.biggerText, { flex: 1 }]}>Check out :</Text>
              <TouchableOpacity
                onPress={() => setCheckOutDateModal(true)}
                style={{ flex: 2 }}
              >
                <Text style={[styles.biggerText]}>
                  {checkOutDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            </View>
            {/* Length */}
            <View style={styles.lengthContainer}>
              <Text style={[styles.biggerText, { flex: 1 }]}>Length :</Text>
              <Text style={[styles.biggerText, { flex: 2 }]}>{length}</Text>
            </View>
            {/* Total */}
            <View style={styles.totalContainer}>
              <Text style={[styles.biggerText, { flex: 1 }]}>
                Total price :
              </Text>
              <Text style={[styles.biggerText, { flex: 2 }]}>$ {total}</Text>
            </View>
            {/* Payment */}
            <View style={styles.paymentContainer}>
              <Text style={[styles.biggerText, { flex: 1 }]}>Pay :</Text>
              <View style={{ flex: 2 }}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{
                    marginTop: -11,
                    marginLeft: -15,
                  }}
                  selectedValue={paid}
                  onValueChange={(value) => setPaid(value)}
                >
                  <Picker.Item label="Paid" value="paid" />
                  <Picker.Item label="Not pay" value="notPaid" />
                </Picker>
              </View>
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
                  renderItem={renderItem}
                  keyExtractor={(item) => item.number}
                />
              )}
            </View>
          </Form>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 20,
            }}
          >
            <Button
              onPress={() => {
                setAction("clear");
                setDialog(true);
              }}
              uppercase={false}
              mode="outlined"
              color="#D9534F"
              style={{ borderColor: "#D9534F", borderWidth: 1 }}
            >
              Clear
            </Button>
            <Button
              mode="outlined"
              onPress={onPrint}
              uppercase={false}
              color="#0275D8"
              style={{ borderColor: "#0275D8", borderWidth: 1 }}
            >
              Print
            </Button>
            <Button
              mode="outlined"
              onPress={() => {
                setAction("checkIn");
                setDialog(true);
              }}
              uppercase={false}
              style={{ borderWidth: 1, borderColor: "#AA75F6" }}
            >
              Check In
            </Button>
          </View>
        </View>

        {/* Dialog */}
        <Portal>
          <Dialog
            visible={dialog}
            onDismiss={() => {
              setDialog(false);
              setAction("");
            }}
          >
            <Dialog.Content>
              <Text>Are you sure you want to proceed?</Text>
            </Dialog.Content>
            <Dialog.Actions style={{ marginTop: -20 }}>
              <Button
                onPress={() => {
                  setDialog(false);
                  setAction("");
                }}
                uppercase={false}
              >
                Cancel
              </Button>
              <Button onPress={onProceed} uppercase={false}>
                Confirm
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        {/* OverLay Loading */}
        <Portal>
          <Dialog
            visible={overlayLoading}
            dismissable={false}
            style={{ backgroundColor: "transparent", elevation: 0 }}
          >
            <ActivityIndicator size="large" color="red"></ActivityIndicator>
          </Dialog>
        </Portal>

        {/* Modal */}
        <DateTimePickerModal
          date={checkInDate}
          isVisible={checkInDateModal}
          mode="date"
          onConfirm={handleCheckInConfirm}
          onCancel={() => setCheckInDateModal(false)}
          isDarkModeEnabled={false}
        />

        <DateTimePickerModal
          date={checkOutDate}
          isVisible={checkOutDateModal}
          mode="date"
          onConfirm={handleCheckOutConfirm}
          onCancel={() => setCheckOutDateModal(false)}
          isDarkModeEnabled={false}
        />
      </ScrollView>
    </Provider>
  );
};

export default index;

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

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

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Form, Item, Input, Label, Picker, Icon } from "native-base";
import Unorderedlist from "react-native-unordered-list";
import {
  Checkbox,
  Button,
  Portal,
  Provider,
  Dialog,
  DefaultTheme,
} from "react-native-paper";
import { useTheme } from "react-navigation";

// export default class AddBooking extends Component {
//   state = {
//     checkInDateModal: false,
//     checkOutDateModal: false,
//     checkInDate: new Date(),
//     checkOutDate: new Date(),
//     loadingRooms: true,
//     length: 1,
//     dialog: false,
//     overLoading: false,
//     rooms: [
// {
//   number: "101",
//   status: "busy",
// },
// {
//   number: "102",
//   status: "available",
// },
// {
//   number: "103",
//   status: "reserved",
// },
// {
//   number: "104",
//   status: "available",
// },
//     ],
//     bookingInfo: {},
//   };

//   componentDidMount() {
//     this.state.checkOutDate.setDate(this.state.checkInDate.getDate() + 1);
//     this.fetchRooms();
//     this.getFilterdRooms();
//     this.calculateLength();
//   }

//   fetchRooms = () => {
//     setTimeout(() => {
//       this.setState({
//         loadingRooms: false,
//       });
//     }, 500);
//   };

//   calculateLength = () => {
//     const { checkInDate, checkOutDate } = this.state;
//     var diffTime = checkOutDate.getTime() - checkInDate.getTime();
//     var diffDay = diffTime / (1000 * 3600 * 24);
//     if (Math.round(diffDay) <= 0) {
//       this.setState({
//         length: "Error",
//       });
//       return;
//     }
//     this.setState({
//       length: Math.round(diffDay),
//     });
//   };

//   getFilterdRooms = () => {
//     const { rooms } = this.state;
//     const filterRooms = rooms.map((room) => {
//       if (room.status === "available") {
//         return {
//           ...room,
//           selected: false,
//           available: true,
//         };
//       }
//       return {
//         ...room,
//         selected: false,
//         available: false,
//       };
//     });
//     this.setState({
//       rooms: filterRooms,
//     });
//   };

//   toggleCheckInDateModal = () => {
//     this.setState({
//       checkInDateModal: !this.state.checkInDateModal,
//     });
//   };

//   toggleCheckOutDateModal = () => {
//     this.setState({
//       checkOutDateModal: !this.state.checkOutDateModal,
//     });
//   };

//   handleCheckInConfirm = (date) => {
//     this.setState(
//       {
//         loadingRooms: true,
//         checkInDate: new Date(date),
//         checkInDateModal: !this.state.checkInDateModal,
//       },
//       () => {
//         this.fetchRooms();
//         this.state.checkOutDate.setDate(this.state.checkInDate.getDate() + 1);
//         this.calculateLength();
//       }
//     );
//   };

//   handleCheckOutConfirm = (date) => {
//     this.setState(
//       {
//         loadingRooms: true,
//         checkOutDate: new Date(date),
//         checkOutDateModal: !this.state.checkOutDateModal,
//       },
//       () => {
//         this.fetchRooms();
//         this.calculateLength();
//       }
//     );
//   };

//   onCheckboxChange = (item, index) => {
//     const { rooms } = this.state;
//     const newRoomData = rooms.map((room) => {
//       if (room.status !== "available") {
//         return {
//           ...room,
//         };
//       }
//       if (room.number == item.number) {
//         return {
//           ...room,
//           selected: !room.selected,
//         };
//       }
//       return {
//         ...room,
//         selected: room.selected,
//       };
//     });
//     this.setState({
//       rooms: newRoomData,
//     });
//   };

//   renderItem = ({ item, index }) => {
//     let dotColor =
//       item.status === "available"
//         ? "#2CC990"
//         : item.status === "busy"
//         ? "#FC6042"
//         : "#FCB941";
//     return (
//       <TouchableOpacity
//         style={styles.roomList}
//         onPress={() => this.onCheckboxChange(item, index)}
//       >
//         <View style={{ flexDirection: "row" }}>
//           <Checkbox
//             disabled={!item.available ? true : false}
//             status={item.selected ? "checked" : "unchecked"}
//             // onPress={() => this.onCheckboxChange(item, index)}
//           />
//           <Text style={[styles.biggerText, { paddingTop: 7 }]}>
//             {item.number}
//           </Text>
//         </View>
//         <Unorderedlist
//           bulletUnicode={0x2022}
//           color={dotColor}
//           style={styles.dot}
//         ></Unorderedlist>
//       </TouchableOpacity>
//     );
//   };

//   onAddBooking = () => {
//     const { rooms, bookingInfo } = this.state;
//     let selectedRooms = [];
//     rooms.map((r) => {
//       if (r.selected) selectedRooms.push(r.number);
//     });
//     if (selectedRooms.length === 0) {
//       alert("Please select any available room");
//       this.setState({
//         dialog: false,
//       });
//     } else {
//       this.setState({
//         overlayLoading: true,
//         dialog: false,
//       });
//       bookingInfo.checkInDate = this.state.checkInDate.toLocaleDateString();
//       bookingInfo.checkOutDate = this.state.checkOutDate.toLocaleDateString();
//       bookingInfo.length = this.state.length;
//       bookingInfo.rooms = selectedRooms;
//       console.log(bookingInfo);
//     }
//   };

//   onHandleChangeText = (value, nameInput) => {
//     this.setState({
//       bookingInfo: {
//         ...this.state.bookingInfo,
//         [nameInput]: value,
//       },
//     });
//   };

//   render() {
//     const {
//       checkInDate,
//       checkOutDate,
//       checkInDateModal,
//       checkOutDateModal,
//       rooms,
//       length,
//       loadingRooms,
//       bookingInfo,
//       dialog,
//       overlayLoading,
//     } = this.state;
//  const theme = {
//    ...DefaultTheme,
//  };
//     return (
// <Provider theme={theme}>
//   <ScrollView style={styles.container}>
//     <Text style={styles.headerText}> Star Light Resort </Text>
//     <Text style={styles.branchText}>SK branch</Text>
//     <View style={styles.bodyContainer}>
//       <Text
//         style={{
//           fontSize: 20,
//           textAlign: "center",
//         }}
//       >
//         Booking Form
//       </Text>
//       <Form>
//         <Item floatingLabel>
//           <Label>Name</Label>
//           <Input
//             value={bookingInfo.name}
//             onChangeText={(value) =>
//               this.onHandleChangeText(value, "name")
//             }
//           />
//         </Item>
//         <Item floatingLabel>
//           <Label>Phone Number</Label>
//           <Input
//             keyboardType="numeric"
//             value={bookingInfo.phone}
//             onChangeText={(value) =>
//               this.onHandleChangeText(value, "phone")
//             }
//           />
//         </Item>
//         {/* Check In */}
//         <View style={styles.checkInContainer}>
//           <Text style={[styles.biggerText, { flex: 1 }]}>Check in :</Text>
//           <TouchableOpacity
//             onPress={this.toggleCheckInDateModal}
//             style={{ flex: 2 }}
//           >
//             <Text style={[styles.biggerText]}>
//               {checkInDate.toLocaleDateString()}
//             </Text>
//           </TouchableOpacity>
//         </View>
//         {/* Check Out */}
//         <View style={styles.checkOutContainer}>
//           <Text style={[styles.biggerText, { flex: 1 }]}>
//             Check out :
//           </Text>
//           <TouchableOpacity
//             onPress={this.toggleCheckOutDateModal}
//             style={{ flex: 2 }}
//           >
//             <Text style={[styles.biggerText]}>
//               {checkOutDate.toLocaleDateString()}
//             </Text>
//           </TouchableOpacity>
//         </View>
//         {/* Length */}
//         <View style={styles.lengthContainer}>
//           <Text style={[styles.biggerText, { flex: 1 }]}>Length :</Text>
//           <Text style={[styles.biggerText, { flex: 2 }]}>{length}</Text>
//         </View>
//         {/* Room */}
//         <View style={styles.roomContainer}>
//           <Text style={[styles.biggerText]}>Room :</Text>
//           {loadingRooms && (
//             <ActivityIndicator
//               color="red"
//               size="large"
//               style={{ marginLeft: 50 }}
//             ></ActivityIndicator>
//           )}
//           {!loadingRooms && (
//             <FlatList
//               style={{ marginTop: -10, paddingLeft: 14 }}
//               data={rooms}
//               renderItem={this.renderItem}
//               keyExtractor={(item) => item.number}
//             />
//           )}
//         </View>
//       </Form>
//       <Button
//         mode="outlined"
//         onPress={() =>
//           this.setState({
//             dialog: true,
//           })
//         }
//         uppercase={false}
//         style={{
//           borderColor: "#AA75F6",
//           borderWidth: 1,
//           alignSelf: "center",
//           marginTop: 20,
//         }}
//       >
//         Add Booking
//       </Button>
//     </View>

//     {/* Dialog */}
//     <Portal>
//       <Dialog
//         visible={dialog}
//         onDismiss={() => this.setState({ dialog: false })}
//       >
//         <Dialog.Content>
//           <Text>Are you sure you want to proceed?</Text>
//         </Dialog.Content>
//         <Dialog.Actions style={{ marginTop: -20 }}>
//           <Button
//             onPress={() => this.setState({ dialog: false })}
//             uppercase={false}
//           >
//             Cancel
//           </Button>
//           <Button onPress={this.onAddBooking} uppercase={false}>
//             Confirm
//           </Button>
//         </Dialog.Actions>
//       </Dialog>
//     </Portal>

//     {/* OverLay Loading */}
//     <Portal>
//       <Dialog
//         visible={overlayLoading}
//         dismissable={false}
//         style={{ backgroundColor: "transparent", elevation: 0 }}
//       >
//         <ActivityIndicator size="large" color="red"></ActivityIndicator>
//       </Dialog>
//     </Portal>

//     {/* Modal */}
//     <DateTimePickerModal
//       date={checkInDate}
//       isVisible={checkInDateModal}
//       mode="date"
//       onConfirm={this.handleCheckInConfirm}
//       onCancel={this.toggleCheckInDateModal}
//       isDarkModeEnabled={false}
//     />

//     <DateTimePickerModal
//       date={checkOutDate}
//       isVisible={checkOutDateModal}
//       mode="date"
//       onConfirm={this.handleCheckOutConfirm}
//       onCancel={this.toggleCheckOutDateModal}
//       isDarkModeEnabled={false}
//     />
//   </ScrollView>
// </Provider>
//     );
//   }
// }

const index = () => {
  const [checkInDateModal, setCheckInDateModal] = useState(false);
  const [checkOutDateModal, setCheckOutDateModal] = useState(false);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [length, setLength] = useState(0);
  const [dialog, setDialog] = useState(false);
  const [overlayLoading, setOverlayLoading] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({});
  const [rooms, setRooms] = useState([
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
  ]);

  useEffect(() => {
    checkOutDate.setDate(checkInDate.getDate() + 1);
    fetchRooms();
    calculateLength();
    getFilterdRooms();
  }, []);

  useEffect(() => {
    calculateLength();
  }, [checkOutDate, checkInDate]);

  const fetchRooms = () => {
    setTimeout(() => {
      setLoadingRooms(false);
    }, 500);
  };

  const calculateLength = () => {
    var diffTime = checkOutDate.getTime() - checkInDate.getTime();
    var diffDay = diffTime / (1000 * 3600 * 24);
    if (Math.round(diffDay) <= 0) {
      setLength("Error");
      return;
    }
    setLength(Math.round(diffDay));
  };

  const getFilterdRooms = () => {
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
    setRooms(filterRooms);
  };

  const handleCheckInConfirm = (date) => {
    setLoadingRooms(true);
    setCheckInDate(date);
    setCheckInDateModal(false);
    checkOutDate.setDate(date.getDate() + 1);
    fetchRooms();
  };

  const handleCheckOutConfirm = (date) => {
    setLoadingRooms(true);
    setCheckOutDate(date);
    setCheckOutDateModal(false);
    fetchRooms();
  };

  const onCheckboxChange = (item, index) => {
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
    setRooms(newRoomData);
  };

  const renderItem = ({ item, index }) => {
    let dotColor =
      item.status === "available"
        ? "#2CC990"
        : item.status === "busy"
        ? "#FC6042"
        : "#FCB941";
    return (
      <TouchableOpacity
        style={styles.roomList}
        onPress={() => onCheckboxChange(item, index)}
      >
        <View style={{ flexDirection: "row" }}>
          <Checkbox
            disabled={!item.available ? true : false}
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

  const onAddBooking = () => {
    let selectedRooms = [];
    rooms.map((r) => {
      if (r.selected) selectedRooms.push(r.number);
    });
    if (selectedRooms.length === 0) {
      alert("Please select any available room");
      setDialog(false);
    } else {
      setOverlayLoading(true);
      setDialog(false);
      bookingInfo.checkInDate = checkInDate.toLocaleDateString();
      bookingInfo.checkOutDate = checkOutDate.toLocaleDateString();
      bookingInfo.length = length;
      bookingInfo.rooms = selectedRooms;
      console.log(bookingInfo);
    }
  };

  const onHandleChangeText = (value, nameInput) => {
    setBookingInfo({
      ...bookingInfo,
      [nameInput]: value,
    });
  };

  const theme = {
    ...DefaultTheme,
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
            Booking Form
          </Text>
          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input
                value={bookingInfo.name}
                onChangeText={(value) => onHandleChangeText(value, "name")}
              />
            </Item>
            <Item floatingLabel>
              <Label>Phone Number</Label>
              <Input
                keyboardType="numeric"
                value={bookingInfo.phone}
                onChangeText={(value) => onHandleChangeText(value, "phone")}
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
            {/* Room */}
            <View style={styles.roomContainer}>
              <Text style={[styles.biggerText]}>Room :</Text>
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
          <Button
            mode="outlined"
            onPress={() => {
              setDialog(true);
            }}
            uppercase={false}
            style={{
              borderColor: "#AA75F6",
              borderWidth: 1,
              alignSelf: "center",
              marginTop: 20,
            }}
          >
            Add Booking
          </Button>
        </View>

        {/* Dialog */}
        <Portal>
          <Dialog
            visible={dialog}
            onDismiss={() => {
              setDialog(false);
            }}
          >
            <Dialog.Content>
              <Text>Are you sure you want to proceed?</Text>
            </Dialog.Content>
            <Dialog.Actions style={{ marginTop: -20 }}>
              <Button
                onPress={() => {
                  setDialog(false);
                }}
                uppercase={false}
              >
                Cancel
              </Button>
              <Button onPress={onAddBooking} uppercase={false}>
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
  roomContainer: {
    marginTop: 20,
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
  btnAdd: {
    padding: 10,
    backgroundColor: "darkslateblue",
    alignSelf: "center",
    marginTop: 20,
    paddingHorizontal: 60,
  },
});

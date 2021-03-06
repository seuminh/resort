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
         setCheckInDateModal(false);
         setCheckOutDateModal(false);
         setLoadingRooms(true);
         setTotal(0);

         return fetch(
            `http://resort-api.herokuapp.com/api/v1/rooms/belong?startDate=${checkInDate.toLocaleDateString()}&endDate=${checkOutDate.toLocaleDateString()}`,
            {
               headers: {
                  Authorization: `Bearer ${authState.token}`,
               },
            }
         )
            .then((res) => res.json())
            .then((data) => {
               setLoadingRooms(false);
               return data;
            });
      }
   );

   useEffect(() => {
      calculateLength();
   }, []);

   useEffect(() => {
      setRooms(data);
   }, [data]);

   useEffect(() => {
      calculateLength();
   }, [checkOutDate, checkInDate]);

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
      setCheckOutDate(new Date(date.getTime() + 60 * 60 * 24 * 1000));
   };

   const handleCheckOutConfirm = (date) => {
      setCheckOutDate(date);
   };

   const onCheckboxChange = (item, index) => {
      const newRoomData = rooms.map((room) => {
         if (!room.selected) {
            room.selected = false;
         }

         if (room.reservation.length > 0) {
            if (room.reservation[0].status !== "checkOut") {
               return {
                  ...room,
               };
            }
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
                  disabled={
                     status === "available" || status === "checkOut"
                        ? false
                        : true
                  }
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

   const onAddBooking = async () => {
      let selectedRooms = [];
      rooms.map((r) => {
         if (r.selected) selectedRooms.push(r.id);
      });
      if (selectedRooms.length === 0) alert("Please select any available room");
      else {
         setOverlayLoading(true);
         const checkInInfoCustomer = {
            customer: {},
            reservation: {},
         };
         checkInInfoCustomer.customer = {
            name: checkInInfo.name,
            phoneNumber: checkInInfo.phone,
         };
         checkInInfoCustomer.reservation = {
            startDate: checkInDate.toLocaleDateString(),
            endDate: checkOutDate.toLocaleDateString(),
            room: selectedRooms,
            paidPrice: checkInInfo.deposit,
         };

         const data = await fetch(
            `http://resort-api.herokuapp.com/api/v1/reservations`,
            {
               method: "POST",
               headers: {
                  Authorization: `Bearer ${authState.token}`,
                  "Content-Type": "application/json",
               },

               body: JSON.stringify(checkInInfoCustomer),
            }
         ).then((res) => res.json());
         if (!data.success) {
            alert("Please fill all information");
            setOverlayLoading(false);
         } else {
            navigation.pop();
            // console.log(data);
         }
      }
   };

   const onClear = () => {
      setAction("");
      setDialog(false);
      setCheckInInfo({});
   };

   const onProceed = () => {
      if (action === "clear") onClear();
      else onAddBooking();
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
            <Text style={styles.branchText}>
               {data?.length > 0 ? data[0].branch.name : ""}
            </Text>
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
                        value={checkInInfo.name}
                        onChangeText={(value) =>
                           onHandleChangeText(value, "name")
                        }
                     />
                  </Item>
                  <Item floatingLabel>
                     <Label>Phone Number</Label>
                     <Input
                        keyboardType="numeric"
                        value={checkInInfo.phone}
                        onChangeText={(value) =>
                           onHandleChangeText(value, "phone")
                        }
                     />
                  </Item>
                  <Item floatingLabel>
                     <Label>Deposit</Label>
                     <Input
                        keyboardType="numeric"
                        value={checkInInfo.deposit}
                        onChangeText={(value) =>
                           onHandleChangeText(value, "deposit")
                        }
                     />
                  </Item>

                  {/* Check In */}
                  <View style={styles.checkInContainer}>
                     <Text style={[styles.biggerText, { flex: 1 }]}>
                        Check in :
                     </Text>
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
                     <Text style={[styles.biggerText, { flex: 1 }]}>
                        Check out :
                     </Text>
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
                     <Text style={[styles.biggerText, { flex: 1 }]}>
                        Length :
                     </Text>
                     <Text style={[styles.biggerText, { flex: 2 }]}>
                        {length}
                     </Text>
                  </View>
                  {/* Total */}
                  <View style={styles.totalContainer}>
                     <Text style={[styles.biggerText, { flex: 1 }]}>
                        Total price :
                     </Text>
                     <Text style={[styles.biggerText, { flex: 2 }]}>
                        $ {total}
                     </Text>
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
                           keyExtractor={(item) => item.number.toString()}
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
                     onPress={() => {
                        setAction("booking");
                        setDialog(true);
                     }}
                     uppercase={false}
                     style={{ borderWidth: 1, borderColor: "#AA75F6" }}
                  >
                     Add Booking
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
                  <ActivityIndicator
                     size="large"
                     color="red"
                  ></ActivityIndicator>
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

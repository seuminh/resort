import React, { Component, useEffect, useState } from "react";
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

import { Form, Item, Input, Label, Picker, Icon } from "native-base";
import { useAuthState } from "../../../context";

import Receipt from "../../../components/Receipt";

import {
   Button,
   Dialog,
   Portal,
   Provider,
   DefaultTheme,
} from "react-native-paper";

import * as Print from "expo-print";

const index = ({ navigation }) => {
   const authState = useAuthState();

   const [paid, setPaid] = useState("notPaid");
   const [bookingInfo, setBookingInfo] = useState(
      navigation.state.params.bookingInfo
   );
   const [dialog, setDialog] = useState(false);
   const [overlayLoading, setOverlayLoading] = useState(false);
   const [action, setAction] = useState("");
   const [pay, setPay] = useState(0);

   useEffect(() => {
      calculateTotal();
   }, []);

   const calculateTotal = () => {
      let totalPrice = bookingInfo.room.reduce((acc, room) => {
         return acc + room.price;
      }, 0);
      const length =
         (new Date(bookingInfo.endDate) - new Date(bookingInfo.startDate)) /
         (24 * 60 * 60 * 1000);
      totalPrice *= length;
      setBookingInfo({
         ...bookingInfo,
         total: totalPrice,
         length,
      });
      setPay(totalPrice - bookingInfo.paidPrice);
   };

   const onPrint = async () => {
      setOverlayLoading(true);
      const checkInInfoCustomer = {
         customer: {},
         reservation: {},
      };
      checkInInfoCustomer.customer = {
         ...bookingInfo.customer,
      };
      checkInInfoCustomer.reservation = {
         status: "checkIn",
      };
      checkInInfoCustomer.reservation.paidPrice = bookingInfo.paidPrice + pay;
      // if (paid === "paid")
      //    checkInInfoCustomer.reservation.paidPrice = bookingInfo.total;
      // else checkInInfoCustomer.reservation.deposited = bookingInfo.total;
      const data = await fetch(
         `http://resort-api.herokuapp.com/api/v1/reservations/${bookingInfo.id}`,
         {
            method: "PUT",
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
         console.log(data);
         Print.printAsync({
            html: Receipt(
               bookingInfo,
               authState.user.branch,
               bookingInfo.total,
               bookingInfo.paidPrice
            ),
         }).then(() => {});
         navigation.pop();
      }
   };

   const onCheckIn = async () => {
      setOverlayLoading(true);
      const checkInInfoCustomer = {
         customer: {},
         reservation: {},
      };
      checkInInfoCustomer.customer = {
         ...bookingInfo.customer,
      };
      checkInInfoCustomer.reservation = {
         status: "checkIn",
      };
      // if (paid === "paid")
      //    checkInInfoCustomer.reservation.paidPrice = bookingInfo.total;
      // else checkInInfoCustomer.reservation.deposited = bookingInfo.total;
      checkInInfoCustomer.reservation.paidPrice = bookingInfo.paidPrice + pay;
      const data = await fetch(
         `http://resort-api.herokuapp.com/api/v1/reservations/${bookingInfo.id}`,
         {
            method: "PUT",
            headers: {
               Authorization: `Bearer ${authState.token}`,
               "Content-Type": "application/json",
            },

            body: JSON.stringify(checkInInfoCustomer),
         }
      ).then((res) => res.json());
      if (data.success) {
         navigation.pop();
      } else {
         alert("Please fill all information");
         setOverlayLoading(false);
      }
   };

   const onCancel = () => {
      setOverlayLoading(true);
      fetch(
         `http://resort-api.herokuapp.com/api/v1/reservations/${bookingInfo.id}`,
         {
            method: "DELETE",
            headers: {
               Authorization: `Bearer ${authState.token}`,
            },
         }
      )
         .then((res) => res.json())
         .then((data) => {
            if (data.success) {
               navigation.goBack();
               setAction("");
               setDialog(false);
            }
         });
   };

   const onProceed = () => {
      if (action === "cancel") onCancel();
      else onCheckIn();
   };

   const onHandleChangeText = (value, nameInput) => {
      setBookingInfo((v) => {
         let bookingInfo = { ...v };
         bookingInfo.customer[nameInput] = value.toString();
         return bookingInfo;
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
                  Check In Form
               </Text>
               <Form>
                  <Item floatingLabel>
                     <Label>Name</Label>
                     <Input
                        value={bookingInfo.customer.name}
                        onChangeText={(value) =>
                           onHandleChangeText(value, "name")
                        }
                     />
                  </Item>
                  <Item floatingLabel>
                     <Label>ID Number</Label>
                     <Input
                        value={bookingInfo.customer?.cardId?.toString()}
                        onChangeText={(value) =>
                           onHandleChangeText(value, "cardId")
                        }
                     />
                  </Item>
                  <Item floatingLabel>
                     <Label>Phone Number</Label>
                     <Input
                        keyboardType="numeric"
                        value={bookingInfo.customer.phoneNumber.toString()}
                        onChangeText={(value) =>
                           onHandleChangeText(value, "phoneNumber")
                        }
                     />
                  </Item>
                  <Item floatingLabel>
                     <Label>Number of Person</Label>
                     <Input
                        keyboardType="numeric"
                        value={bookingInfo.customer?.numPerson?.toString()}
                        onChangeText={(value) =>
                           onHandleChangeText(value, "numPerson")
                        }
                     />
                  </Item>
                  <Item floatingLabel>
                     <Label>Pay</Label>
                     <Input
                        keyboardType="numeric"
                        value={pay.toString()}
                        onChangeText={(value) => setPay(Number(value))}
                     />
                  </Item>
                  {/* Check In */}
                  <View style={styles.checkInContainer}>
                     <Text style={[styles.biggerText, { flex: 1 }]}>
                        Check in :
                     </Text>
                     <Text style={[styles.biggerText, { flex: 2 }]}>
                        {new Date(bookingInfo.startDate).toLocaleDateString()}
                     </Text>
                  </View>
                  {/* Check Out */}
                  <View style={styles.checkOutContainer}>
                     <Text style={[styles.biggerText, { flex: 1 }]}>
                        Check out :
                     </Text>
                     <Text style={[styles.biggerText, { flex: 2 }]}>
                        {new Date(bookingInfo.endDate).toLocaleDateString()}
                     </Text>
                  </View>
                  {/* Length */}
                  <View style={styles.lengthContainer}>
                     <Text style={[styles.biggerText, { flex: 1 }]}>
                        Length :
                     </Text>
                     <Text style={[styles.biggerText, { flex: 2 }]}>
                        {bookingInfo.length}
                     </Text>
                  </View>
                  {/* Total */}
                  <View style={styles.totalContainer}>
                     <Text style={[styles.biggerText, { flex: 1 }]}>
                        Total price :
                     </Text>
                     <Text style={[styles.biggerText, { flex: 2 }]}>
                        $ {bookingInfo.total}
                     </Text>
                  </View>
                  {/* Payment */}
                  {/* <View style={styles.paymentContainer}>
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
                           <Picker.Item label="Not paid" value="notPaid" />
                        </Picker>
                     </View>
                  </View> */}
                  {/* Room */}
                  <View style={styles.depositdContainer}>
                     <Text style={[styles.biggerText, { flex: 1 }]}>
                        Deposited :
                     </Text>
                     <Text style={[styles.biggerText, { flex: 2 }]}>
                        $ {bookingInfo.paidPrice}
                     </Text>
                  </View>
                  <View style={styles.roomContainer}>
                     <Text style={[styles.biggerText, { flex: 1 }]}>
                        Room :
                     </Text>
                     <Text style={[styles.biggerText, { flex: 2 }]}>
                        {bookingInfo.room.map((v) => v.number).toString()}
                     </Text>
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
                        setDialog(true);
                        setAction("cancel");
                     }}
                     uppercase={false}
                     mode="outlined"
                     color="#D9534F"
                     style={{ borderColor: "#D9534F", borderWidth: 1 }}
                  >
                     Cancel
                  </Button>
                  <Button
                     mode="outlined"
                     onPress={onPrint}
                     uppercase={false}
                     style={{ borderWidth: 1, borderColor: "#AA75F6" }}
                  >
                     Print
                  </Button>
                  <Button
                     mode="outlined"
                     onPress={() => {
                        setDialog(true);
                        setAction("checkIn");
                     }}
                     uppercase={false}
                     color="#0275D8"
                     style={{ borderColor: "#0275D8", borderWidth: 1 }}
                  >
                     Check In
                  </Button>
               </View>
            </View>
         </ScrollView>

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
      </Provider>
   );
};

export default index;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingHorizontal: 10,
      paddingTop: 10,
      backgroundColor: "#fff",
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
   depositdContainer: {
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
   btnPrint: {
      padding: 10,
      backgroundColor: "darkslateblue",
      alignSelf: "center",
      marginTop: 20,
      paddingHorizontal: 60,
      marginHorizontal: 10,
   },
   btnCheckIn: {
      padding: 10,
      backgroundColor: "darkslateblue",
      alignSelf: "center",
      marginTop: 20,
      paddingHorizontal: 45,
   },
   btnCancel: {
      padding: 10,
      backgroundColor: "darkslateblue",
      alignSelf: "center",
      marginTop: 20,
      paddingHorizontal: 60,
   },
});

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

import { Form, Item, Input, Label, Picker, Icon } from "native-base";

import {
   Button,
   Dialog,
   Portal,
   Provider,
   DefaultTheme,
} from "react-native-paper";

export default class checkIn extends Component {
   constructor(props) {
      super(props);
      this.state = {
         paid: "notPaid",
         bookingInfo: props.navigation.state.params.bookingInfo,
         dialog: false,
         overlayLoading: false,
         action: "",
      };
   }

   componentDidMount() {
      console.log(this.state.bookingInfo);
      this.calculateTotal();
   }

   calculateTotal = () => {
      const { bookingInfo } = this.state;
      this.setState({
         bookingInfo: {
            ...bookingInfo,
            total:
               bookingInfo.length * bookingInfo.room.length * bookingInfo.price,
         },
      });
   };

   onPaymentChange = (value) => {
      this.setState({
         paid: value,
      });
   };

   onPrint = () => {
      const { bookingInfo } = this.state;
      if (this.state.paid === "paid") bookingInfo.deposit = bookingInfo.total;
      else bookingInfo.deposit = 0;
      bookingInfo.checkInDate = bookingInfo.checkInDate.toLocaleDateString();
      bookingInfo.checkOutDate = bookingInfo.checkOutDate.toLocaleDateString();
      console.log(this.state.bookingInfo);
   };

   onCheckIn = () => {
      const { bookingInfo } = this.state;
      if (this.state.paid === "paid") bookingInfo.deposit = bookingInfo.total;
      else bookingInfo.deposit = 0;
      bookingInfo.checkInDate = bookingInfo.checkInDate.toLocaleDateString();
      bookingInfo.checkOutDate = bookingInfo.checkOutDate.toLocaleDateString();
      this.setState({
         dialog: false,
         action: "",
      });
      console.log(this.state.bookingInfo);
   };

   onCancel = () => {
      this.setState(
         {
            overlayLoading: true,
            action: "",
            dialog: false,
         },
         () => {
            setTimeout(() => {
               this.props.navigation.goBack();
            }, 500);
         }
      );
   };

   onProceed = () => {
      if (this.state.action === "cancel") this.onCancel();
      else this.onCheckIn();
   };

   onHandleChangeText = (value, nameInput) => {
      this.setState({
         bookingInfo: {
            ...this.state.bookingInfo,
            [nameInput]: value,
         },
      });
   };

   render() {
      const { paid, bookingInfo, dialog, overlayLoading } = this.state;
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
                        <Input
                           value={bookingInfo.name}
                           onChangeText={(value) =>
                              this.onHandleChangeText(value, "name")
                           }
                        />
                     </Item>
                     <Item floatingLabel>
                        <Label>ID Number</Label>
                        <Input
                           value={bookingInfo.id}
                           onChangeText={(value) =>
                              this.onHandleChangeText(value, "id")
                           }
                        />
                     </Item>
                     <Item floatingLabel>
                        <Label>Phone Number</Label>
                        <Input
                           keyboardType="numeric"
                           value={bookingInfo.phone}
                           onChangeText={(value) =>
                              this.onHandleChangeText(value, "phone")
                           }
                        />
                     </Item>
                     <Item floatingLabel>
                        <Label>Number of Person</Label>
                        <Input
                           keyboardType="numeric"
                           value={bookingInfo.person}
                           onChangeText={(value) =>
                              this.onHandleChangeText(value, "person")
                           }
                        />
                     </Item>
                     {/* Check In */}
                     <View style={styles.checkInContainer}>
                        <Text style={[styles.biggerText, { flex: 1 }]}>
                           Check in :
                        </Text>
                        <Text style={[styles.biggerText, { flex: 2 }]}>
                           {bookingInfo.checkInDate.toLocaleDateString()}
                        </Text>
                     </View>
                     {/* Check Out */}
                     <View style={styles.checkOutContainer}>
                        <Text style={[styles.biggerText, { flex: 1 }]}>
                           Check out :
                        </Text>
                        <Text style={[styles.biggerText, { flex: 2 }]}>
                           {bookingInfo.checkOutDate.toLocaleDateString()}
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
                     <View style={styles.paymentContainer}>
                        <Text style={[styles.biggerText, { flex: 1 }]}>
                           Pay :
                        </Text>
                        <View style={{ flex: 2 }}>
                           <Picker
                              mode="dropdown"
                              iosIcon={<Icon name="arrow-down" />}
                              style={{
                                 marginTop: -11,
                                 marginLeft: -15,
                              }}
                              selectedValue={paid}
                              onValueChange={this.onPaymentChange}
                           >
                              <Picker.Item label="Paid" value="paid" />
                              <Picker.Item label="Not paid" value="notPaid" />
                           </Picker>
                        </View>
                     </View>
                     {/* Room */}
                     <View style={styles.roomContainer}>
                        <Text style={[styles.biggerText, { flex: 1 }]}>
                           Room :
                        </Text>
                        <Text style={[styles.biggerText, { flex: 2 }]}>
                           {bookingInfo.room.toString()}
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
                        onPress={() =>
                           this.setState({ dialog: true, action: "cancel" })
                        }
                        uppercase={false}
                        mode="outlined"
                        color="#D9534F"
                        style={{ borderColor: "#D9534F", borderWidth: 1 }}
                     >
                        Cancel
                     </Button>
                     <Button
                        mode="outlined"
                        onPress={this.onPrint}
                        uppercase={false}
                        style={{ borderWidth: 1, borderColor: "#AA75F6" }}
                     >
                        Print
                     </Button>
                     <Button
                        mode="outlined"
                        onPress={() =>
                           this.setState({ dialog: true, action: "checkIn" })
                        }
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
                  onDismiss={() => this.setState({ dialog: false, action: "" })}
               >
                  <Dialog.Content>
                     <Text>Are you sure you want to proceed?</Text>
                  </Dialog.Content>
                  <Dialog.Actions style={{ marginTop: -20 }}>
                     <Button
                        onPress={() =>
                           this.setState({ dialog: false, action: "" })
                        }
                        uppercase={false}
                     >
                        Cancel
                     </Button>
                     <Button onPress={this.onProceed} uppercase={false}>
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
         </Provider>
      );
   }
}

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

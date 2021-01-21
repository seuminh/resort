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

export default class checkIn extends Component {
   constructor(props) {
      super(props);
      this.state = {
         paid: "paid",
         total: 0,
         bookingInfo: props.navigation.state.params.bookingInfo,
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
            total: bookingInfo.length * bookingInfo.room.length,
         },
      });
   };

   onPaymentChange = (value) => {
      this.setState({
         paid: value,
      });
   };

   onPrint = () => {
      console.log(this.state.bookingInfo);
   };

   onCheckIn = () => {
      alert("Check In");
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
      const { paid, total, bookingInfo } = this.state;

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
                     <Input keyboardType="numeric" />
                  </Item>
                  {/* Check In */}
                  <View style={styles.checkInContainer}>
                     <Text style={styles.biggerText}>Check in :</Text>
                     <Text style={[styles.biggerText, { marginLeft: 32 }]}>
                        {bookingInfo.checkInDate.toLocaleDateString()}
                     </Text>
                  </View>
                  {/* Check Out */}
                  <View style={styles.checkOutContainer}>
                     <Text style={styles.biggerText}>Check out :</Text>
                     <Text style={[styles.biggerText, { marginLeft: 20 }]}>
                        {bookingInfo.checkOutDate.toLocaleDateString()}
                     </Text>
                  </View>
                  {/* Length */}
                  <View style={styles.lengthContainer}>
                     <Text style={styles.biggerText}>Length :</Text>
                     <Text style={[styles.biggerText, { marginLeft: 47 }]}>
                        {bookingInfo.length}
                     </Text>
                  </View>
                  {/* Total */}
                  <View style={styles.totalContainer}>
                     <Text style={styles.biggerText}>Total price :</Text>
                     <Text style={[styles.biggerText, { marginLeft: 22 }]}>
                        $ {bookingInfo.total}
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
                     <Text style={[styles.biggerText, { marginLeft: 50 }]}>
                        {" "}
                        {bookingInfo.room.toString()}
                     </Text>
                  </View>
               </Form>
               <View
                  style={{
                     flexDirection: "row",
                     justifyContent: "space-around",
                  }}
               >
                  <TouchableOpacity
                     style={styles.btnPrint}
                     onPress={this.onPrint}
                  >
                     <Text style={[styles.biggerText, { color: "#fff" }]}>
                        Print
                     </Text>
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

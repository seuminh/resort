import React, { Component, useState, useEffect } from "react";
import {
   Text,
   StyleSheet,
   View,
   ScrollView,
   ActivityIndicator,
   TouchableOpacity,
   RefreshControl,
} from "react-native";

import { DataTable, Button } from "react-native-paper";
import { NavigationEvents } from "react-navigation";

import { useAuthState } from "../../../context";

const index = ({ navigation }) => {
   const authState = useAuthState();
   const [date, setDate] = useState(new Date());
   const [loading, setLoading] = useState(true);
   const [refreshing, setRefreshing] = useState(false);
   const [reservedRoom, setReservedRoom] = useState([]);

   useEffect(() => {
      setLoading(true);
      fetchAPI();
   }, []);

   useEffect(() => {
      fetchAPI();
   }, [refreshing]);

   const fetchAPI = async () => {
      const res = await fetch(
         "http://resort-api.herokuapp.com/api/v1/reservations?status=reserved&sort=endDate",
         {
            headers: {
               Authorization: `Bearer ${authState.token}`,
            },
         }
      ).then((res) => res.json());
      if (res.success) {
         setReservedRoom(
            res.data.filter(
               (d) => d.room[0].branch.name === authState.user.branch.name
            )
         );
      }

      setLoading(false);
      setRefreshing(false);
   };

   const onRefresh = () => {
      setRefreshing(true);
   };

   const goCheckIn = (r) => {
      navigation.navigate("CheckIn", { bookingInfo: r });
   };

   const getRoomList = () => {
      return (
         <View>
            {reservedRoom.map((r, i) => {
               console.log(r);
               let backgroundColor = null;
               if (new Date(r.startDate).getTime() - date.getTime() < 0)
                  backgroundColor = "#FCB941";

               return (
                  <TouchableOpacity onPress={() => goCheckIn(r)} key={i}>
                     <DataTable.Row
                        style={{
                           backgroundColor: backgroundColor,
                           marginBottom: 3,
                        }}
                     >
                        <DataTable.Cell>{r.customer.name}</DataTable.Cell>
                        <DataTable.Cell numeric>
                           {r.customer.phoneNumber}
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                           {r.room.map((v) => v.number).toString()}
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                           {new Date(r.startDate).toLocaleDateString()}
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                           {" "}
                           {(new Date(r.endDate) - new Date(r.startDate)) /
                              (24 * 60 * 60 * 1000)}
                        </DataTable.Cell>
                     </DataTable.Row>
                  </TouchableOpacity>
               );
            })}
         </View>
      );
   };

   return (
      <ScrollView
         style={styles.container}
         refreshControl={
            <RefreshControl
               refreshing={refreshing}
               onRefresh={onRefresh}
            ></RefreshControl>
         }
      >
         <NavigationEvents
            onWillFocus={() => setLoading(true)}
            onDidFocus={fetchAPI}
         />
         <Text style={styles.headerText}> Star Light Resort </Text>
         <View style={styles.subHeaderContainer}>
            <Text style={styles.branchText}>{authState.user.branch.name}</Text>
            <Text>{date.toLocaleDateString()}</Text>
         </View>
         <View style={styles.bodyContainer}>
            <Text
               style={{
                  fontSize: 20,
                  textAlign: "center",
                  marginBottom: 10,
               }}
            >
               Reserved Room
            </Text>
            <DataTable>
               <DataTable.Header>
                  <DataTable.Title>Name</DataTable.Title>
                  <DataTable.Title numeric>Phone</DataTable.Title>
                  <DataTable.Title numeric>Room</DataTable.Title>
                  <DataTable.Title numeric>Check In</DataTable.Title>
                  <DataTable.Title numeric>Length</DataTable.Title>
               </DataTable.Header>

               {loading && (
                  <ActivityIndicator
                     color="red"
                     size="large"
                     style={{ marginTop: 50 }}
                  ></ActivityIndicator>
               )}

               {!loading && getRoomList()}
            </DataTable>

            <Button
               mode="outlined"
               onPress={() => navigation.navigate("AddBooking")}
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
      </ScrollView>
   );
};

export default index;

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
   branchText: {
      fontSize: 14,
      color: "#6A0E00",
      marginVertical: 8,
      paddingHorizontal: 7,
   },
   bodyContainer: {
      paddingTop: 8,
      marginVertical: 5,
      flex: 1,
      paddingBottom: 50,
   },
   subHeaderContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 8,
   },
});

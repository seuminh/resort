import React, { Component } from "react";
import {
   Text,
   StyleSheet,
   View,
   ScrollView,
   ActivityIndicator,
   TouchableOpacity,
   RefreshControl,
} from "react-native";

import { DataTable } from "react-native-paper";
import { NavigationEvents } from "react-navigation";

export default class index extends Component {
   state = {
      date: new Date(),
      loading: true,
      refreshing: false,
      reservedRoom: [
         {
            name: "Unknown",
            phone: "012233211",
            room: [101, 102],
            checkIn: new Date("12/29/2020"),
            length: 1,
         },
         {
            name: "Hello",
            phone: "0977009000",
            room: [103],
            checkIn: new Date("12/29/2020"),
            length: 1,
         },
         {
            name: "Hi",
            phone: "0977009000",
            room: [104],
            checkIn: new Date("01/07/2021"),
            length: 2,
         },
      ],
   };

   componentDidMount() {
      this.fetchAPI();
   }

   fetchAPI = () => {
      setTimeout(() => {
         this.setState({
            loading: false,
            refreshing: false,
         });
      }, 500);
   };

   onRefresh = () => {
      this.setState(
         {
            refreshing: true,
         },
         () => this.fetchAPI()
      );
   };

   getRoomList() {
      const { reservedRoom, date } = this.state;
      return (
         <View>
            {reservedRoom.map((r, i) => {
               let backgroundColor = null;
               if (r.checkIn.getTime() - date.getTime() < 0)
                  backgroundColor = "#FCB941";

               return (
                  <DataTable.Row
                     key={i}
                     style={{
                        backgroundColor: backgroundColor,
                        marginBottom: 3,
                     }}
                  >
                     {r.name && <DataTable.Cell>{r.name}</DataTable.Cell>}
                     <DataTable.Cell numeric>{r.phone}</DataTable.Cell>
                     <DataTable.Cell numeric>
                        {r.room.toString()}
                     </DataTable.Cell>
                     <DataTable.Cell numeric>
                        {r.checkIn.toLocaleDateString()}
                     </DataTable.Cell>
                     <DataTable.Cell numeric>{r.length}</DataTable.Cell>
                  </DataTable.Row>
               );
            })}
         </View>
      );
   }

   render() {
      const { date, loading, refreshing } = this.state;
      return (
         <ScrollView
            style={styles.container}
            refreshControl={
               <RefreshControl
                  refreshing={refreshing}
                  onRefresh={this.onRefresh}
               ></RefreshControl>
            }
         >
            <NavigationEvents
               onWillFocus={() => this.setState({ loading: true })}
               onDidFocus={this.fetchAPI}
            />
            <Text style={styles.headerText}> Star Light Resort </Text>
            <View style={styles.subHeaderContainer}>
               <Text style={styles.branchText}>SK branch</Text>
               <Text>{date.toLocaleDateString()}</Text>
            </View>
            <View style={styles.bodyContainer}>
               <Text
                  style={{
                     fontSize: 20,
                     //   borderBottomWidth: 1,
                     //   borderBottomColor: "red",
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

                  {!loading && this.getRoomList()}
               </DataTable>
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

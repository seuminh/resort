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

// export default class index extends Component {
//   state = {
//     date: new Date(),
//     loading: true,
//     refreshing: false,
//     reservedRoom: [
// {
//   name: "Unknown",
//   phone: "012233211",
//   room: [101, 102],
//   checkInDate: new Date("01/21/2021"),
//   checkOutDate: new Date("01/22/2021"),
//   length: 1,
//   price: 20,
// },
// {
//   name: "Hello",
//   phone: "0977009000",
//   room: [103],
//   checkInDate: new Date("01/29/2021"),
//   checkOutDate: new Date("01/30/2021"),
//   length: 1,
//   price: 20,
// },
// {
//   name: "Hi",
//   phone: "0977009000",
//   room: [104],
//   checkInDate: new Date("02/07/2021"),
//   checkOutDate: new Date("02/09/2021"),
//   length: 2,
//   price: 20,
// },
//     ],
//   };

//   componentDidMount() {
//     this.fetchAPI();
//   }

//   fetchAPI = () => {
//     setTimeout(() => {
//       this.setState({
//         loading: false,
//         refreshing: false,
//       });
//     }, 500);
//   };

//   onRefresh = () => {
//     this.setState(
//       {
//         refreshing: true,
//       },
//       () => this.fetchAPI()
//     );
//   };

//   goAddBooking = () => {
//     this.props.navigation.navigate("AddBooking");
//   };

//   goCheckIn = (r) => {
//     // console.log(r);
//     this.props.navigation.navigate("CheckIn", { bookingInfo: r });
//   };

//   getRoomList() {
//     const { reservedRoom, date } = this.state;
//     return (
//       <View>
//         {reservedRoom.map((r, i) => {
//           let backgroundColor = null;
//           if (r.checkInDate.getTime() - date.getTime() < 0)
//             backgroundColor = "#FCB941";

//           return (
//             <TouchableOpacity onPress={() => this.goCheckIn(r)} key={i}>
//               <DataTable.Row
//                 style={{
//                   backgroundColor: backgroundColor,
//                   marginBottom: 3,
//                 }}
//               >
//                 {r.name && <DataTable.Cell>{r.name}</DataTable.Cell>}
//                 <DataTable.Cell numeric>{r.phone}</DataTable.Cell>
//                 <DataTable.Cell numeric>{r.room.toString()}</DataTable.Cell>
//                 <DataTable.Cell numeric>
//                   {r.checkInDate.toLocaleDateString()}
//                 </DataTable.Cell>
//                 <DataTable.Cell numeric>{r.length}</DataTable.Cell>
//               </DataTable.Row>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     );
//   }

//   render() {
//     const { date, loading, refreshing } = this.state;
//     return (
// <ScrollView
//   style={styles.container}
//   refreshControl={
//     <RefreshControl
//       refreshing={refreshing}
//       onRefresh={this.onRefresh}
//     ></RefreshControl>
//   }
// >
//   <NavigationEvents
//     onWillFocus={() => this.setState({ loading: true })}
//     onDidFocus={this.fetchAPI}
//   />
//   <Text style={styles.headerText}> Star Light Resort </Text>
//   <View style={styles.subHeaderContainer}>
//     <Text style={styles.branchText}>SK branch</Text>
//     <Text>{date.toLocaleDateString()}</Text>
//   </View>
//   <View style={styles.bodyContainer}>
//     <Text
//       style={{
//         fontSize: 20,
//         //   borderBottomWidth: 1,
//         //   borderBottomColor: "red",
//         textAlign: "center",
//         marginBottom: 10,
//       }}
//     >
//       Reserved Room
//     </Text>
//     <DataTable>
//       <DataTable.Header>
//         <DataTable.Title>Name</DataTable.Title>
//         <DataTable.Title numeric>Phone</DataTable.Title>
//         <DataTable.Title numeric>Room</DataTable.Title>
//         <DataTable.Title numeric>Check In</DataTable.Title>
//         <DataTable.Title numeric>Length</DataTable.Title>
//       </DataTable.Header>

//       {loading && (
//         <ActivityIndicator
//           color="red"
//           size="large"
//           style={{ marginTop: 50 }}
//         ></ActivityIndicator>
//       )}

//       {!loading && this.getRoomList()}
//     </DataTable>

//     <Button
//       mode="outlined"
//       onPress={this.goAddBooking}
//       uppercase={false}
//       style={{
//         borderColor: "#AA75F6",
//         borderWidth: 1,
//         alignSelf: "center",
//         marginTop: 20,
//       }}
//     >
//       Add Booking
//     </Button>
//   </View>
// </ScrollView>
//     );
//   }
// }

const index = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [reservedRoom, setReservedRoom] = useState([
    {
      name: "Unknown",
      phone: "012233211",
      room: [101, 102],
      checkInDate: new Date("01/21/2021"),
      checkOutDate: new Date("01/22/2021"),
      length: 1,
      price: 20,
    },
    {
      name: "Hello",
      phone: "0977009000",
      room: [103],
      checkInDate: new Date("01/29/2021"),
      checkOutDate: new Date("01/30/2021"),
      length: 1,
      price: 20,
    },
    {
      name: "Hi",
      phone: "0977009000",
      room: [104],
      checkInDate: new Date("02/11/2021"),
      checkOutDate: new Date("02/13/2021"),
      length: 2,
      price: 20,
    },
  ]);

  useEffect(() => {
    fetchAPI();
  }, []);

  useEffect(() => {
    fetchAPI();
  }, [refreshing]);

  const fetchAPI = () => {
    setTimeout(() => {
      setLoading(false);
      setRefreshing(false);
    }, 500);
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
          let backgroundColor = null;
          if (r.checkInDate.getTime() - date.getTime() < 0)
            backgroundColor = "#FCB941";

          return (
            <TouchableOpacity onPress={() => goCheckIn(r)} key={i}>
              <DataTable.Row
                style={{
                  backgroundColor: backgroundColor,
                  marginBottom: 3,
                }}
              >
                {r.name && <DataTable.Cell>{r.name}</DataTable.Cell>}
                <DataTable.Cell numeric>{r.phone}</DataTable.Cell>
                <DataTable.Cell numeric>{r.room.toString()}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {r.checkInDate.toLocaleDateString()}
                </DataTable.Cell>
                <DataTable.Cell numeric>{r.length}</DataTable.Cell>
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
        <Text style={styles.branchText}>SK branch</Text>
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

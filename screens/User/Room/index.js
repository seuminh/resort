import React, { useState } from "react";

import {
   Text,
   StyleSheet,
   View,
   TouchableOpacity,
   ScrollView,
   ActivityIndicator,
   RefreshControl,
} from "react-native";
import { useAuthState } from "../../../context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button } from "react-native-paper";
import { useQuery } from "react-query";

import Card from "../../../components/RoomCard";
import { NavigationEvents } from "react-navigation";

// export default class index extends Component {
//    constructor(props) {
//       super(props);
//       this.state = {
//          dateModal: false,
//          date: new Date(),
//          loading: true,
//          refreshing: false,
//       };
//    }

//    toggleDateModal = () => {
//       this.setState({
//          dateModal: !this.state.dateModal,
//       });
//    };

//    handleConfirm = (date) => {
//       this.setState(
//          {
//             date: new Date(date),
//             dateModal: !this.state.dateModal,
//             loading: true,
//          },
//          () => {
//             this.fetchRoom();
//          }
//       );
//    };

//    fetchRoom = () => {
//       setTimeout(() => {
//          this.setState({
//             loading: false,
//             refreshing: false,
//          });
//       }, 500);
//    };

//    onRefresh = () => {
//       this.setState(
//          {
//             refreshing: true,
//          },
//          () => this.fetchRoom()
//       );
//    };

//    goCheckIn = () => {
//       this.props.navigation.navigate("CheckIn");
//    };

//    componentDidMount() {
//       this.fetchRoom();
//    }

//    render()
// }

const index = ({ navigation }) => {
   const authState = useAuthState();
   const [dateModal, setDateModal] = useState(false);
   const [date, setDate] = useState(new Date());

   const [refreshing, setRefreshing] = useState(false);
   const { status, data } = useQuery(["rooms", date, refreshing], () => {
      return fetch(
         `http://10.0.2.2:5000/api/v1/rooms/belong?startDate=${date.toLocaleDateString()}`,
         {
            headers: {
               Authorization: `Bearer ${authState.token}`,
            },
         }
      )
         .then((res) => res.json())
         .then((data) => {
            setRefreshing(false);
            return data;
         });
   });
   //   console.log(authState);
   console.log(data, status);
   return (
      <ScrollView
         style={styles.container}
         refreshControl={
            <RefreshControl
               refreshing={refreshing}
               onRefresh={setRefreshing.bind(this, true)}
            ></RefreshControl>
         }
      >
         {/* <NavigationEvents
        onWillFocus={() => this.setState({ loading: true })}
        onDidFocus={this.fetchRoom}
      /> */}
         <Text style={styles.headerText}> Star Light Resort </Text>
         <View style={styles.subHeaderContainer}>
            <Text style={styles.branchText}>
               {status === "success" && data.length > 0
                  ? data[0].branch.name
                  : ""}
            </Text>
            {/* <TouchableOpacity onPress={this.toggleDateModal}> */}
            <TouchableOpacity
               onPress={() => {
                  setDateModal(true);
               }}
            >
               <Text>Select Date</Text>
            </TouchableOpacity>
         </View>
         <View style={styles.selectDateButton}>
            <Text>{date.toLocaleDateString()}</Text>
         </View>

         <View style={styles.bodyContainer}>
            {status == "success" && (
               <View style={styles.cardContainer}>
                  {data.map((v) => {
                     let status = "available";
                     if (v.reservation.length > 0) {
                        status = v.reservation[0].status;
                     }
                     return <Card status={status} room={v.number}></Card>;
                  })}
               </View>
            )}

            {status === "loading" && (
               <ActivityIndicator color="red" size="large"></ActivityIndicator>
            )}

            <Button
               mode="outlined"
               onPress={() => navigation.navigate("CheckIn")}
               uppercase={false}
               style={{
                  borderColor: "#AA75F6",
                  borderWidth: 1,
                  alignSelf: "center",
                  marginTop: 20,
               }}
            >
               Check In
            </Button>
         </View>

         {/* Modal */}
         <DateTimePickerModal
            //   isVisible={false}
            isVisible={dateModal}
            mode="date"
            //   onConfirm={this.handleConfirm}
            //   onCancel={this.toggleDateModal}
            onConfirm={(date) => {
               setDateModal(false);
               setDate(date);
            }}
            onCancel={() => {
               setDateModal(false);
            }}
            date={date}
            isDarkModeEnabled={false}
         />
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
   subHeaderContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 8,
      paddingHorizontal: 7,
   },
   branchText: {
      fontSize: 14,
      color: "#6A0E00",
   },
   selectDateButton: {
      paddingHorizontal: 7,
      alignSelf: "flex-end",
   },
   bodyContainer: {
      flex: 1,
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
   },
   cardContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: 20,
   },
});

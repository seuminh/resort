import React, { Component, useState, useEffect } from "react";
import {
   Text,
   StyleSheet,
   View,
   TouchableOpacity,
   ScrollView,
   ActivityIndicator,
   RefreshControl,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "native-base";

import Card from "../../../components/RoomCard";
import { NavigationEvents } from "react-navigation";
import { useAuthState } from "../../../context";

const index = () => {
   const authState = useAuthState();
   const [dataFetch, setDataFetch] = useState([]);
   const [room, setRoom] = useState([]);
   const [dateModal, setDateModal] = useState(false);
   const [date, setDate] = useState(new Date());
   const [loading, setLoading] = useState(true);
   const [refreshing, setRefreshing] = useState(false);
   const [branch, setBranch] = useState([]);
   const [selectedBranch, setSelectedBranch] = useState(branch[0]);

   useEffect(() => {
      console.log(date);
      fetchRoom();
   }, [date]);

   const fetchRoom = () => {
      fetch(
         `http://resort-api.herokuapp.com/api/v1/rooms/belong?startDate=${date.toLocaleDateString()}`,
         {
            headers: {
               Authorization: `Bearer ${authState.token}`,
            },
         }
      )
         .then((res) => res.json())
         .then((data) => {
            let branch = [];
            data.forEach((v) => {
               let vidv = { ...v };
               delete vidv.branch;
               const returnData = {
                  ...v.branch,
                  room: [
                     {
                        ...vidv,
                     },
                  ],
               };
               if (branch.length > 0) {
                  const foundIndex = branch.findIndex(
                     (brav) => brav.id === v.branch.id
                  );
                  if (foundIndex != -1) {
                     branch[foundIndex].room.push(vidv);
                  } else {
                     branch.push(returnData);
                  }
               } else {
                  branch.push(returnData);
               }
            });
            setRefreshing(false);
            setLoading(false);
            setDataFetch(branch);
            setBranch(branch.map((v) => v.name));
            setSelectedBranch(branch[0].name);
            setRoom(branch[0].room);
         });
   };

   const onRefresh = () => {
      setRefreshing(true);
      fetchRoom();
   };

   const handleConfirm = (date) => {
      setDateModal(false);
      setLoading(true);
      setDate(date);
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
            onDidFocus={fetchRoom}
         />
         <Text style={styles.headerText}> Star Light Resort </Text>
         <View style={styles.subHeaderContainer}>
            <Picker
               mode="dropdown"
               style={{
                  marginTop: -11,
                  marginLeft: -8,
               }}
               selectedValue={selectedBranch}
               onValueChange={(value) => {
                  const index = dataFetch.findIndex((v) => v.name === value);

                  setRoom(dataFetch[index].room);
                  setSelectedBranch(value);
               }}
            >
               {branch.map((r, i) => {
                  return <Picker.Item label={r} value={r} key={i} />;
               })}
            </Picker>
            <TouchableOpacity onPress={() => setDateModal(true)}>
               <Text>Select Date</Text>
            </TouchableOpacity>
         </View>
         <View style={styles.selectedDate}>
            <Text>{date.toLocaleDateString()}</Text>
         </View>

         <View style={styles.bodyContainer}>
            {!loading && (
               <View style={styles.cardContainer}>
                  {room.map((v) => {
                     let status = "available";
                     let customer = {};
                     if (v.reservation?.length > 0) {
                        status = v.reservation[0].status;
                        customer = v.reservation[0].customer;
                     }
                     return (
                        <Card
                           status={status}
                           key={v.id}
                           room={v.number}
                           customer={customer}
                        ></Card>
                     );
                  })}
               </View>
            )}

            {loading && (
               <ActivityIndicator color="red" size="large"></ActivityIndicator>
            )}
         </View>

         {/* Modal */}
         <DateTimePickerModal
            isVisible={dateModal}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={() => setDateModal(false)}
            date={new Date()}
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
   selectedDate: {
      paddingHorizontal: 7,
      alignSelf: "flex-end",
      marginTop: -13,
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

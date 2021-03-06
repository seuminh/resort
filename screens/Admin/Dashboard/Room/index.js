import React, { Component, useState, useEffect } from "react";
import {
   Text,
   StyleSheet,
   View,
   ScrollView,
   TouchableOpacity,
   RefreshControl,
   ActivityIndicator,
} from "react-native";

import { DataTable } from "react-native-paper";

import { useAuthState } from "../../../../context";

const index = ({ navigation }) => {
   const [refreshing, setRefreshing] = useState(false);
   const [loading, setLoading] = useState(true);
   const authState = useAuthState();
   const [roomList, setRoomList] = useState([]);

   useEffect(() => {
      fetchAPI();
   }, []);

   const fetchAPI = () => {
      //  setTimeout(() => {
      //  setLoading(false);
      //  setRefreshing(false);
      //  }, 1000);

      fetch(`http://resort-api.herokuapp.com/api/v1/branches`, {
         headers: {
            Authorization: `Bearer ${authState.token}`,
         },
      })
         .then((res) => res.json())
         .then((data) => {
            let temp = data.data.map((d) => {
               return {
                  branch: d.name,
                  total: d.rooms.length,
                  id: d.id,
               };
            });
            setRoomList(temp);
            setLoading(false);
            setRefreshing(false);
         });
   };

   const onRefresh = () => {
      setRefreshing(true);
      fetchAPI();
   };

   const renderRoomList = () => {
      return (
         <View>
            {roomList.map((r, i) => {
               return (
                  <TouchableOpacity
                     key={i}
                     onPress={() =>
                        navigation.navigate("showRoom", {
                           branch: r.branch,
                           id: r.id,
                        })
                     }
                  >
                     <DataTable.Row>
                        <DataTable.Cell>{r.branch}</DataTable.Cell>
                        <DataTable.Cell numeric>{r.total}</DataTable.Cell>
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
         <Text style={styles.headerText}> Star Light Resort </Text>

         <View style={styles.bodyContainer}>
            <Text
               style={{
                  fontSize: 20,
                  textAlign: "center",
                  marginBottom: 10,
               }}
            >
               Room
            </Text>
            <DataTable>
               <DataTable.Header style={{ color: "red" }}>
                  <DataTable.Title>Branch</DataTable.Title>
                  <DataTable.Title numeric>Total</DataTable.Title>
               </DataTable.Header>

               {loading && (
                  <ActivityIndicator
                     color="red"
                     size="large"
                     style={{ marginTop: 50 }}
                  ></ActivityIndicator>
               )}

               {!loading && renderRoomList()}
            </DataTable>
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
   bodyContainer: {
      paddingTop: 20,
      marginVertical: 5,
      flex: 1,
      paddingBottom: 50,
   },
});

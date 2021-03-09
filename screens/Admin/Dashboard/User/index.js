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

import { useAuthState } from "../../../../context";

import { DataTable, Provider, DefaultTheme } from "react-native-paper";

const index = ({ navigation }) => {
   const authState = useAuthState();
   const [refreshing, setRefreshing] = useState(false);
   const [loading, setLoading] = useState(true);
   const [branchList, setBranchList] = useState([]);

   useEffect(() => {
      fetchAPI();
   }, []);

   const fetchAPI = () => {
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
                  total: d.users.length,
                  id: d.id,
               };
            });
            setBranchList(temp);
            setLoading(false);
            setRefreshing(false);
         });
   };

   const onRefresh = () => {
      setRefreshing(true);
      fetchAPI();
   };

   const renderBranchList = () => {
      return (
         <View>
            {branchList.map((r, i) => {
               return (
                  <TouchableOpacity
                     key={i}
                     onPress={() =>
                        navigation.navigate("users", {
                           id: r.id,
                           branch: r.branch,
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

   const theme = {
      ...DefaultTheme,
   };

   return (
      <Provider theme={theme}>
         <ScrollView
            style={styles.container}
            refreshControl={
               <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
               ></RefreshControl>
            }
         >
            <Text style={styles.headerText}> Star Resort </Text>

            <View style={styles.bodyContainer}>
               <Text
                  style={{
                     fontSize: 20,
                     textAlign: "center",
                     marginBottom: 10,
                  }}
               >
                  Branches
               </Text>
               <DataTable>
                  <DataTable.Header style={{ color: "red" }}>
                     <DataTable.Title>Branch</DataTable.Title>
                     <DataTable.Title numeric>Total user</DataTable.Title>
                  </DataTable.Header>

                  {loading && (
                     <ActivityIndicator
                        color="red"
                        size="large"
                        style={{ marginTop: 50 }}
                     ></ActivityIndicator>
                  )}

                  {!loading && renderBranchList()}
               </DataTable>
            </View>
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
   modalUser: {
      backgroundColor: "white",
      marginHorizontal: 20,
      paddingHorizontal: 20,
      marginTop: -100,
      borderRadius: 20,
      height: 280,
   },
   modalAddUser: {
      backgroundColor: "white",
      marginHorizontal: 20,
      paddingHorizontal: 20,
      marginTop: -100,
      borderRadius: 20,
      height: 360,
   },
   nameContainer: {
      flexDirection: "row",
      paddingLeft: 14,
      marginTop: 20,
   },
   branchContainer: {
      flexDirection: "row",
      paddingLeft: 14,
      marginTop: 20,
   },
   biggerText: {
      fontSize: 17,
   },
});

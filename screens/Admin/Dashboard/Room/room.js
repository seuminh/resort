import React, { Component } from "react";
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

export default class income extends Component {
   constructor(props) {
      super(props);
      this.state = {
         refreshing: false,
         loading: true,
         branch: props.navigation.state.params.branch,
         roomList: [
            {
               number: 101,
               price: 20,
            },
            {
               number: 102,
               price: 20,
            },
            {
               number: 103,
               price: 20,
            },
            {
               number: 104,
               price: 20,
            },
         ],
      };
   }

   componentDidMount() {
      this.fetchAPI();
   }

   fetchAPI = () => {
      setTimeout(() => {
         this.setState({
            loading: false,
            refreshing: false,
         });
      }, 1000);
   };

   onRefresh = () => {
      this.setState(
         {
            refreshing: true,
         },
         () => this.fetchAPI()
      );
   };

   renderRoomList() {
      const { roomList } = this.state;
      return (
         <View>
            {roomList.map((r, i) => {
               return (
                  <TouchableOpacity key={i}>
                     <DataTable.Row>
                        <DataTable.Cell>{r.number}</DataTable.Cell>
                        <DataTable.Cell numeric>${r.price}</DataTable.Cell>
                     </DataTable.Row>
                  </TouchableOpacity>
               );
            })}
         </View>
      );
   }

   render() {
      const { loading, refreshing, branch } = this.state;

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
            <Text style={styles.headerText}> Star Light Resort </Text>

            <View style={styles.bodyContainer}>
               <Text
                  style={{
                     fontSize: 20,
                     textAlign: "center",
                     marginBottom: 10,
                  }}
               >
                  {branch}
               </Text>
               <DataTable>
                  <DataTable.Header style={{ color: "red" }}>
                     <DataTable.Title>Room No</DataTable.Title>
                     <DataTable.Title numeric>Price</DataTable.Title>
                  </DataTable.Header>

                  {loading && (
                     <ActivityIndicator
                        color="red"
                        size="large"
                        style={{ marginTop: 50 }}
                     ></ActivityIndicator>
                  )}

                  {!loading && this.renderRoomList()}
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
   bodyContainer: {
      paddingTop: 20,
      marginVertical: 5,
      flex: 1,
      paddingBottom: 50,
   },
});

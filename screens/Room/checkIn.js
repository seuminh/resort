import React, { Component } from "react";
import {
   Text,
   StyleSheet,
   View,
   ScrollView,
   ActivityIndicator,
} from "react-native";

export default class checkIn extends Component {
   render() {
      return (
         <ScrollView style={styles.container}>
            <Text style={styles.headerText}> Star Light Resort </Text>
            <Text style={styles.branchText}>SK branch</Text>
            <View style={styles.bodyContainer}>
               <Text
                  style={{
                     fontSize: 17,
                     borderBottomWidth: 1,
                     borderBottomColor: "red",
                  }}
               >
                  Check In Form
               </Text>
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
      paddingHorizontal: 7,
      paddingTop: 8,
      marginVertical: 5,
      flex: 1,
      alignItems: "center",
   },
});

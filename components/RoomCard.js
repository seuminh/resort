import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class RoomCard extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      let statusColor =
         this.props.status === "available"
            ? "#2CC990"
            : this.props.status === "busy"
            ? "#FC6042"
            : "#FCB941";

      return (
         <View style={styles.container}>
            <View style={styles.roomNumber}>
               <Text style={{ fontSize: 17 }}>
                  {this.props.room || RoomCard.defaultProps.room}
               </Text>
            </View>
            <View style={[styles.roomDetail, { backgroundColor: statusColor }]}>
               <View style={{ flexDirection: "row", marginBottom: 3 }}>
                  <Text>Status : </Text>
                  <Text>
                     {this.props.status || RoomCard.defaultProps.status}
                  </Text>
               </View>
               <View style={{ flexDirection: "row", marginBottom: 3 }}>
                  <Text>Name : </Text>
                  <Text>{this.props.name || RoomCard.defaultProps.name}</Text>
               </View>
               <View style={{ flexDirection: "row", marginBottom: 3 }}>
                  <Text>Phone : </Text>
                  <Text>{this.props.phone || RoomCard.defaultProps.phone}</Text>
               </View>
            </View>
         </View>
      );
   }
}

RoomCard.defaultProps = {
   room: "00",
   status: "available",
   phone: "...",
   name: "...",
};

const colors = {
   available: "#2CC990",
   busy: "#FC6042",
   reserved: "#FCB941",
};

const styles = StyleSheet.create({
   container: {
      marginHorizontal: 15,
      backgroundColor: "white",
      borderRadius: 8,
      elevation: 5,
      shadowColor: "#aaa",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      marginVertical: 10,
      width: 150,
   },
   roomNumber: {
      flex: 1,
      paddingVertical: 7,
      paddingHorizontal: 10,
      alignItems: "center",
      borderBottomWidth: 1,
   },
   roomDetail: {
      padding: 7,
   },
});

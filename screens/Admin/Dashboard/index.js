import React, { Component } from "react";
import {
   Text,
   StyleSheet,
   View,
   TouchableOpacity,
   ScrollView,
} from "react-native";

import {
   FontAwesome,
   Feather,
   AntDesign,
   FontAwesome5,
} from "@expo/vector-icons";

const index = ({ navigation }) => {
   return (
      <ScrollView style={styles.container}>
         <Text style={styles.title}>Star Light Resort</Text>
         {/* Income */}
         <TouchableOpacity
            style={styles.incomeContainer}
            // onPress={() => navigation.navigate("income")}
            onPress={() => alert("Not finish")}
         >
            <View style={styles.incomeIconContainer}>
               <FontAwesome name="dollar" size={24} color="#fff" />
            </View>
            <View style={styles.incomeTitleContainer}>
               <Text style={styles.incomeTitle}>Total Income</Text>
            </View>
            <View style={styles.incomeTotalContainer}>
               <Text style={styles.incomeTotal}>$0</Text>
            </View>
         </TouchableOpacity>

         {/* Guest */}
         <TouchableOpacity
            style={styles.guestContainer}
            // onPress={() => navigation.navigate("guest")}
            onPress={() => alert("Not finish")}
         >
            <View style={styles.guestIconContainer}>
               <FontAwesome5 name="user-friends" size={24} color="#fff" />
            </View>
            <View style={styles.guestTitleContainer}>
               <Text style={styles.guestTitle}>Total Guest</Text>
            </View>
            <View style={styles.guestTotalContainer}>
               <Text style={styles.guestTotal}>0</Text>
            </View>
         </TouchableOpacity>

         {/* Room */}
         <TouchableOpacity
            style={styles.roomContainer}
            onPress={() => navigation.navigate("room")}
         >
            <View style={styles.roomIconContainer}>
               <FontAwesome name="hotel" size={24} color="#fff" />
            </View>
            <View style={styles.roomTitleContainer}>
               <Text style={styles.roomTitle}>Total Room</Text>
            </View>
            <View style={styles.roomTotalContainer}>
               <Text style={styles.roomTotal}>--</Text>
            </View>
         </TouchableOpacity>

         {/* User */}
         <TouchableOpacity
            style={styles.userContainer}
            onPress={() => navigation.navigate("branch")}
         >
            <View style={styles.userIconContainer}>
               <AntDesign name="adduser" size={24} color="#fff" />
            </View>
            <View style={styles.userTitleContainer}>
               <Text style={styles.userTitle}>Total user</Text>
            </View>
            <View style={styles.userTotalContainer}>
               <Text style={styles.userTotal}>--</Text>
            </View>
         </TouchableOpacity>
      </ScrollView>
   );
};

export default index;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 15,
      backgroundColor: "#eee",
   },
   title: {
      textAlign: "center",
      fontSize: 20,
      marginBottom: 20,
   },
   //   Income
   incomeContainer: {
      backgroundColor: "#fff",
      paddingHorizontal: 10,
      paddingVertical: 8,
      flexDirection: "row",
      // maxWidth: 400,
      borderRadius: 10,
      justifyContent: "space-between",
      paddingRight: 20,
      elevation: 5,
      marginBottom: 20,
   },
   incomeIconContainer: {
      padding: 20,
      backgroundColor: "#CA6A36",
      borderRadius: 5,
      paddingHorizontal: 25,
   },
   incomeTitleContainer: {
      flex: 1,
      justifyContent: "center",
      marginLeft: 20,
   },
   incomeTitle: {},
   incomeTotalContainer: {
      justifyContent: "center",
   },
   incomeTotal: {
      color: "#CA6A36",
   },
   //   Guest
   guestContainer: {
      backgroundColor: "#fff",
      paddingHorizontal: 10,
      paddingVertical: 8,
      flexDirection: "row",
      // maxWidth: 400,
      borderRadius: 10,
      justifyContent: "space-between",
      paddingRight: 20,
      marginBottom: 20,
      elevation: 5,
   },
   guestIconContainer: {
      padding: 20,
      backgroundColor: "darkslateblue",
      borderRadius: 5,
      paddingHorizontal: 18,
   },
   guestTitleContainer: {
      flex: 1,
      justifyContent: "center",
      marginLeft: 20,
   },
   guestTitle: {},
   guestTotalContainer: {
      justifyContent: "center",
   },
   guestTotal: {
      color: "darkslateblue",
   },
   //   Room
   roomContainer: {
      backgroundColor: "#fff",
      paddingHorizontal: 10,
      paddingVertical: 8,
      flexDirection: "row",
      // maxWidth: 400,
      borderRadius: 10,
      justifyContent: "space-between",
      paddingRight: 20,
      marginBottom: 20,
      elevation: 5,
   },
   roomIconContainer: {
      padding: 20,
      backgroundColor: "#6A0000",
      borderRadius: 5,
      paddingHorizontal: 19,
   },
   roomTitleContainer: {
      flex: 1,
      justifyContent: "center",
      marginLeft: 20,
   },
   roomTitle: {},
   roomTotalContainer: {
      justifyContent: "center",
   },
   roomTotal: {
      color: "#6A0000",
   },
   // User
   userContainer: {
      backgroundColor: "#fff",
      paddingHorizontal: 10,
      paddingVertical: 8,
      flexDirection: "row",
      // maxWidth: 400,
      borderRadius: 10,
      justifyContent: "space-between",
      paddingRight: 20,
      marginBottom: 20,
      elevation: 5,
   },
   userIconContainer: {
      padding: 20,
      backgroundColor: "#0275D8",
      borderRadius: 5,
      paddingHorizontal: 21,
   },
   userTitleContainer: {
      flex: 1,
      justifyContent: "center",
      marginLeft: 20,
   },
   userTotalContainer: {
      justifyContent: "center",
   },
   userTotal: {
      color: "#0275D8",
   },
});

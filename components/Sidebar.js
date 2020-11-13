import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { DrawerItems } from "react-navigation-drawer";

const Sidebar = (props) => {
  function showAlert() {
    Alert.alert("", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        onPress: () => console.log("cancel"),
        style: "cancel",
      },
      { text: "Log Out", onPress: () => props.signOut() },
    ]);
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topSidebar}>
        <Image
          source={require("../assets/logo.jpg")}
          style={styles.image}
        ></Image>
      </View>
      <View style={{ marginTop: -5 }}>
        <DrawerItems {...props}></DrawerItems>
      </View>
      <TouchableOpacity onPress={showAlert}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  topSidebar: {
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#FBF9EC",
  },
  image: {
    width: 150,
    height: 150,
  },
});
export default Sidebar;

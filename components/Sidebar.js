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
import { Button } from "react-native-paper";
import { DrawerItems } from "react-navigation-drawer";
import { logout, useAuthDispatch } from "../context";

const Sidebar = (props) => {
  const dispatch = useAuthDispatch();
  function showAlert() {
    Alert.alert("", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        onPress: () => console.log("cancel"),
        style: "cancel",
      },
      { text: "Log Out", onPress: () =>  logout(dispatch) },
    ]);
  }
  return (
    <View style={styles.container}>
      <View style={styles.topSidebar}>
        <Image
          source={require("../assets/logo.jpg")}
          style={styles.image}
        ></Image>
        <Text>Login As {props.username}</Text>
      </View>
      
      <View style={styles.bottomSidebar}>
        <ScrollView style={{ marginTop: -5 }}>
          <DrawerItems {...props}></DrawerItems>
        </ScrollView>
        <TouchableOpacity onPress={showAlert} style={styles.btnSignOut}>
          <Text style={styles.btnSignOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    backgroundColor: "#FBF9EC",
  },
  image: {
    width: 130,
    height: 130,
  },
  bottomSidebar: {
    flex: 1,
    paddingBottom: 40,
  },
  btnSignOut: {
    padding: 10,
    borderColor: "#FF2E63",
    borderWidth: 1,
    borderRadius: 25,
    width: "70%",
    alignSelf: "center",
  },
  btnSignOutText: {
    textAlign: "center",
    color: "#FF2E63",
    fontSize: 16,
    letterSpacing: 1,
  },
});
export default Sidebar;

import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import React from "react";

import DashboardStack from "./DashboardStack";
import RoomStack from "./RoomStack";
import BookingStack from "./BookingStack";

import Sidebar from "../components/Sidebar";

import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";

const drawerOptions = {
   Dashboard: {
      screen: DashboardStack,
      navigationOptions: {
         title: "Dashboard",
         drawerIcon: ({ tintColor }) => (
            <MaterialIcons name="dashboard" size={18} color={tintColor} />
         ),
      },
   },
   Room: {
      screen: RoomStack,
      navigationOptions: {
         title: "Room",
         drawerIcon: ({ tintColor }) => (
            <Ionicons name="ios-bed" size={18} color={tintColor} />
         ),
      },
   },
   Booking: {
      screen: BookingStack,
      navigationOptions: {
         title: "Booking",
         drawerIcon: ({ tintColor }) => (
            <Ionicons name="ios-bed" size={18} color={tintColor} />
         ),
      },
   },
};

const drawer = createDrawerNavigator(drawerOptions, {
   contentComponent: (props) => {
      return <Sidebar {...props}></Sidebar>;
   },
   contentOptions: {
      activeBackgroundColor: "#6A0E00",
      activeTintColor: "#fff",
   },
});

export default createAppContainer(drawer);

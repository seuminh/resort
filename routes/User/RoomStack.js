import { createStackNavigator } from "react-navigation-stack";
import React, {useState} from "react";

import Room from "../../screens/User/Room/index";
import CheckIn from "../../screens/User/Room/checkIn";
import Header from "../../components/Header";

const screens = {
  Room: {
    screen: Room,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header title="Room" navigation={navigation}></Header>
        ),
      };
    },
  },
  CheckIn: {
    screen: CheckIn,
    navigationOptions: {
      title: "Check In",
    },
  },
};

const RoomStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: "#6A0E00",
    },
    headerTitleAlign: "center",
    headerTintColor: "#fff",
  },
});

export default RoomStack;

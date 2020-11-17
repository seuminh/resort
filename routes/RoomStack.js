import { createStackNavigator } from "react-navigation-stack";
import React from "react";

import Room from "../screens/Room/index";
import Detail from "../screens/Room/detail";
import Header from "../components/Header";

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
  Detail: {
    screen: Detail,
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

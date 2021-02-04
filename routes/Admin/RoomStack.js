import { createStackNavigator } from "react-navigation-stack";
import React from "react";

import Room from "../../screens/Admin/Room/index";
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

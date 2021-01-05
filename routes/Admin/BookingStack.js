import { createStackNavigator } from "react-navigation-stack";
import React from "react";

import Booking from "../../screens/Admin/Booking/index";
import Header from "../../components/Header";

const screens = {
  Booking: {
    screen: Booking,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header title="Booking" navigation={navigation}></Header>
        ),
      };
    },
  },
};

const BookingStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: "#6A0E00",
    },
    headerTitleAlign: "center",
    headerTintColor: "#fff",
  },
});

export default BookingStack;

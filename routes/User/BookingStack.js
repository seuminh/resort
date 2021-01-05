import { createStackNavigator } from "react-navigation-stack";
import React from "react";

import Booking from "../../screens/User/Booking/index";
import AddBooking from "../../screens/User/Booking/addBooking";
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
  AddBooking: {
    screen: AddBooking,
    navigationOptions: {
      title: "Add Booking",
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

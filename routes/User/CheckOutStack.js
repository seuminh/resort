import { createStackNavigator } from "react-navigation-stack";
import React from "react";

import CheckOut from "../../screens/User/CheckOut/index";
import Header from "../../components/Header";

const screens = {
  CheckOut: {
    screen: CheckOut,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header title="Check out" navigation={navigation}></Header>
        ),
      };
    },
  },
};

const CheckOutStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: "#6A0E00",
    },
    headerTitleAlign: "center",
    headerTintColor: "#fff",
  },
});

export default CheckOutStack;

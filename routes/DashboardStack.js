import { createStackNavigator } from "react-navigation-stack";
import React from "react";

import index from "../screens/Dashboard/index";
import Header from "../components/Header";

const screens = {
   index: {
      screen: index,
      navigationOptions: ({ navigation }) => {
         return {
            headerTitle: () => (
               <Header title="Dashboard" navigation={navigation}></Header>
            ),
         };
      },
   },
};

const Dashboard = createStackNavigator(screens, {
   defaultNavigationOptions: {
      headerStyle: {
         backgroundColor: "#6A0E00",
      },
      headerTitleAlign: "center",
      headerTintColor: "#fff",
   },
});

export default Dashboard;

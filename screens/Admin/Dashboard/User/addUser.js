import React, { Component } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";

import { Form, Item, Input, Label, Picker, Icon } from "native-base";

export default class addUser extends Component {
   constructor(props) {
      super(props);
      this.state = {
         overlayLoading: false,
      };
   }
   render() {
      return (
         <ScrollView style={styles.container}>
            <View style={styles.bodyContainer}>
               <Text
                  style={{
                     fontSize: 20,
                     textAlign: "center",
                     marginBottom: 10,
                  }}
               >
                  Add user Screen
               </Text>
            </View>
         </ScrollView>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingHorizontal: 10,
      paddingTop: 10,
   },
   bodyContainer: {
      paddingTop: 10,
      marginVertical: 5,
      flex: 1,
      paddingBottom: 50,
   },
});

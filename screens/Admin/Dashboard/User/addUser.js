import React, { Component, useEffect, useState } from "react";
import {
   Text,
   StyleSheet,
   View,
   ScrollView,
   ActivityIndicator,
} from "react-native";

import { Form, Item, Input, Label, Picker, Icon } from "native-base";

import {
   Provider,
   Portal,
   Dialog,
   DefaultTheme,
   Button,
} from "react-native-paper";

const index = () => {
   const [overlayLoading, setOverlayLoading] = useState(false);
   const [dialog, setDialog] = useState(false);
   const [userInfo, setUserInfo] = useState({
      name: "",
      password: "",
      confirmPassword: "",
   });
   const [passwordError, setPasswordError] = useState(false);
   const [branch, setBranch] = useState([]);

   useEffect(() => {
      if (userInfo.password !== userInfo.confirmPassword) {
         setPasswordError(true);
      } else {
         setPasswordError(false);
      }
   }, [userInfo]);

   const onHandleChangeText = (value, nameInput) => {
      setUserInfo({
         ...userInfo,
         [nameInput]: value,
      });
   };

   const onAdd = () => {
      if (passwordError || userInfo.name.length === 0) {
         setDialog(false);
         alert("Can not add!!!");
         return;
      } else {
         setDialog(false);
         console.log(userInfo);
         alert("User Add");
      }
   };

   const theme = {
      ...DefaultTheme,
   };

   return (
      <Provider theme={theme}>
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
               <Form>
                  <Item floatingLabel>
                     <Label>Name</Label>
                     <Input
                        onChangeText={(value) =>
                           onHandleChangeText(value, "name")
                        }
                     />
                  </Item>
                  <View>
                     <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                           secureTextEntry={true}
                           onChangeText={(value) =>
                              onHandleChangeText(value, "password")
                           }
                        />
                     </Item>
                     {passwordError && (
                        <Text style={styles.passwordError}>
                           Password and Confirm Password does not match.
                        </Text>
                     )}
                  </View>
                  <View>
                     <Item floatingLabel last>
                        <Label>Confirm Password</Label>
                        <Input
                           secureTextEntry={true}
                           onChangeText={(value) =>
                              onHandleChangeText(value, "confirmPassword")
                           }
                        />
                     </Item>
                     {passwordError && (
                        <Text style={styles.passwordError}>
                           Password and Confirm Password does not match.
                        </Text>
                     )}
                  </View>
                  <View style={styles.branchContainer}>
                     <Text style={{ fontSize: 17 }}>Branch :</Text>
                  </View>
               </Form>
               <View
                  style={{
                     flexDirection: "row",
                     justifyContent: "space-around",
                     marginTop: 25,
                  }}
               >
                  <Button
                     mode="outlined"
                     onPress={() => {
                        setDialog(true);
                     }}
                     uppercase={false}
                     color="#0275D8"
                     style={{
                        borderColor: "#0275D8",
                        borderWidth: 1,
                        width: 150,
                     }}
                  >
                     Add
                  </Button>
               </View>
            </View>
         </ScrollView>

         {/* Dialog */}
         <Portal>
            <Dialog
               visible={dialog}
               onDismiss={() => {
                  setDialog(false);
               }}
            >
               <Dialog.Content>
                  <Text>Are you sure you want to proceed?</Text>
               </Dialog.Content>
               <Dialog.Actions style={{ marginTop: -20 }}>
                  <Button
                     onPress={() => {
                        setDialog(false);
                     }}
                     uppercase={false}
                  >
                     Cancel
                  </Button>
                  <Button onPress={onAdd} uppercase={false}>
                     Confirm
                  </Button>
               </Dialog.Actions>
            </Dialog>
         </Portal>

         {/* OverLay Loading */}
         <Portal>
            <Dialog
               visible={overlayLoading}
               dismissable={false}
               style={{ backgroundColor: "transparent", elevation: 0 }}
            >
               <ActivityIndicator size="large" color="red"></ActivityIndicator>
            </Dialog>
         </Portal>
      </Provider>
   );
};

export default index;

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
   passwordError: {
      color: "red",
      paddingLeft: 15,
      marginTop: 5,
   },
   branchContainer: {
      marginTop: 10,
      paddingLeft: 14,
      flexDirection: "row",
   },
});

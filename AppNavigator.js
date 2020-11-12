import React, { Component } from "react";
import {
   Text,
   StyleSheet,
   View,
   KeyboardAvoidingView,
   Modal,
   TouchableOpacity,
   Image,
} from "react-native";

import { Form, Item, Input, Label, Spinner } from "native-base";

import { Ionicons } from "@expo/vector-icons";

// import Drawer
import AdminDrawer from "./routes/AdminDrawer";
import UserDrawer from "./routes/UserDrawer";

export default class AppNavigator extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isAdmin: true,
         isAuthed: false,
         modalLogin: true,
         loginSuccess: true,
      };
   }

   login = () => {
      this.setState({
         modalLogin: false,
         isAuthed: true,
      });
   };

   renderLogin() {
      const { loginSuccess } = this.state;
      return (
         <KeyboardAvoidingView
            style={styles.containerLogin}
            behavior="padding"
            keyboardVerticalOffset={Platform.OS === "android" ? -500 : 0}
         >
            <View style={styles.logoContainer}>
               <Image
                  source={require("./assets/logo.jpg")}
                  style={styles.logo}
               ></Image>
            </View>
            <Form style={styles.formLoginContainer}>
               <Item floatingLabel>
                  <Label>Username</Label>
                  <Input
                     style={styles.usernameInput}
                     // onChangeText={this.phoneLoginChange}
                  />
               </Item>

               <Item floatingLabel>
                  <Label>Password</Label>
                  <Input
                     style={styles.passwordInput}
                     secureTextEntry={true}
                     // onChangeText={this.passwordLoginChange}
                  />
               </Item>
               {!loginSuccess && (
                  <Text style={styles.loginFail}>No user found</Text>
               )}
               <TouchableOpacity onPress={this.login} style={styles.btnLogin}>
                  <Text style={styles.btnLoginText}>Login</Text>
               </TouchableOpacity>
            </Form>
         </KeyboardAvoidingView>
      );
   }

   render() {
      const { isAdmin, isAuthed, modalLogin } = this.state;

      if (!isAuthed && modalLogin) {
         return (
            <Modal animationType="slide" visible={modalLogin}>
               {this.renderLogin()}
            </Modal>
         );
      }

      if (isAdmin) return <AdminDrawer></AdminDrawer>;
      else return <UserDrawer></UserDrawer>;
   }
}

const styles = StyleSheet.create({
   logo: {
      width: 150,
      height: 150,
   },
   logoContainer: {
      alignItems: "center",
   },
   containerLogin: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 50,
   },
   formLoginContainer: {
      marginVertical: 20,
      flex: 2,
   },
   btnLogin: {
      backgroundColor: "darkslateblue",
      padding: 13,
      marginVertical: 20,
      width: 300,
      alignSelf: "center",
   },
   btnLoginText: {
      color: "#fff",
      fontSize: 17,
      textAlign: "center",
      fontWeight: "600",
   },
   usernameInput: {
      marginTop: 15,
      fontSize: 17,
   },
   passwordInput: {
      marginTop: 15,
      fontSize: 17,
   },
   loginFail: {
      color: "red",
      fontSize: 16,
      textAlign: "center",
      marginTop: 10,
   },
});

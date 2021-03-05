import React from "react";
import { useAuthDispatch, useAuthState, loginUser } from "./context";

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
import { Checkbox, Button } from "react-native-paper";

// import Drawer
import AdminDrawer from "./routes/Admin/AdminDrawer";
import UserDrawer from "./routes/User/UserDrawer";

// export default class AppNavigator extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isAdmin: false,
//       isAuthed: false,
//       modalLogin: true,
//       loginSuccess: true,
//       userInput: {
//         username: "",
//         password: "",
//       },
//     };
//     this.dispatch = useAuthDispatch();
//   }

//   login = ({ username, password }) => {
//     console.log({ username, password });
//     loginUser(this.dispatch, { username, password });
//     //  this.setState({
//     //    modalLogin: false,
//     //    isAuthed: true,
//     //  });
//   };

//   signOut = () => {
//     this.setState({
//       modalLogin: true,
//       isAuthed: false,
//     });
//   };

//   renderLogin() {
//     const { loginSuccess, isAdmin } = this.state;

//     return;
//   }

//   render() {
//     const { isAdmin, isAuthed, modalLogin } = this.state;
//     const authState = useAuthState();

//     console.log(authState);

//     if (!isAuthed && modalLogin) {
//       return (
//         <Modal animationType="slide" visible={modalLogin}>
//           {this.renderLogin()}
//         </Modal>
//       );
//     }
//   }
// }

const AppNavigator = () => {
  const authState = useAuthState();
  const dispatch = useAuthDispatch();

  console.log(authState);

  // return (
  //   <AdminDrawer
  //     screenProps={{ signOut: () => {}, username: "Admin" }}
  //   ></AdminDrawer>
  // );

  if (!authState.user) {
    return (
      <Modal animationType="slide" visible={true}>
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
                // onChangeText={(v) => {
                //   this.setState({
                //     userInput: {
                //       ...this.state.userInput,
                //       username: v,
                //     },
                //   });
                // }}
              />
            </Item>

            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                style={styles.passwordInput}
                secureTextEntry={true}
                // onChangeText={(v) => {
                //   this.setState({
                //     userInput: {
                //       ...this.state.userInput,
                //       password: v,
                //     },
                //   });
                // }}
              />
            </Item>

            {/* <View style={{ flexDirection: "row" }}>
              <Checkbox
                status={isAdmin ? "checked" : "unchecked"}
                onPress={() =>
                  this.setState({
                    isAdmin: !isAdmin,
                  })
                }
              />
              <Text style={{ paddingTop: 7 }}>Admin</Text>
            </View> */}
            {/* {!loginSuccess && (
              <Text style={styles.loginFail}>No user found</Text>
            )} */}
            <Button
              mode="outlined"
              onPress={() => {
                loginUser(dispatch, {
                  username: "admin",
                  password: "123",
                });
              }}
              uppercase={false}
              style={{
                borderColor: "#AA75F6",
                borderWidth: 1,
                alignSelf: "center",
                marginTop: 20,
                width: 160,
              }}
            >
              Login
            </Button>
          </Form>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
  console.log(authState.user);
  if (authState.user?.role === "admin")
    return (
      <AdminDrawer
        screenProps={{ signOut: () => {}, username: "Admin" }}
      ></AdminDrawer>
    );
  else
    return (
      <UserDrawer
        screenProps={{ signOut: () => {}, username: "User" }}
      ></UserDrawer>
    );
};

export default AppNavigator;

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

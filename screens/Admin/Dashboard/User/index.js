import React, { Component } from "react";
import {
   Text,
   StyleSheet,
   View,
   ScrollView,
   TouchableOpacity,
   RefreshControl,
   ActivityIndicator,
} from "react-native";

import {
   DataTable,
   Provider,
   Portal,
   Modal,
   Dialog,
   DefaultTheme,
   Button,
} from "react-native-paper";

import { AntDesign } from "@expo/vector-icons";

export default class index extends Component {
   constructor(props) {
      super(props);
      this.state = {
         refreshing: false,
         loading: true,
         overlayLoading: false,
         dialog: false,
         modalUser: false,
         action: "",
         userInfo: {
            name: "",
            branch: "",
         },
         userList: [
            {
               name: "Kok",
               branch: "No where",
            },
            {
               name: "Hello",
               branch: "No Name",
            },
            {
               name: "Dara",
               branch: "No where",
            },
         ],
      };
   }

   componentDidMount() {
      this.fetchAPI();
   }

   fetchAPI = () => {
      setTimeout(() => {
         this.setState({
            loading: false,
            refreshing: false,
         });
      }, 1000);
   };

   showUserInfo = (r) => {
      this.onToggleModalUser();
      this.setState({
         userInfo: r,
      });
   };

   onRefresh = () => {
      this.setState(
         {
            refreshing: true,
         },
         () => this.fetchAPI()
      );
   };

   onToggleModalUser = () => {
      this.setState({
         modalUser: !this.state.modalUser,
      });
   };

   onDelete = () => {
      this.setState({
         dialog: false,
         action: "",
         modalUser: false,
      });
      alert("Delete");
      console.log(this.state.userInfo);
   };

   onProceed = () => {
      const { action } = this.state;
      if (action === "delete") this.onDelete();
   };

   renderUserList() {
      const { userList } = this.state;
      return (
         <View>
            {userList.map((r, i) => {
               return (
                  <TouchableOpacity
                     key={i}
                     onPress={() => this.showUserInfo(r)}
                  >
                     <DataTable.Row>
                        <DataTable.Cell>{r.name}</DataTable.Cell>
                        <DataTable.Cell numeric>{r.branch}</DataTable.Cell>
                     </DataTable.Row>
                  </TouchableOpacity>
               );
            })}
         </View>
      );
   }

   render() {
      const {
         loading,
         refreshing,
         overlayLoading,
         dialog,
         modalUser,
         userInfo,
      } = this.state;
      const theme = {
         ...DefaultTheme,
      };
      return (
         <Provider theme={theme}>
            <ScrollView
               style={styles.container}
               refreshControl={
                  <RefreshControl
                     refreshing={refreshing}
                     onRefresh={this.onRefresh}
                  ></RefreshControl>
               }
            >
               <Text style={styles.headerText}> Star Light Resort </Text>

               <View style={styles.bodyContainer}>
                  <Text
                     style={{
                        fontSize: 20,
                        textAlign: "center",
                        marginBottom: 10,
                     }}
                  >
                     User
                  </Text>
                  <DataTable>
                     <DataTable.Header style={{ color: "red" }}>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title numeric>Branch</DataTable.Title>
                     </DataTable.Header>

                     {loading && (
                        <ActivityIndicator
                           color="red"
                           size="large"
                           style={{ marginTop: 50 }}
                        ></ActivityIndicator>
                     )}

                     {!loading && this.renderUserList()}
                  </DataTable>

                  <Button
                     mode="outlined"
                     onPress={() => this.props.navigation.navigate("addUser")}
                     uppercase={false}
                     style={{
                        borderColor: "#AA75F6",
                        borderWidth: 1,
                        alignSelf: "center",
                        marginTop: 20,
                     }}
                  >
                     Add User
                  </Button>
               </View>
            </ScrollView>

            {/* Modal */}
            <Portal>
               {/* Dialog */}
               <Portal>
                  <Dialog
                     visible={dialog}
                     onDismiss={() =>
                        this.setState({ dialog: false, action: "" })
                     }
                  >
                     <Dialog.Content>
                        <Text>Are you sure you want to proceed?</Text>
                     </Dialog.Content>
                     <Dialog.Actions style={{ marginTop: -20 }}>
                        <Button
                           onPress={() =>
                              this.setState({ dialog: false, action: "" })
                           }
                           uppercase={false}
                        >
                           Cancel
                        </Button>
                        <Button onPress={this.onProceed} uppercase={false}>
                           Confirm
                        </Button>
                     </Dialog.Actions>
                  </Dialog>
               </Portal>

               {/* Modal User */}
               <Modal
                  visible={modalUser}
                  onDismiss={this.onToggleModalUser}
                  contentContainerStyle={styles.modalUser}
               >
                  <TouchableOpacity
                     onPress={this.onToggleModalUser}
                     style={{
                        alignSelf: "flex-end",
                        marginRight: 15,
                        marginTop: -10,
                     }}
                  >
                     <AntDesign name="close" size={24} color="black" />
                  </TouchableOpacity>
                  <View>
                     <Text
                        style={{
                           marginBottom: 15,
                           textAlign: "center",
                           fontSize: 17,
                        }}
                     >
                        User
                     </Text>
                     <View>
                        <View style={styles.nameContainer}>
                           <Text style={[styles.biggerText, { flex: 1 }]}>
                              Name :
                           </Text>
                           <Text style={[styles.biggerText, { flex: 2 }]}>
                              {userInfo.name}
                           </Text>
                        </View>
                        <View style={styles.branchContainer}>
                           <Text style={[styles.biggerText, { flex: 1 }]}>
                              Branch :
                           </Text>
                           <Text style={[styles.biggerText, { flex: 2 }]}>
                              {userInfo.branch}
                           </Text>
                        </View>
                        <Button
                           mode="outlined"
                           onPress={() =>
                              this.setState({
                                 dialog: true,
                                 action: "delete",
                              })
                           }
                           uppercase={false}
                           color="#D9534F"
                           style={{
                              borderColor: "#D9534F",
                              width: 150,
                              alignSelf: "center",
                              marginTop: 20,
                           }}
                        >
                           Delete
                        </Button>
                     </View>
                  </View>
               </Modal>
            </Portal>
            {/* OverLay Loading */}
            <Portal>
               <Dialog
                  visible={overlayLoading}
                  dismissable={false}
                  style={{ backgroundColor: "transparent", elevation: 0 }}
               >
                  <ActivityIndicator
                     size="large"
                     color="red"
                  ></ActivityIndicator>
               </Dialog>
            </Portal>
         </Provider>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingHorizontal: 10,
      paddingTop: 10,
   },
   headerText: {
      fontWeight: "500",
      fontSize: 30,
   },
   bodyContainer: {
      paddingTop: 20,
      marginVertical: 5,
      flex: 1,
      paddingBottom: 50,
   },
   modalUser: {
      backgroundColor: "white",
      marginHorizontal: 20,
      paddingHorizontal: 20,
      marginTop: -100,
      borderRadius: 20,
      height: 280,
   },
   modalAddUser: {
      backgroundColor: "white",
      marginHorizontal: 20,
      paddingHorizontal: 20,
      marginTop: -100,
      borderRadius: 20,
      height: 360,
   },
   nameContainer: {
      flexDirection: "row",
      paddingLeft: 14,
      marginTop: 20,
   },
   branchContainer: {
      flexDirection: "row",
      paddingLeft: 14,
      marginTop: 20,
   },
   biggerText: {
      fontSize: 17,
   },
});

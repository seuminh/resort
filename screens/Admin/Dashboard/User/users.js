import React, { Component, useState, useEffect } from "react";
import {
   Text,
   StyleSheet,
   View,
   ScrollView,
   TouchableOpacity,
   RefreshControl,
   ActivityIndicator,
} from "react-native";

import { useAuthState } from "../../../../context";

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

const users = ({ navigation }) => {
   const authState = useAuthState();
   const [refreshing, setRefreshing] = useState(false);
   const [loading, setLoading] = useState(true);
   const [overlayLoading, setOverlayLoading] = useState(false);
   const [dialog, setDialog] = useState(false);
   const [modalUser, setModalUser] = useState(false);
   const [userInfo, setUserInfo] = useState({ name: "", branch: "", id: "" });

   const [userList, setUserList] = useState([]);

   const { branch, id } = navigation.state.params;
   useEffect(() => {
      fetchAPI();
   }, []);

   const fetchAPI = () => {
      fetch(`http://resort-api.herokuapp.com/api/v1/users?branch=${id}`, {
         headers: {
            Authorization: `Bearer ${authState.token}`,
         },
      })
         .then((res) => res.json())
         .then((data) => {
            setUserList(data.data);
            setLoading(false);
            setRefreshing(false);
         });
   };

   const onRefresh = () => {
      setRefreshing(true);
      fetchAPI();
   };

   const onDelete = () => {
      setOverlayLoading(true);
      setDialog(false);
      setModalUser(false);
      //   console.log(userInfo);

      fetch(`http://resort-api.herokuapp.com/api/v1/users/${userInfo.id}`, {
         method: "DELETE",
         headers: {
            Authorization: `Bearer ${authState.token}`,
         },
      })
         .then((res) => res.json())
         .then((data) => {
            if (data.success) {
               alert("Delete");
               setUserList(userList.filter((r) => r.id !== userInfo.id));
            }
            setOverlayLoading(false);
         });
   };

   const showUserInfo = (r) => {
      setModalUser(true);
      setUserInfo({
         name: r.username,
         branch: branch,
         id: r.id,
      });
   };

   const renderUserList = () => {
      return (
         <View>
            {userList.map((r, i) => {
               return (
                  <TouchableOpacity key={i} onPress={() => showUserInfo(r)}>
                     <DataTable.Row>
                        <DataTable.Cell>{r.username}</DataTable.Cell>
                        <DataTable.Cell numeric>{r.role}</DataTable.Cell>
                     </DataTable.Row>
                  </TouchableOpacity>
               );
            })}
         </View>
      );
   };

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
                  onRefresh={onRefresh}
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
                  {branch}
               </Text>
               <DataTable>
                  <DataTable.Header style={{ color: "red" }}>
                     <DataTable.Title>User</DataTable.Title>
                     <DataTable.Title numeric>Role</DataTable.Title>
                  </DataTable.Header>

                  {loading && (
                     <ActivityIndicator
                        color="red"
                        size="large"
                        style={{ marginTop: 50 }}
                     ></ActivityIndicator>
                  )}

                  {!loading && renderUserList()}
               </DataTable>

               <Button
                  mode="outlined"
                  onPress={() =>
                     navigation.navigate("addUser", { id: id, branch: branch })
                  }
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
                  onDismiss={() => {
                     setDialog(false);
                  }}
               >
                  <Dialog.Content>
                     <Text>Are you sure you want to proceed?</Text>
                  </Dialog.Content>
                  <Dialog.Actions style={{ marginTop: -20 }}>
                     <Button onPress={() => setDialog(false)} uppercase={false}>
                        Cancel
                     </Button>
                     <Button onPress={onDelete} uppercase={false}>
                        Confirm
                     </Button>
                  </Dialog.Actions>
               </Dialog>
            </Portal>

            {/* Modal User */}
            <Modal
               visible={modalUser}
               onDismiss={() => setModalUser(false)}
               contentContainerStyle={styles.modalUser}
            >
               <TouchableOpacity
                  onPress={() => setModalUser(false)}
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
                        onPress={() => setDialog(true)}
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
               <ActivityIndicator size="large" color="red"></ActivityIndicator>
            </Dialog>
         </Portal>
      </Provider>
   );
};

export default users;

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

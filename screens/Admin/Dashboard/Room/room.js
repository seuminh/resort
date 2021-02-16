import React, { Component, useEffect, useState } from "react";
import {} from "react-query";
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

import { Form, Item, Input, Label, Picker, Icon } from "native-base";

import { AntDesign } from "@expo/vector-icons";

// export default class income extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       refreshing: false,
//       loading: true,
//       overlayLoading: false,
//       branch: props.navigation.state.params.branch,
//       roomInfo: {
//         number: 0,
//         price: 0,
//       },
//       roomAddInfo: {},
//       modalRoom: false,
//       modalAddRoom: false,
//       dialog: false,
//       action: "",
//       roomList: [
// {
//   number: "101",
//   price: 20,
// },
// {
//   number: "102",
//   price: 20,
// },
// {
//   number: "103",
//   price: 20,
// },
// {
//   number: "104",
//   price: 20,
// },
//       ],
//     };
//   }

//   componentDidMount() {
//     this.fetchAPI();
//   }

//   fetchAPI = () => {
//     setTimeout(() => {
//       this.setState({
//         loading: false,
//         refreshing: false,
//       });
//     }, 1000);
//   };

//   onRefresh = () => {
//     this.setState(
//       {
//         refreshing: true,
//       },
//       () => this.fetchAPI()
//     );
//   };

//   onToggleModalAddRoom = () => {
//     this.setState({
//       modalAddRoom: !this.state.modalAddRoom,
//     });
//   };

//   onToggleModalRoom = () => {
//     this.setState({
//       modalRoom: !this.state.modalRoom,
//     });
//   };

// showRoomInfo = (r) => {
//   this.onToggleModalRoom();
//   this.setState({
//     roomInfo: r,
//   });
// };

// onUpdate = () => {
//   this.setState({
//     dialog: false,
//     action: "",
//     modalRoom: false,
//   });
//   alert("Update");
//   console.log(this.state.roomInfo);
// };

// onDelete = () => {
//   this.setState({
//     dialog: false,
//     action: "",
//     modalRoom: false,
//   });
//   alert("Delete");
//   console.log(this.state.roomInfo);
// };

// onAdd = () => {
//   this.setState({
//     dialog: false,
//     action: "",
//     modalAddRoom: false,
//   });
//   alert("Add");
//   console.log(this.state.roomAddInfo);
// };

// onProceed = () => {
//   const { action } = this.state;
//   if (action === "delete") this.onDelete();
//   else if (action === "update") this.onUpdate();
//   else if (action === "add") this.onAdd();
// };

// onHandleChangeText = (value, nameInput) => {
//   this.setState({
//     roomInfo: {
//       ...this.state.roomInfo,
//       [nameInput]: value,
//     },
//   });
// };

// onHandleChangeTextAdd = (value, nameInput) => {
//   this.setState({
//     roomAddInfo: {
//       ...this.state.roomAddInfo,
//       [nameInput]: value,
//     },
//   });
// };
// renderRoomList() {
//   const { roomList } = this.state;
//   return (
//     <View>
//       {roomList.map((r, i) => {
//         return (
//           <TouchableOpacity key={i} onPress={() => this.showRoomInfo(r)}>
//             <DataTable.Row>
//               <DataTable.Cell>{r.number}</DataTable.Cell>
//               <DataTable.Cell numeric>${r.price}</DataTable.Cell>
//             </DataTable.Row>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

//   render() {
//     const {
//       loading,
//       refreshing,
//       branch,
//       modalRoom,
//       modalAddRoom,
//       dialog,
//       roomInfo,
//       overlayLoading,
//     } = this.state;
// const theme = {
//   ...DefaultTheme,
// };
//     return (
// <Provider theme={theme}>
//   <ScrollView
//     style={styles.container}
//     refreshControl={
//       <RefreshControl
//         refreshing={refreshing}
//         onRefresh={this.onRefresh}
//       ></RefreshControl>
//     }
//   >
//     {/* <Text style={styles.headerText}> Star Light Resort </Text> */}

//     <View style={styles.bodyContainer}>
//       <Text
//         style={{
//           fontSize: 20,
//           textAlign: "center",
//           marginBottom: 10,
//         }}
//       >
//         {branch}
//       </Text>
//       <DataTable>
//         <DataTable.Header style={{ color: "red" }}>
//           <DataTable.Title>Room No</DataTable.Title>
//           <DataTable.Title numeric>Price</DataTable.Title>
//         </DataTable.Header>

//         {loading && (
//           <ActivityIndicator
//             color="red"
//             size="large"
//             style={{ marginTop: 50 }}
//           ></ActivityIndicator>
//         )}

//         {!loading && this.renderRoomList()}
//       </DataTable>

//       <Button
//         mode="outlined"
//         onPress={this.onToggleModalAddRoom}
//         uppercase={false}
//         style={{
//           borderColor: "#AA75F6",
//           borderWidth: 1,
//           alignSelf: "center",
//           marginTop: 20,
//         }}
//       >
//         Add Room
//       </Button>
//     </View>
//   </ScrollView>

//   {/* Modal */}
//   <Portal>
//     {/* Dialog */}
//     <Portal>
//       <Dialog
//         visible={dialog}
//         onDismiss={() => this.setState({ dialog: false, action: "" })}
//       >
//         <Dialog.Content>
//           <Text>Are you sure you want to proceed?</Text>
//         </Dialog.Content>
//         <Dialog.Actions style={{ marginTop: -20 }}>
//           <Button
//             onPress={() => this.setState({ dialog: false, action: "" })}
//             uppercase={false}
//           >
//             Cancel
//           </Button>
//           <Button onPress={this.onProceed} uppercase={false}>
//             Confirm
//           </Button>
//         </Dialog.Actions>
//       </Dialog>
//     </Portal>
//     {/* Modal Add Room */}
//     <Modal
//       visible={modalAddRoom}
//       contentContainerStyle={styles.modalAddRoom}
//       onDismiss={this.onToggleModalAddRoom}
//     >
//       <TouchableOpacity
//         onPress={this.onToggleModalAddRoom}
//         style={{
//           alignSelf: "flex-end",
//           marginRight: 15,
//           marginTop: -10,
//         }}
//       >
//         <AntDesign name="close" size={24} color="black" />
//       </TouchableOpacity>
//       <View>
//         <Text
//           style={{
//             marginBottom: 15,
//             textAlign: "center",
//             fontSize: 17,
//           }}
//         >
//           Add Room
//         </Text>
//         <Form>
//           <Item floatingLabel>
//             <Label>Room Number</Label>
//             <Input
//               onChangeText={(value) =>
//                 this.onHandleChangeTextAdd(value, "number")
//               }
//             ></Input>
//           </Item>
//           <Item floatingLabel>
//             <Label>Price</Label>
//             <Input
//               keyboardType="numeric"
//               onChangeText={(value) =>
//                 this.onHandleChangeTextAdd(Number(value), "price")
//               }
//             ></Input>
//           </Item>
//           {/* Branch */}
//           <View style={styles.branchContainer}>
//             <Text style={[styles.biggerText, { flex: 1 }]}>Branch :</Text>
//             <Text style={[styles.biggerText, { flex: 2 }]}>{branch}</Text>
//           </View>
//           <Button
//             mode="outlined"
//             onPress={() =>
//               this.setState({
//                 dialog: true,
//                 action: "add",
//               })
//             }
//             uppercase={false}
//             color="#0275D8"
//             style={{
//               borderColor: "#0275D8",
//               width: 150,
//               alignSelf: "center",
//               marginTop: 20,
//             }}
//           >
//             Add
//           </Button>
//         </Form>
//       </View>
//     </Modal>
//     {/* Modal Room */}
//     <Modal
//       visible={modalRoom}
//       onDismiss={this.onToggleModalRoom}
//       contentContainerStyle={styles.modalRoom}
//     >
//       <TouchableOpacity
//         onPress={this.onToggleModalRoom}
//         style={{
//           alignSelf: "flex-end",
//           marginRight: 15,
//           marginTop: -10,
//         }}
//       >
//         <AntDesign name="close" size={24} color="black" />
//       </TouchableOpacity>
//       <View>
//         <Text
//           style={{
//             marginBottom: 15,
//             textAlign: "center",
//             fontSize: 17,
//           }}
//         >
//           Edit Room
//         </Text>
//         <Form>
//           <Item floatingLabel>
//             <Label>Room Number</Label>
//             <Input
//               value={roomInfo.number.toString()}
//               onChangeText={(value) =>
//                 this.onHandleChangeText(value, "number")
//               }
//             ></Input>
//           </Item>
//           <Item floatingLabel>
//             <Label>Price</Label>
//             <Input
//               value={roomInfo.price.toString()}
//               keyboardType="numeric"
//               onChangeText={(value) =>
//                 this.onHandleChangeText(Number(value), "price")
//               }
//             ></Input>
//           </Item>
//           <View
//             style={{
//               marginTop: 20,
//               flexDirection: "row",
//               justifyContent: "space-around",
//             }}
//           >
//             <Button
//               mode="outlined"
//               onPress={() =>
//                 this.setState({
//                   dialog: true,
//                   action: "update",
//                 })
//               }
//               uppercase={false}
//               color="#0275D8"
//               style={{ borderColor: "#0275D8" }}
//             >
//               Update
//             </Button>
//             <Button
//               mode="outlined"
//               onPress={() =>
//                 this.setState({
//                   dialog: true,
//                   action: "delete",
//                 })
//               }
//               uppercase={false}
//               color="#D9534F"
//               style={{ borderColor: "#D9534F" }}
//             >
//               Delete
//             </Button>
//           </View>
//         </Form>
//       </View>
//     </Modal>
//   </Portal>
//   {/* OverLay Loading */}
//   <Portal>
//     <Dialog
//       visible={overlayLoading}
//       dismissable={false}
//       style={{ backgroundColor: "transparent", elevation: 0 }}
//     >
//       <ActivityIndicator size="large" color="red"></ActivityIndicator>
//     </Dialog>
//   </Portal>
// </Provider>
//     );
//   }
// }

const index = ({ navigation }) => {
   const [refreshing, setRefreshing] = useState(false);
   const [loading, setLoading] = useState(true);
   const [overlayLoading, setOverlayLoading] = useState(false);
   const [branch, setBranch] = useState(navigation.state.params.branch);
   const [roomInfo, setRoomInfo] = useState({ number: 0, price: 0 });
   const [roomAddInfo, setRoomAddInfo] = useState({});
   const [modalRoom, setModalRoom] = useState(false);
   const [modalAddRoom, setModalAddRoom] = useState(false);
   const [dialog, setDialog] = useState(false);
   const [action, setAction] = useState("");
   const [roomList, setRoomList] = useState([
      {
         number: "101",
         price: 20,
      },
      {
         number: "102",
         price: 20,
      },
      {
         number: "103",
         price: 20,
      },
      {
         number: "104",
         price: 20,
      },
   ]);

   useEffect(() => {
      fetchAPI();
   }, []);

   const fetchAPI = () => {
      setTimeout(() => {
         setLoading(false);
         setRefreshing(false);
      }, 1000);
   };

   const onRefresh = () => {
      setRefreshing(true);
      fetchAPI();
   };

   const showRoomInfo = (r) => {
      setModalRoom(true);
      setRoomInfo(r);
   };

   const onUpdate = () => {
      setDialog(false);
      setAction("");
      setModalRoom(false);
      alert("Update");
      console.log(roomInfo);
   };

   const onDelete = () => {
      setDialog(false);
      setAction("");
      setModalRoom(false);
      alert("Delete");
      console.log(roomInfo);
   };

   const onAdd = () => {
      setDialog(false);
      setAction("");
      setModalAddRoom(false);
      alert("Add");
      console.log(roomAddInfo);
   };

   const onProceed = () => {
      if (action === "delete") onDelete();
      else if (action === "update") onUpdate();
      else if (action === "add") onAdd();
   };

   const onHandleChangeText = (value, nameInput) => {
      setRoomInfo({
         ...roomInfo,
         [nameInput]: value,
      });
   };

   const onHandleChangeTextAdd = (value, nameInput) => {
      setRoomAddInfo({
         ...roomAddInfo,
         [nameInput]: value,
      });
   };

   const renderRoomList = () => {
      return (
         <View>
            {roomList.map((r, i) => {
               return (
                  <TouchableOpacity key={i} onPress={() => showRoomInfo(r)}>
                     <DataTable.Row>
                        <DataTable.Cell>{r.number}</DataTable.Cell>
                        <DataTable.Cell numeric>${r.price}</DataTable.Cell>
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
            {/* <Text style={styles.headerText}> Star Light Resort </Text> */}

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
                     <DataTable.Title>Room No</DataTable.Title>
                     <DataTable.Title numeric>Price</DataTable.Title>
                  </DataTable.Header>

                  {loading && (
                     <ActivityIndicator
                        color="red"
                        size="large"
                        style={{ marginTop: 50 }}
                     ></ActivityIndicator>
                  )}

                  {!loading && renderRoomList()}
               </DataTable>

               <Button
                  mode="outlined"
                  onPress={() => setModalAddRoom(true)}
                  uppercase={false}
                  style={{
                     borderColor: "#AA75F6",
                     borderWidth: 1,
                     alignSelf: "center",
                     marginTop: 20,
                  }}
               >
                  Add Room
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
                     setAction("");
                  }}
               >
                  <Dialog.Content>
                     <Text>Are you sure you want to proceed?</Text>
                  </Dialog.Content>
                  <Dialog.Actions style={{ marginTop: -20 }}>
                     <Button
                        onPress={() => {
                           setDialog(false);
                           setAction("");
                        }}
                        uppercase={false}
                     >
                        Cancel
                     </Button>
                     <Button onPress={onProceed} uppercase={false}>
                        Confirm
                     </Button>
                  </Dialog.Actions>
               </Dialog>
            </Portal>
            {/* Modal Add Room */}
            <Modal
               visible={modalAddRoom}
               contentContainerStyle={styles.modalAddRoom}
               onDismiss={() => setModalAddRoom(false)}
            >
               <TouchableOpacity
                  onPress={() => setModalAddRoom(false)}
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
                     Add Room
                  </Text>
                  <Form>
                     <Item floatingLabel>
                        <Label>Room Number</Label>
                        <Input
                           onChangeText={(value) =>
                              onHandleChangeTextAdd(value, "number")
                           }
                        ></Input>
                     </Item>
                     <Item floatingLabel>
                        <Label>Price</Label>
                        <Input
                           keyboardType="numeric"
                           onChangeText={(value) =>
                              onHandleChangeTextAdd(Number(value), "price")
                           }
                        ></Input>
                     </Item>
                     {/* Branch */}
                     <View style={styles.branchContainer}>
                        <Text style={[styles.biggerText, { flex: 1 }]}>
                           Branch :
                        </Text>
                        <Text style={[styles.biggerText, { flex: 2 }]}>
                           {branch}
                        </Text>
                     </View>
                     <Button
                        mode="outlined"
                        onPress={() => {
                           setDialog(true);
                           setAction("add");
                        }}
                        uppercase={false}
                        color="#0275D8"
                        style={{
                           borderColor: "#0275D8",
                           width: 150,
                           alignSelf: "center",
                           marginTop: 20,
                        }}
                     >
                        Add
                     </Button>
                  </Form>
               </View>
            </Modal>
            {/* Modal Room */}
            <Modal
               visible={modalRoom}
               onDismiss={() => setModalRoom(false)}
               contentContainerStyle={styles.modalRoom}
            >
               <TouchableOpacity
                  onPress={() => setModalRoom(false)}
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
                     Edit Room
                  </Text>
                  <Form>
                     <Item floatingLabel>
                        <Label>Room Number</Label>
                        <Input
                           value={roomInfo.number.toString()}
                           onChangeText={(value) =>
                              onHandleChangeText(value, "number")
                           }
                        ></Input>
                     </Item>
                     <Item floatingLabel>
                        <Label>Price</Label>
                        <Input
                           value={roomInfo.price.toString()}
                           keyboardType="numeric"
                           onChangeText={(value) =>
                              onHandleChangeText(Number(value), "price")
                           }
                        ></Input>
                     </Item>
                     <View
                        style={{
                           marginTop: 20,
                           flexDirection: "row",
                           justifyContent: "space-around",
                        }}
                     >
                        <Button
                           mode="outlined"
                           onPress={() => {
                              setDialog(true);
                              setAction("update");
                           }}
                           uppercase={false}
                           color="#0275D8"
                           style={{ borderColor: "#0275D8" }}
                        >
                           Update
                        </Button>
                        <Button
                           mode="outlined"
                           onPress={() => {
                              setDialog(true);
                              setAction("delete");
                           }}
                           uppercase={false}
                           color="#D9534F"
                           style={{ borderColor: "#D9534F" }}
                        >
                           Delete
                        </Button>
                     </View>
                  </Form>
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

export default index;

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
      paddingTop: 10,
      marginVertical: 5,
      flex: 1,
      paddingBottom: 50,
   },
   modalRoom: {
      backgroundColor: "white",
      marginHorizontal: 20,
      paddingHorizontal: 20,
      marginTop: -100,
      borderRadius: 20,
      height: 340,
   },
   modalAddRoom: {
      backgroundColor: "white",
      marginHorizontal: 20,
      paddingHorizontal: 20,
      marginTop: -100,
      borderRadius: 20,
      height: 360,
   },
   biggerText: {
      fontSize: 17,
   },
   branchContainer: {
      flexDirection: "row",
      marginTop: 20,
      paddingLeft: 14,
   },
});

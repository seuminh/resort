import React, { Component } from "react";
import {
   Text,
   StyleSheet,
   View,
   ScrollView,
   ActivityIndicator,
   TouchableOpacity,
   RefreshControl,
} from "react-native";

import {
   DataTable,
   Modal,
   Portal,
   Provider,
   DefaultTheme,
   Button,
   Dialog,
} from "react-native-paper";
import { NavigationEvents } from "react-navigation";
import { AntDesign } from "@expo/vector-icons";

export default class index extends Component {
   state = {
      date: new Date(),
      loading: true,
      overlayLoading: false,
      refreshing: false,
      loadingExtend: false,
      disableExtend: false,
      loadingCheckOut: false,
      disableCheckOut: false,
      action: "",
      dialog: false,
      roomList: [
         {
            name: "Unknown",
            phone: "012233211",
            room: [101, 102],
            checkIn: new Date("12/29/2020"),
            length: 1,
         },
         {
            name: "Hello",
            phone: "0977009000",
            room: [103],
            checkIn: new Date("12/29/2020"),
            length: 1,
         },
         {
            name: "Hi",
            phone: "0977009000",
            room: [104],
            checkIn: new Date("01/07/2021"),
            length: 2,
         },
      ],
      modalCheckOut: false,
      checkOutInfo: {
         checkIn: new Date(),
         room: [],
      },
   };

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

   extend = () => {
      setTimeout(() => {
         this.setState({
            overlayLoading: false,
            loadingExtend: false,
            disableCheckOut: false,
         });
      }, 1000);
   };

   checkOut = () => {
      setTimeout(() => {
         this.setState({
            overlayLoading: false,
            loadingCheckOut: false,
            disableExtend: false,
         });
      }, 500);
   };

   onRefresh = () => {
      this.setState(
         {
            refreshing: true,
         },
         () => this.fetchAPI()
      );
   };

   onToggleModal = () => {
      this.setState({
         modalCheckOut: !this.state.modalCheckOut,
         loadingExtend: false,
         disableExtend: false,
         loadingCheckOut: false,
         disableCheckOut: false,
      });
   };

   onExtend = () => {
      this.setState(
         {
            dialog: false,
            loadingExtend: true,
            disableCheckOut: true,
            action: "",
            overlayLoading: true,
         },
         () => this.extend()
      );
   };

   onCheckOut = () => {
      this.setState(
         {
            dialog: false,
            disableExtend: true,
            loadingCheckOut: true,
            action: "",
            overlayLoading: true,
         },
         () => this.checkOut()
      );
   };

   onConfirmExtend = () => {
      this.setState({
         dialog: true,
         action: "extend",
      });
   };

   onConfirmCheckOut = () => {
      this.setState({
         dialog: true,
         action: "checkout",
      });
   };

   onProceed = () => {
      if (this.state.action === "extend") this.onExtend();
      else this.onCheckOut();
   };

   showCheckOutInfo = (r) => {
      this.onToggleModal();
      this.setState({
         checkOutInfo: r,
      });
   };

   renderRoomList() {
      const { roomList, date } = this.state;
      return (
         <View>
            {roomList.map((r, i) => {
               let backgroundColor = null;
               if (r.checkIn.getTime() - date.getTime() < 0)
                  backgroundColor = "#FCB941";

               return (
                  <TouchableOpacity
                     onPress={() => this.showCheckOutInfo(r)}
                     key={i}
                  >
                     <DataTable.Row
                        style={{
                           backgroundColor: backgroundColor,
                           marginBottom: 3,
                        }}
                     >
                        {r.name && <DataTable.Cell>{r.name}</DataTable.Cell>}
                        <DataTable.Cell numeric>{r.phone}</DataTable.Cell>
                        <DataTable.Cell numeric>
                           {r.room.toString()}
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                           {r.checkIn.toLocaleDateString()}
                        </DataTable.Cell>
                        <DataTable.Cell numeric>{r.length}</DataTable.Cell>
                     </DataTable.Row>
                  </TouchableOpacity>
               );
            })}
         </View>
      );
   }

   render() {
      const {
         date,
         loading,
         loadingCheckOut,
         disableCheckOut,
         disableExtend,
         loadingExtend,
         refreshing,
         modalCheckOut,
         checkOutInfo,
         dialog,
         overlayLoading,
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
               <NavigationEvents
                  onWillFocus={() => this.setState({ loading: true })}
                  onDidFocus={this.fetchAPI}
               />
               <Text style={styles.headerText}> Star Light Resort </Text>
               <View style={styles.subHeaderContainer}>
                  <Text style={styles.branchText}>SK branch</Text>
                  <Text>{date.toLocaleDateString()}</Text>
               </View>
               <View style={styles.bodyContainer}>
                  <Text
                     style={{
                        fontSize: 20,
                        textAlign: "center",
                        marginBottom: 10,
                     }}
                  >
                     Check out
                  </Text>
                  <DataTable>
                     <DataTable.Header style={{ color: "red" }}>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title numeric>Phone</DataTable.Title>
                        <DataTable.Title numeric>Room</DataTable.Title>
                        <DataTable.Title numeric>Check In</DataTable.Title>
                        <DataTable.Title numeric>Length</DataTable.Title>
                     </DataTable.Header>

                     {loading && (
                        <ActivityIndicator
                           color="red"
                           size="large"
                           style={{ marginTop: 50 }}
                        ></ActivityIndicator>
                     )}

                     {!loading && this.renderRoomList()}
                  </DataTable>
               </View>

               {/* Modal */}
               <Portal>
                  {/* Dialog */}
                  <Portal>
                     <Dialog
                        visible={dialog}
                        onDismiss={() => this.setState({ dialog: false })}
                     >
                        <Dialog.Content>
                           <Text>Are you sure you want to proceed?</Text>
                        </Dialog.Content>
                        <Dialog.Actions style={{ marginTop: -20 }}>
                           <Button
                              onPress={() => this.setState({ dialog: false })}
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
                  <Modal
                     dismissable={false}
                     visible={modalCheckOut}
                     contentContainerStyle={styles.modalCheckOut}
                  >
                     <TouchableOpacity
                        onPress={this.onToggleModal}
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
                              marginBottom: 30,
                              textAlign: "center",
                              fontSize: 17,
                           }}
                        >
                           Check out information
                        </Text>
                        <View style={styles.modalTextInfoContainer}>
                           <Text style={styles.modalTextInfo}>Name :</Text>
                           <Text style={styles.modalTextInfo}>
                              {checkOutInfo.name}
                           </Text>
                        </View>
                        <View style={styles.modalTextInfoContainer}>
                           <Text style={styles.modalTextInfo}>Phone :</Text>
                           <Text style={styles.modalTextInfo}>
                              {checkOutInfo.phone}
                           </Text>
                        </View>
                        <View style={styles.modalTextInfoContainer}>
                           <Text style={styles.modalTextInfo}>
                              Check in Date :{" "}
                           </Text>
                           <Text style={styles.modalTextInfo}>
                              {checkOutInfo.checkIn.toLocaleDateString()}
                           </Text>
                        </View>
                        <View style={styles.modalTextInfoContainer}>
                           <Text style={styles.modalTextInfo}>Room :</Text>
                           <Text style={styles.modalTextInfo}>
                              {checkOutInfo.room.toString()}
                           </Text>
                        </View>
                        <View style={styles.modalTextInfoContainer}>
                           <Text style={styles.modalTextInfo}>Length : </Text>
                           <Text style={styles.modalTextInfo}>
                              {checkOutInfo.length}
                           </Text>
                        </View>
                     </View>
                     <View
                        style={{
                           marginTop: 30,
                           flexDirection: "row",
                           justifyContent: "space-around",
                        }}
                     >
                        <Button
                           mode="outlined"
                           disabled={disableExtend}
                           onPress={this.onConfirmExtend}
                           uppercase={false}
                           loading={loadingExtend}
                           color="#0275D8"
                           style={{ borderColor: "#0275D8" }}
                        >
                           Extend
                        </Button>
                        <Button
                           disabled={disableCheckOut}
                           mode="outlined"
                           onPress={this.onConfirmCheckOut}
                           uppercase={false}
                           loading={loadingCheckOut}
                           color="#D9534F"
                           style={{ borderColor: "#D9534F" }}
                        >
                           Check out
                        </Button>
                     </View>
                  </Modal>
               </Portal>
            </ScrollView>
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
   branchText: {
      fontSize: 14,
      color: "#6A0E00",
      marginVertical: 8,
      paddingHorizontal: 7,
   },
   bodyContainer: {
      paddingTop: 8,
      marginVertical: 5,
      flex: 1,
      paddingBottom: 50,
   },
   subHeaderContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 8,
   },
   modalCheckOut: {
      backgroundColor: "white",
      marginHorizontal: 20,
      paddingHorizontal: 20,
      marginTop: -100,
      borderRadius: 20,
      height: 350,
   },
   modalTextInfo: {
      fontSize: 15,
      marginBottom: 10,
      flex: 1,
   },
   modalTextInfoContainer: {
      paddingHorizontal: 40,
      flexDirection: "row",
      justifyContent: "space-between",
   },
});

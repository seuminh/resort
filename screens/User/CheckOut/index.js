import React, { Component, useState, useEffect } from "react";
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
import { useAuthState } from "../../../context";

const index = () => {
   const authState = useAuthState();
   const [date, setDate] = useState(new Date());
   const [loading, setLoading] = useState(true);
   const [overlayLoading, setOverlayLoading] = useState(false);
   const [refreshing, setRefreshing] = useState(false);
   const [action, setAction] = useState("");
   const [dialog, setDialog] = useState(false);
   const [modalCheckOut, setModalCheckOut] = useState(false);
   const [checkOutInfo, setCheckOutInfo] = useState(null);

   const [roomList, setRoomList] = useState([]);

   useEffect(() => {
      fetchAPI();
   }, []);

   const fetchAPI = async () => {
      const data = await fetch(
         "http://resort-api.herokuapp.com/api/v1/reservations?status=checkIn&sort=endDate",
         {
            headers: {
               Authorization: `Bearer ${authState.token}`,
            },
         }
      ).then((res) => res.json());
      // console.log(data.data);
      // console.log(authState.user.branch.name);
      setRoomList(
         data.data.filter(
            (d) => d.room[0].branch.name === authState.user.branch.name
         )
      );
      setLoading(false);
      setRefreshing(false);
      // console.log(data);
   };

   const extend = () => {
      // setTimeout(() => {
      //   console.log(checkOutInfo);
      //   setOverlayLoading(false);
      // }, 1000);
   };

   const checkOut = async () => {
      const data = await fetch(
         `http://resort-api.herokuapp.com/api/v1/reservations/${checkOutInfo.id}/checkout`,
         {
            method: "PUT",
            headers: {
               Authorization: `Bearer ${authState.token}`,
               "Content-Type": "application/json",
            },
         }
      ).then((res) => res.json());
      if (data.success) {
         setOverlayLoading(false);
         setRoomList(roomList.filter((v) => v.id !== checkOutInfo.id));
         setModalCheckOut(false);
         alert("Success");
      }
   };

   const onRefresh = () => {
      setRefreshing(true);
      fetchAPI();
   };

   const onExtend = () => {
      setDialog(false);
      setAction("");
      setOverlayLoading(true);
      extend();
   };

   const onCheckOut = () => {
      setDialog(false);
      setAction("");
      setOverlayLoading(true);
      checkOut();
   };

   const onProceed = () => {
      if (action === "extend") onExtend();
      else onCheckOut();
   };

   const showCheckOutInfo = (r) => {
      console.log({ checkout: r });
      let length =
         (new Date(r.endDate) - new Date(r.startDate)) / (24 * 60 * 60 * 1000);
      let totalPrice = r.room.reduce((acc, r) => {
         return acc + r.price;
      }, 0);
      totalPrice *= length;
      setModalCheckOut(true);
      setCheckOutInfo({
         ...r,
         length,
         totalPrice,
      });
   };

   const renderRoomList = () => {
      return (
         <View>
            {roomList.length > 0 &&
               roomList.map((r, i) => {
                  let backgroundColor = null;
                  if (new Date(r.endDate).getTime() - date.getTime() < 0)
                     backgroundColor = "#FCB941";

                  return (
                     <TouchableOpacity
                        onPress={() => showCheckOutInfo(r)}
                        key={i}
                     >
                        <DataTable.Row
                           style={{
                              backgroundColor: backgroundColor,
                              marginBottom: 3,
                           }}
                        >
                           {r.customer.name && (
                              <DataTable.Cell>{r.customer.name}</DataTable.Cell>
                           )}
                           <DataTable.Cell numeric>
                              {`0${r.customer.phoneNumber}`}
                           </DataTable.Cell>
                           <DataTable.Cell numeric>
                              {r.room.map((v) => v.number).toString()}
                           </DataTable.Cell>
                           <DataTable.Cell numeric>
                              {new Date(r.startDate).toLocaleDateString()}
                           </DataTable.Cell>
                           <DataTable.Cell numeric>
                              {(new Date(r.endDate) - new Date(r.startDate)) /
                                 (24 * 60 * 60 * 1000)}
                           </DataTable.Cell>
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
            <NavigationEvents
               onWillFocus={() => setLoading(true)}
               onDidFocus={fetchAPI}
            />
            <Text style={styles.headerText}> Star Resort </Text>
            <View style={styles.subHeaderContainer}>
               <Text style={styles.branchText}>
                  {authState.user.branch.name}
               </Text>
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
                     <DataTable.Title>ឈ្មោះ</DataTable.Title>
                     <DataTable.Title numeric>លេខទូរស័ព្ទ</DataTable.Title>
                     <DataTable.Title numeric>បន្ទប់</DataTable.Title>
                     <DataTable.Title numeric>ថ្ងៃចូល</DataTable.Title>
                     <DataTable.Title numeric>រយះពេល</DataTable.Title>
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
            </View>

            {/* Modal */}
            {checkOutInfo && (
               <Portal>
                  {/* Dialog */}
                  <Portal>
                     <Dialog
                        visible={dialog}
                        onDismiss={() => setDialog(false)}
                     >
                        <Dialog.Content>
                           <Text>Are you sure you want to proceed?</Text>
                        </Dialog.Content>
                        <Dialog.Actions style={{ marginTop: -20 }}>
                           <Button
                              onPress={() => setDialog(false)}
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
                        onPress={() => setModalCheckOut(false)}
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
                           <Text style={styles.modalTextInfo}>ឈ្មោះ :</Text>
                           <Text style={styles.modalTextInfo}>
                              {checkOutInfo.customer.name}
                           </Text>
                        </View>
                        <View style={styles.modalTextInfoContainer}>
                           <Text style={styles.modalTextInfo}>
                              លេខទូរស័ព្ទ :
                           </Text>
                           <Text style={styles.modalTextInfo}>
                              {checkOutInfo.customer.phoneNumber}
                           </Text>
                        </View>
                        <View style={styles.modalTextInfoContainer}>
                           <Text style={styles.modalTextInfo}>ថ្ងៃចូល : </Text>
                           <Text style={styles.modalTextInfo}>
                              {new Date(
                                 checkOutInfo.startDate
                              ).toLocaleDateString()}
                           </Text>
                        </View>
                        <View style={styles.modalTextInfoContainer}>
                           <Text style={styles.modalTextInfo}>ថ្ងៃចេញ : </Text>
                           <Text style={styles.modalTextInfo}>
                              {new Date(
                                 checkOutInfo.endDate
                              ).toLocaleDateString()}
                           </Text>
                        </View>
                        <View style={styles.modalTextInfoContainer}>
                           <Text style={styles.modalTextInfo}>បន្ទប់ :</Text>
                           <Text style={styles.modalTextInfo}>
                              {checkOutInfo.room
                                 .map((v) => v.number)
                                 .toString()}
                           </Text>
                        </View>
                        <View style={styles.modalTextInfoContainer}>
                           <Text style={styles.modalTextInfo}>រយះពេល : </Text>
                           <Text style={styles.modalTextInfo}>
                              {checkOutInfo.length}
                           </Text>
                        </View>
                        <View style={styles.modalTextInfoContainer}>
                           <Text style={styles.modalTextInfo}>
                              តម្លៃ​សរុប :{" "}
                           </Text>
                           <Text style={styles.modalTextInfo}>
                              $ {checkOutInfo.totalPrice}
                           </Text>
                        </View>
                        <View style={styles.modalTextInfoContainer}>
                           <Text style={styles.modalTextInfo}>
                              បានទូរទាត់ :{" "}
                           </Text>
                           <Text style={styles.modalTextInfo}>
                              $ {checkOutInfo.paidPrice}
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
                        {/* <Button
                           mode="outlined"
                           onPress={() => {
                              setDialog(true);
                              setAction("extend");
                           }}
                           uppercase={false}
                           color="#0275D8"
                           style={{ borderColor: "#0275D8" }}
                        >
                           Extend
                        </Button> */}
                        <Button
                           mode="outlined"
                           onPress={() => {
                              setDialog(true);
                              setAction("checkout");
                           }}
                           uppercase={false}
                           color="#D9534F"
                           style={{ borderColor: "#D9534F" }}
                        >
                           Check out
                        </Button>
                     </View>
                  </Modal>
               </Portal>
            )}
         </ScrollView>
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
      height: 450,
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

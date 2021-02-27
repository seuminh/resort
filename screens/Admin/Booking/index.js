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

import { Picker } from "native-base";

import { DataTable } from "react-native-paper";
import { NavigationEvents } from "react-navigation";

import { useAuthState } from "../../../context";

const index = () => {
  const authState = useAuthState();
  const [dataFetch, setDataFetch] = useState([]);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [branch, setBranch] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(branch[0]);
  const [reservedRoom, setReservedRoom] = useState([]);

  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = async () => {
    const res = await fetch(
      "http://10.0.2.2:5000/api/v1/reservations?status=reserved&sort=endDate",
      {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      }
    ).then((res) => res.json());
    if (res.success) {
      let branch = [];
      res.data.forEach((v) => {
        const dataReturn = { ...v.room[0].branch, reservation: [{ ...v }] };

        if (branch.length > 0) {
          const foundIndex = branch.findIndex(
            (vd) => vd.name === v.room[0].branch.name
          );
          if (foundIndex != -1) {
            branch[foundIndex].reservation.push(v);
          } else {
            branch.push(dataReturn);
          }
        } else {
          branch.push(dataReturn);
        }
      });
      // setReservedRoom(res.data);
      setBranch(branch.map((v) => v.name));
      setReservedRoom(branch[0].reservation);
      setDataFetch(branch);
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchAPI();
  };

  const getRoomList = () => {
    return (
      <View>
        {reservedRoom.map((r, i) => {
          let backgroundColor = null;
          if (new Date(r.startDate).getTime() - date.getTime() < 0)
            backgroundColor = "#FCB941";

          return (
            <DataTable.Row
              key={i}
              style={{
                backgroundColor: backgroundColor,
                marginBottom: 3,
              }}
            >
              <DataTable.Cell>{r.customer.name}</DataTable.Cell>
              <DataTable.Cell numeric>{r.customer.phoneNumber}</DataTable.Cell>
              <DataTable.Cell numeric>
                {r.room.map((v) => v.number).toString()}
              </DataTable.Cell>
              <DataTable.Cell numeric>
                {new Date(r.startDate).toLocaleDateString()}
              </DataTable.Cell>
              <DataTable.Cell numeric>
                {" "}
                {(new Date(r.endDate) - new Date(r.startDate)) /
                  (24 * 60 * 60 * 1000)}
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </View>
    );
  };

  return (
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
      <Text style={styles.headerText}> Star Light Resort </Text>
      <View style={styles.subHeaderContainer}>
        <Picker
          mode="dropdown"
          style={{
            marginTop: -11,
          }}
          selectedValue={selectedBranch}
          onValueChange={(value) => setSelectedBranch(value)}
        >
          {branch.map((r, i) => {
            return <Picker.Item label={r} value={r} key={i} />;
          })}
        </Picker>
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
          Reserved Room
        </Text>
        <DataTable>
          <DataTable.Header>
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

          {!loading && getRoomList()}
        </DataTable>
      </View>
    </ScrollView>
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
});

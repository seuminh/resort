import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { FontAwesome, Feather } from "@expo/vector-icons";

export default class index extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Income */}
        <TouchableOpacity style={styles.incomeContainer}>
          <View style={styles.incomeIconContainer}>
            <FontAwesome name="dollar" size={24} color="#fff" />
          </View>
          <View style={styles.incomeTitleContainer}>
            <Text style={styles.incomeTitle}>Total Income</Text>
          </View>
          <View style={styles.incomeTotalContainer}>
            <Text style={styles.incomeTotal}>$122</Text>
          </View>
        </TouchableOpacity>

        {/* Guest */}
        <TouchableOpacity style={styles.guestContainer}>
          <View style={styles.guestIconContainer}>
            <Feather name="user" size={24} color="#fff" />
          </View>
          <View style={styles.guestTitleContainer}>
            <Text style={styles.guestTitle}>Total Guest</Text>
          </View>
          <View style={styles.guestTotalContainer}>
            <Text style={styles.guestTotal}>200</Text>
          </View>
        </TouchableOpacity>

        {/* Room */}
        <TouchableOpacity style={styles.roomContainer}>
          <View style={styles.roomIconContainer}>
            <FontAwesome name="hotel" size={24} color="#fff" />
          </View>
          <View style={styles.roomTitleContainer}>
            <Text style={styles.roomTitle}>Total Room</Text>
          </View>
          <View style={styles.roomTotalContainer}>
            <Text style={styles.roomTotal}>10</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: "#eee",
  },
  //   Income
  incomeContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    maxWidth: 400,
    borderRadius: 10,
    justifyContent: "space-between",
    paddingRight: 20,
    elevation: 5,
    marginBottom: 20,
  },
  incomeIconContainer: {
    padding: 20,
    backgroundColor: "#CA6A36",
    borderRadius: 5,
  },
  incomeTitleContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 20,
  },
  incomeTitle: {},
  incomeTotalContainer: {
    justifyContent: "center",
  },
  incomeTotal: {
    color: "#CA6A36",
  },
  //   Guest
  guestContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    maxWidth: 400,
    borderRadius: 10,
    justifyContent: "space-between",
    paddingRight: 20,
    marginBottom: 20,
    elevation: 5,
  },
  guestIconContainer: {
    padding: 20,
    backgroundColor: "darkslateblue",
    borderRadius: 5,
  },
  guestTitleContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 20,
  },
  guestTitle: {},
  guestTotalContainer: {
    justifyContent: "center",
  },
  guestTotal: {
    color: "darkslateblue",
  },
  //   Room
  roomContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    maxWidth: 400,
    borderRadius: 10,
    justifyContent: "space-between",
    paddingRight: 20,
    marginBottom: 20,
    elevation: 5,
  },
  roomIconContainer: {
    padding: 20,
    backgroundColor: "#6A0000",
    borderRadius: 5,
  },
  roomTitleContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 20,
  },
  roomTitle: {},
  roomTotalContainer: {
    justifyContent: "center",
  },
  roomTotal: {
    color: "#6A0000",
  },
});
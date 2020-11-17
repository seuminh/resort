import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

export default class RoomCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goDetail = () => {
    this.props.navigation.navigate("Detail");
  };

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.goDetail}>
        <Text> Card </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#aaa",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    marginVertical: 10,
  },
});

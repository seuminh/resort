import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import {
  DataTable,
  Modal,
  Portal,
  Provider,
  DefaultTheme,
  Dialog,
} from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

export default class income extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalSort: false,
    };
  }

  onToggleModalSort = () => {
    this.setState({
      modalSort: !this.state.modalSort,
    });
  };

  render() {
    const { modalSort } = this.state;
    const theme = {
      ...DefaultTheme,
    };
    return (
      <Provider theme={theme}>
        <ScrollView style={styles.container}>
          <Text style={styles.headerText}> Star Light Resort </Text>
          <View style={styles.sortByContainer}>
            <Text style={styles.sortByText}>Sort by:</Text>
            <TouchableOpacity onPress={this.onToggleModalSort}>
              <Text style={styles.sortByText}>Today</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Sort Modal */}
        <Portal>
          <Modal
            visible={modalSort}
            contentContainerStyle={styles.modalSort}
            onDismiss={this.onToggleModalSort}
          >
            <TouchableOpacity
              onPress={this.onToggleModalSort}
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
                Sort by Date
              </Text>
              <View>
                <Text>hi</Text>
                <Text>Hello</Text>
              </View>
            </View>
          </Modal>
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
  sortByContainer: {
    flexDirection: "row",
    marginVertical: 8,
  },
  sortByText: {
    fontSize: 15,
    marginVertical: 8,
    paddingLeft: 7,
  },
  modalSort: {
    backgroundColor: "white",
    marginHorizontal: 20,
    paddingHorizontal: 20,
    marginTop: -100,
    borderRadius: 20,
    height: 250,
  },
});

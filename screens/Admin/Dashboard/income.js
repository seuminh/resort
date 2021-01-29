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
import { AntDesign, Feather } from "@expo/vector-icons";

export default class income extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalSort: true,
      sort: "today",
    };
  }

  onToggleModalSort = () => {
    this.setState({
      modalSort: !this.state.modalSort,
    });
  };

  onSort = (value) => {
    this.setState({
      sort: value,
    });
  };

  render() {
    const { modalSort, sort } = this.state;
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
                <TouchableOpacity
                  style={styles.optionContainer}
                  onPress={() => this.onSort("today")}
                >
                  <View>
                    <Text
                      style={[
                        styles.option,
                        { color: sort === "today" ? "green" : "#000" },
                      ]}
                    >
                      Today
                    </Text>
                    <Text style={{ fontSize: 12, color: "#888" }}>
                      {new Date().toLocaleDateString()}
                    </Text>
                  </View>
                  {sort === "today" && (
                    <Feather name="check" size={24} color="green" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionContainer}
                  onPress={() => this.onSort("yesterday")}
                >
                  <View>
                    <Text
                      style={[
                        styles.option,
                        { color: sort === "yesterday" ? "green" : "#000" },
                      ]}
                    >
                      Yesterday
                    </Text>
                    <Text style={{ fontSize: 12, color: "#888" }}>Hello</Text>
                  </View>
                  {sort === "yesterday" && (
                    <Feather name="check" size={24} color="green" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionContainer}
                  onPress={() => this.onSort("lastWeek")}
                >
                  <View>
                    <Text
                      style={[
                        styles.option,
                        { color: sort === "lastWeek" ? "green" : "#000" },
                      ]}
                    >
                      Last week
                    </Text>
                    <Text style={{ fontSize: 12, color: "#888" }}>Hello</Text>
                  </View>
                  {sort === "lastWeek" && (
                    <Feather name="check" size={24} color="green" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionContainer}
                  onPress={() => this.onSort("lastMonth")}
                >
                  <View>
                    <Text
                      style={[
                        styles.option,
                        { color: sort === "lastMonth" ? "green" : "#000" },
                      ]}
                    >
                      Last month
                    </Text>
                    <Text style={{ fontSize: 12, color: "#888" }}>Hello</Text>
                  </View>
                  {sort === "lastMonth" && (
                    <Feather name="check" size={24} color="green" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionContainer}
                  onPress={() => this.onSort("thisMonth")}
                >
                  <View>
                    <Text
                      style={[
                        styles.option,
                        { color: sort === "thisMonth" ? "green" : "#000" },
                      ]}
                    >
                      This month
                    </Text>
                    <Text style={{ fontSize: 12, color: "#888" }}>Hello</Text>
                  </View>
                  {sort === "thisMonth" && (
                    <Feather name="check" size={24} color="green" />
                  )}
                </TouchableOpacity>
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
    height: 350,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  option: {
    fontSize: 15,
  },
});

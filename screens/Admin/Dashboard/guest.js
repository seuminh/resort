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

import {
  DataTable,
  Modal,
  Portal,
  Provider,
  DefaultTheme,
  Dialog,
} from "react-native-paper";
import { AntDesign, Feather } from "@expo/vector-icons";

// export default class income extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       modalSort: false,
//       sort: "today",
//       refreshing: false,
//       loading: true,
//       guestList: [
//   {
//     branch: "No where",
//     total: 2002,
//   },
//   {
//     branch: "Unknown",
//     total: 1681,
//   },
//   {
//     branch: "No Name",
//     total: 2020,
//   },
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

//   onToggleModalSort = () => {
//     this.setState({
//       modalSort: !this.state.modalSort,
//     });
//   };

//   onSort = (value) => {
//     this.setState({
//       sort: value,
//       modalSort: false,
//     });
//   };

//   renderGuestList() {
//     const { guestList } = this.state;
//     return (
//       <View>
//         {guestList.map((r, i) => {
//           return (
//             <DataTable.Row key={i}>
//               <DataTable.Cell>{r.branch}</DataTable.Cell>
//               <DataTable.Cell numeric style>
//                 {r.total}
//               </DataTable.Cell>
//             </DataTable.Row>
//           );
//         })}
//       </View>
//     );
//   }

//   render() {
//     const { modalSort, sort, loading, refreshing } = this.state;
//     const theme = {
//       ...DefaultTheme,
//     };
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
//     <Text style={styles.headerText}> Star Light Resort </Text>
//     <View style={styles.sortByContainer}>
//       <Text style={styles.sortByText}>Sort by:</Text>
//       <TouchableOpacity onPress={this.onToggleModalSort}>
//         <Text style={styles.sortByText}>{sort}</Text>
//       </TouchableOpacity>
//     </View>
//     <View style={styles.bodyContainer}>
//       <Text
//         style={{
//           fontSize: 20,
//           textAlign: "center",
//           marginBottom: 10,
//         }}
//       >
//         Guest
//       </Text>
//       <DataTable>
//         <DataTable.Header style={{ color: "red" }}>
//           <DataTable.Title>Branch</DataTable.Title>
//           <DataTable.Title numeric>Total</DataTable.Title>
//         </DataTable.Header>

//         {loading && (
//           <ActivityIndicator
//             color="red"
//             size="large"
//             style={{ marginTop: 50 }}
//           ></ActivityIndicator>
//         )}

//         {!loading && this.renderGuestList()}
//       </DataTable>
//     </View>
//   </ScrollView>

//   {/* Sort Modal */}
//   <Portal>
//     <Modal
//       visible={modalSort}
//       contentContainerStyle={styles.modalSort}
//       onDismiss={this.onToggleModalSort}
//     >
//       <TouchableOpacity
//         onPress={this.onToggleModalSort}
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
//             marginBottom: 30,
//             textAlign: "center",
//             fontSize: 17,
//           }}
//         >
//           Sort by Date
//         </Text>
//         <View>
//           <TouchableOpacity
//             style={styles.optionContainer}
//             onPress={() => this.onSort("today")}
//           >
//             <View>
//               <Text
//                 style={[
//                   styles.option,
//                   {
//                     color: sort === "today" ? "green" : "#000",
//                   },
//                 ]}
//               >
//                 Today
//               </Text>
//               <Text style={{ fontSize: 12, color: "#888" }}>
//                 {new Date().toLocaleDateString()}
//               </Text>
//             </View>
//             {sort === "today" && (
//               <Feather name="check" size={24} color="green" />
//             )}
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.optionContainer}
//             onPress={() => this.onSort("yesterday")}
//           >
//             <View>
//               <Text
//                 style={[
//                   styles.option,
//                   {
//                     color: sort === "yesterday" ? "green" : "#000",
//                   },
//                 ]}
//               >
//                 Yesterday
//               </Text>
//               <Text style={{ fontSize: 12, color: "#888" }}>Hello</Text>
//             </View>
//             {sort === "yesterday" && (
//               <Feather name="check" size={24} color="green" />
//             )}
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.optionContainer}
//             onPress={() => this.onSort("lastWeek")}
//           >
//             <View>
//               <Text
//                 style={[
//                   styles.option,
//                   {
//                     color: sort === "lastWeek" ? "green" : "#000",
//                   },
//                 ]}
//               >
//                 Last week
//               </Text>
//               <Text style={{ fontSize: 12, color: "#888" }}>Hello</Text>
//             </View>
//             {sort === "lastWeek" && (
//               <Feather name="check" size={24} color="green" />
//             )}
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.optionContainer}
//             onPress={() => this.onSort("lastMonth")}
//           >
//             <View>
//               <Text
//                 style={[
//                   styles.option,
//                   {
//                     color: sort === "lastMonth" ? "green" : "#000",
//                   },
//                 ]}
//               >
//                 Last month
//               </Text>
//               <Text style={{ fontSize: 12, color: "#888" }}>Hello</Text>
//             </View>
//             {sort === "lastMonth" && (
//               <Feather name="check" size={24} color="green" />
//             )}
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.optionContainer}
//             onPress={() => this.onSort("thisMonth")}
//           >
//             <View>
//               <Text
//                 style={[
//                   styles.option,
//                   {
//                     color: sort === "thisMonth" ? "green" : "#000",
//                   },
//                 ]}
//               >
//                 This month
//               </Text>
//               <Text style={{ fontSize: 12, color: "#888" }}>Hello</Text>
//             </View>
//             {sort === "thisMonth" && (
//               <Feather name="check" size={24} color="green" />
//             )}
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   </Portal>
// </Provider>
//     );
//   }
// }

const index = () => {
  const [modalSort, setModalSort] = useState(false);
  const [sort, setSort] = useState("today");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [guestList, setGuestList] = useState([
    {
      branch: "No where",
      total: 2002,
    },
    {
      branch: "Unknown",
      total: 1681,
    },
    {
      branch: "No Name",
      total: 2020,
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

  const onSort = (value) => {
    setSort(value);
    setModalSort(false);
  };

  const renderGuestList = () => {
    return (
      <View>
        {guestList.map((r, i) => {
          return (
            <DataTable.Row key={i}>
              <DataTable.Cell>{r.branch}</DataTable.Cell>
              <DataTable.Cell numeric>${r.total}</DataTable.Cell>
            </DataTable.Row>
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
        <View style={styles.sortByContainer}>
          <Text style={styles.sortByText}>Sort by:</Text>
          <TouchableOpacity onPress={() => setModalSort(true)}>
            <Text style={styles.sortByText}>{sort}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bodyContainer}>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Guest
          </Text>
          <DataTable>
            <DataTable.Header style={{ color: "red" }}>
              <DataTable.Title>Branch</DataTable.Title>
              <DataTable.Title numeric>Total</DataTable.Title>
            </DataTable.Header>

            {loading && (
              <ActivityIndicator
                color="red"
                size="large"
                style={{ marginTop: 50 }}
              ></ActivityIndicator>
            )}

            {!loading && renderGuestList()}
          </DataTable>
        </View>
      </ScrollView>

      {/* Sort Modal */}
      <Portal>
        <Modal
          visible={modalSort}
          contentContainerStyle={styles.modalSort}
          onDismiss={() => setModalSort(false)}
        >
          <TouchableOpacity
            onPress={() => setModalSort(false)}
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
                onPress={() => onSort("today")}
              >
                <View>
                  <Text
                    style={[
                      styles.option,
                      {
                        color: sort === "today" ? "green" : "#000",
                      },
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
                onPress={() => onSort("yesterday")}
              >
                <View>
                  <Text
                    style={[
                      styles.option,
                      {
                        color: sort === "yesterday" ? "green" : "#000",
                      },
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
                onPress={() => onSort("lastWeek")}
              >
                <View>
                  <Text
                    style={[
                      styles.option,
                      {
                        color: sort === "lastWeek" ? "green" : "#000",
                      },
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
                onPress={() => onSort("lastMonth")}
              >
                <View>
                  <Text
                    style={[
                      styles.option,
                      {
                        color: sort === "lastMonth" ? "green" : "#000",
                      },
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
                onPress={() => onSort("thisMonth")}
              >
                <View>
                  <Text
                    style={[
                      styles.option,
                      {
                        color: sort === "thisMonth" ? "green" : "#000",
                      },
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
    paddingTop: 8,
    marginVertical: 5,
    flex: 1,
    paddingBottom: 50,
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

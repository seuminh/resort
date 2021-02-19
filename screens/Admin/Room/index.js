import React, { Component, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "native-base";

import Card from "../../../components/RoomCard";
import { NavigationEvents } from "react-navigation";

// export default class index extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       dateModal: false,
//       date: new Date(),
//       loading: true,
//       refreshing: false,
//     };
//   }

//   toggleDateModal = () => {
//     this.setState({
//       dateModal: !this.state.dateModal,
//     });
//   };

// handleConfirm = (date) => {
//   this.setState(
//     {
//       date: new Date(date),
//       dateModal: !this.state.dateModal,
//       loading: true,
//     },
//     () => {
//       this.fetchRoom();
//     }
//   );
// };

// fetchRoom = () => {
//   setTimeout(() => {
//     this.setState({
//       loading: false,
//       refreshing: false,
//     });
//   }, 500);
// };

// onRefresh = () => {
//   this.setState(
//     {
//       refreshing: true,
//     },
//     () => this.fetchRoom()
//   );
// };

//   componentDidMount() {
//     this.fetchRoom();
//   }

//   render() {
//     const { dateModal, date, loading, refreshing } = this.state;
//     return (
// <ScrollView
//   style={styles.container}
//   refreshControl={
//     <RefreshControl
//       refreshing={refreshing}
//       onRefresh={this.onRefresh}
//     ></RefreshControl>
//   }
// >
//   <NavigationEvents
//     onWillFocus={() => this.setState({ loading: true })}
//     onDidFocus={this.fetchRoom}
//   />
//   <Text style={styles.headerText}> Star Light Resort </Text>
//   <View style={styles.subHeaderContainer}>
//     <Text style={styles.branchText}>SK branch</Text>
//     <TouchableOpacity onPress={this.toggleDateModal}>
//       <Text>Select Date</Text>
//     </TouchableOpacity>
//   </View>
//   <View style={styles.selectedDate}>
//     <Text>{date.toLocaleDateString()}</Text>
//   </View>

//   <View style={styles.bodyContainer}>
//     {!loading && (
//       <View style={styles.cardContainer}>
//         <Card status="busy"></Card>
//         <Card status="available"></Card>
//         <Card status="available"></Card>
//         <Card status="reserved"></Card>
//         <Card status="available"></Card>
//         <Card status="available"></Card>
//       </View>
//     )}

//     {loading && (
//       <ActivityIndicator color="red" size="large"></ActivityIndicator>
//     )}
//   </View>

//   {/* Modal */}
//   <DateTimePickerModal
//     isVisible={dateModal}
//     mode="date"
//     onConfirm={this.handleConfirm}
//     onCancel={this.toggleDateModal}
//     date={new Date()}
//     isDarkModeEnabled={false}
//   />
// </ScrollView>
//     );
//   }
// }

const index = () => {
  const [dateModal, setDateModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [branch, setBranch] = useState(["hi", "Hello"]);
  const [selectedBranch, setSelectedBranch] = useState(branch[0]);

  useEffect(() => {
    fetchRoom();
  }, []);

  const fetchRoom = () => {
    setTimeout(() => {
      setLoading(false);
      setRefreshing(false);
    }, 500);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchRoom();
  };

  const handleConfirm = (date) => {
    setDate(date);
    setDateModal(false);
    setLoading(true);
    fetchRoom();
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
        onDidFocus={fetchRoom}
      />
      <Text style={styles.headerText}> Star Light Resort </Text>
      <View style={styles.subHeaderContainer}>
        <Text>
          <Picker
            mode="dropdown"
            style={{
              marginTop: -11,
              marginLeft: -15,
            }}
            selectedValue={selectedBranch}
            onValueChange={(value) => setSelectedBranch(value)}
          >
            {branch.map((r, i) => {
              return <Picker.Item label={r} value={r} key={i} />;
            })}
          </Picker>
        </Text>
        <TouchableOpacity onPress={() => setDateModal(true)}>
          <Text>Select Date</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.selectedDate}>
        <Text>{date.toLocaleDateString()}</Text>
      </View>

      <View style={styles.bodyContainer}>
        {!loading && (
          <View style={styles.cardContainer}>
            <Card status="busy"></Card>
            <Card status="available"></Card>
            <Card status="available"></Card>
            <Card status="reserved"></Card>
            <Card status="available"></Card>
            <Card status="available"></Card>
          </View>
        )}

        {loading && (
          <ActivityIndicator color="red" size="large"></ActivityIndicator>
        )}
      </View>

      {/* Modal */}
      <DateTimePickerModal
        isVisible={dateModal}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDateModal(false)}
        date={new Date()}
        isDarkModeEnabled={false}
      />
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
  subHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    paddingHorizontal: 7,
  },
  selectedDate: {
    paddingHorizontal: 7,
    alignSelf: "flex-end",
    marginTop: -13,
  },
  bodyContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
});

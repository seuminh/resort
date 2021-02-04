import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Header = ({ navigation, title }) => {
   const openDrawer = () => {
      navigation.openDrawer();
   };
   return (
      <View style={styles.header}>
         <MaterialIcons
            onPress={openDrawer}
            name="menu"
            size={30}
            style={styles.iconLeft}
         ></MaterialIcons>
         <Text style={styles.headerText}>{title}</Text>
      </View>
   );
};

export default Header;

const screenWidth = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
   header: {
      flex: 1,
      width: screenWidth,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
   },
   headerText: {
      color: "#fff",
      fontSize: 20,
      letterSpacing: 1,
   },
   iconLeft: {
      color: "#fff",
      position: "absolute",
      left: 17,
   },
});

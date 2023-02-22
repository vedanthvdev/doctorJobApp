import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MainContainer = ({ navigation }) => {
  return (
    <ImageBackground style={styles.container}>
      <View style={styles.navContainer}>
        <TouchableOpacity
          style={styles.navSelection}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Ionicons name="home-outline" style={styles.icons} />

          <Text style={styles.navSelectionText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navSelection}
          onPress={() => {
            navigation.navigate("Jobs");
          }}
        >
          <Ionicons style={styles.icons} name="key-outline" />

          <Text style={styles.navSelectionText}>All Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navSelection}
          onPress={() => {
            navigation.navigate("RegisterJob");
          }}
        >
          <Ionicons style={styles.icons} name="key-outline" />

          <Text style={styles.navSelectionText}>Add Job</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navSelection}
          onPress={() => {
            navigation.navigate("UserJobs");
          }}
        >
          <Ionicons style={styles.icons} name="key-outline" />

          <Text style={styles.navSelectionText}>View My Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navSelection}
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          <Ionicons style={styles.icons} name="settings-outline" />

          <Text style={styles.navSelectionText}>Setting</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default MainContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navContainer: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 12,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    borderColor: "#ccc",
    borderWidth: 2,
    justifyContent: "space-around",
  },
  navSelection: {
    padding: 0,
    alignItems: "center",
  },
  navSelectionText: {
    fontSize: 13,
    padding: 10,
    fontWeight: "bold",
    color: "#000000e6",
  },
  icons: {
    fontSize: 30,
    paddingTop: 4,
    fontWeight: "bold",
    color: "grey",
  },
});

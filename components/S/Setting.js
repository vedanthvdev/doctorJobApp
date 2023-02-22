import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import MainContainer from "../mainContainer";
import { ipAddress } from "../../address";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Setting({ navigation }) {
  const [user, setUser] = useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      await fetch("http://" + ipAddress + ":3000/api/getuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: await AsyncStorage.getItem("userId"),
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          setUser(responseData[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [navigation]);

  async function submitHandler() {
    await AsyncStorage.removeItem("isLoggedIn");
    await AsyncStorage.removeItem("userId");

    navigation.navigate("LoginPage");
  }

  return (
    <ImageBackground style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            submitHandler();
          }}
        >
          <Text style={styles.logoutButtonText}>logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.userText}> Welcome, {user.u_lastname}</Text>
      </View>

      <MainContainer navigation={navigation} />
    </ImageBackground>
  );
}

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "rgba(255, 2, 255, 0.9)",
  },
  logoutButton: {
    width: "80%",
    padding: 14,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 16,
    backgroundColor: "#6be96f",
    alignItems: "center",
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000e6",
  },
  userText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000e6",
  },
});

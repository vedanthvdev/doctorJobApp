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
import { ipAddress } from "../../address";

function ForgotPassword() {
  const [regEmail, setRegEmail] = useState("");

  return (
    <ImageBackground style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formContainerText}>Forgot Password</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="ios-mail" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Email*"
            value={regEmail}
            onChangeText={(value) => setRegEmail(value)}
          />
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            submitHandler();
          }}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainerText: {
    position: "relative",
    padding: 9,
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: "#000000e6",
  },
  forgotPassword: {
    color: "rgba(255, 255, 255, 0.7)",
    alignItems: "center",
  },
  inputContainer: {
    position: "relative",
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
    marginLeft: 18,
    marginRight: 18,

    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#ccc",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
  },
  submitButton: {
    padding: 14,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 16,
    width: "90%",
    backgroundColor: "#6be96f",
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000e6",
  },
  errorValue: {
    fontSize: 14,
    textAlign: "center",
    top: 5,
    fontWeight: "bold",
    color: "#FF0000",
  },
  radioButtonOption: {
    position: "relative",
    flexDirection: "coloumn",
    alignItems: "center",
  },
  radioButtonContainer: {
    flexDirection: "coloumn",
    justifyContent: "space-between",
  },
});

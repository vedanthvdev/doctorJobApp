import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";

// import { IonItem, IonLabel, IonSpinner } from "@ionic/react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ipAddress } from "../../address";
import * as LocalAuthentication from "expo-local-authentication";

// --------------********-----------------------------------

const Login = ({ navigation }) => {
  const [details, setDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState();
  const [spinner, setSpinner] = useState(false);

  const handleChange = (key, value) => {
    setDetails({ ...details, [key]: value });
  };
  const [theme, setTheme] = useState(null);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  React.useEffect(() => {
    setDetails({ email: "", password: "" });
  }, [navigation]);

  React.useEffect(() => {
    async function fetchData() {
      const storedTheme = await AsyncStorage.getItem("theme");
      setTheme(storedTheme || "Light");
    }
    fetchData();
  }, []);

  const toggleTheme = (e) => {
    setTheme((current) => (current === "Light" ? "Dark" : "Light"));
    AsyncStorage.setItem("theme", theme === "Light" ? "Dark" : "Light");
  };

  const submitHandler = () => {
    setSpinner(true);
    LoginUser(details);
    setTimeout(() => {
      setError("");
    }, 1000);
  };

  const LoginUser = (details) => {
    fetch(ipAddress + "/api/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: details.email,
        password: details.password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        if (!responseData.message) {
          loginSuccess(responseData);
        } else {
          console.log("The details don't match");
          setError("The details don't match");
        }
        setSpinner(false);
      })
      .catch((error) => console.error(error));
  };

  async function loginSuccess(response) {
    console.log("Successfully Logged in! Welcome to your future");
    await AsyncStorage.setItem("isLoggedIn", "true");
    console.log(response);
    await AsyncStorage.setItem("userId", response[0].u_id.toString());

    setError("");
    navigation.navigate("Home");
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ImageBackground
        source={require("../../assets/background.jpeg")}
        style={styles.container}
      >
        <View style={styles.toggle}>
          <Text style={styles.toggleButtonText}>{`${theme}`}</Text>
          <Switch
            value={theme}
            onValueChange={toggleTheme}
            style={styles.toggleButton}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.push("SignUp");
          }}
          accessibilityRole="link"
          id="signup-link"
          style={styles.signUpButton}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.formContainer}>
          <Text style={styles.formContainerText}> Hospital Jobs</Text>
          <View style={styles.inputContainer}>
            {/* <Ionicons name="mail-outline" size={24} color="grey" /> */}
            <Text style={styles.icon}>📧</Text>

            <TextInput
              style={styles.input}
              id="email"
              required
              value={details.email}
              onChangeText={(text) => handleChange("email", text)}
              placeholder="Email*"
              testID="email"
            />
          </View>
          <View style={styles.inputContainer}>
            {/* <Ionicons name="key-outline" size={24} color="grey" /> */}
            <Text style={styles.icon}>🔑</Text>

            <TextInput
              style={styles.input}
              id="password"
              required
              value={details.password}
              onChangeText={(text) => handleChange("password", text)}
              placeholder="Password*"
              testID="password"
              secureTextEntry={true}
            />
          </View>
          {error !== "" ? <Text style={styles.errorValue}>{error}</Text> : null}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              submitHandler();
            }}
          >
            {spinner === true ? (
              <EvilIcons name="spinner-2" size={24} color="black" />
            ) : (
              <Text style={styles.submitButtonText}>Log In</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ForgotPassword");
            }}
            accessibilityRole="link"
            id="forgot-password-container"
            style={styles.forgotPassword}
          >
            <Text id="forgot-password">Forgotten Password</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 14,
    borderRadius: 12,
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
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
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
  signUpButton: {
    position: "absolute",
    right: 20,
    top: 20,
    padding: 10,
    borderRadius: 16,
    backgroundColor: "#6be96f",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000e6",
  },
  toggle: {
    position: "absolute",
    left: 10,
    top: 10,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000e6",
    padding: 5,
  },
  signUpButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000e6",
  },
  submitButton: {
    padding: 14,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 16,
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
});

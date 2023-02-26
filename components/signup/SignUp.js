import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RadioButton } from "react-native-paper";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { ipAddress } from "../../address";

function SignUp({ navigation }) {
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setPassword] = useState("");
  const [regConfirmPassword, setConfirmPassword] = useState("");
  const [regGender, setRegGender] = useState("");
  const [regDob, setRegDob] = useState("1999-01-26");
  const [userPresent, setUserPresent] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [spinner, setSpinner] = useState(false);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  function yearsAgo(years) {
    const date = new Date();
    date.setFullYear(date.getFullYear() - years);
    return date.toISOString().split("T")[0];
  }

  const maxDate = yearsAgo(16);
  const minDate = yearsAgo(100);

  const register = () => {
    fetch(ipAddress + "/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: regFirstName,
        lastname: regLastName,
        email: regEmail,
        password: regPassword,
        gender: regGender,
        dob: regDob,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
      });
    setSuccess("User Successfully Registered");
  };

  function checkUserAlreadyRegistered() {
    setSpinner(true);
    if (
      regFirstName === "" ||
      regLastName === "" ||
      regDob === "" ||
      regGender === "" ||
      regPassword === "" ||
      regConfirmPassword === ""
    ) {
      setError("Please fill all the required fields");
      setSpinner(false);
    } else {
      setError("");

      fetch(ipAddress + "/api/emailalreadyregistered", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: regEmail,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          if (!responseData.message) {
            setUserPresent(true);
            setError("Email already exists...");
          } else {
            setUserPresent(false);
            setError("");
            handleValidation();
          }
          setSpinner(false);
        });
    }
  }

  function handleValidation() {
    if (regPassword !== regConfirmPassword || regConfirmPassword === "") {
      setError("Passwords don't match");
    } else {
      setError("");
      register();
      navigation.navigate("LoginPage");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ImageBackground style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.formContainerText}>Sign Up</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="chevron-forward-circle-outline"
              size={24}
              color="grey"
            />
            <TextInput
              style={styles.input}
              placeholder="First Name*"
              value={regFirstName}
              onChangeText={(value) => setRegFirstName(value)}
              required
            />

            <Ionicons
              name="chevron-forward-circle-outline"
              size={24}
              color="grey"
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name*"
              value={regLastName}
              onChangeText={(value) => setRegLastName(value)}
            />
          </View>
          <View style={styles.inputContainer}>
            {/* <Ionicons name="mail-outline" size={24} color="grey" /> */}
            <Text style={styles.icon}>📧</Text>

            <TextInput
              style={styles.input}
              placeholder="Email*"
              value={regEmail}
              onChangeText={(value) => setRegEmail(value)}
            />
          </View>

          {/* <View style={styles.dobContainer}>
          <Ionicons name="calendar-outline" size={24} color="grey" />
          <DateTimePicker
            mode="date"
            value={new Date()}
            // minDate={minDate}
            // maxDate={maxDate}
            display="default"
            onDateChange={setRegDob}
            style={styles.dob}
          />
          <Text style={styles.dobText}>{regDob}</Text>
        </View> */}

          <View>
            <RadioButton.Group
              onValueChange={(value) => setRegGender(value)}
              value={regGender}
            >
              <View style={styles.radioButtonContainer}>
                <TouchableOpacity
                  style={styles.radioButtonOption}
                  onPress={() => setRegGender("Male")}
                >
                  {/* <Ionicons name="man-outline" size={24} color="grey" /> */}
                  <Text style={styles.gender}>👨‍🦱</Text>

                  <Text style={styles.gender}>Male*</Text>
                  <View style={styles.radio}>
                    <RadioButton value="Male" style={styles.radio} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.radioButtonOption}
                  onPress={() => setRegGender("Female")}
                >
                  {/* <Ionicons name="woman-outline" size={24} color="grey" /> */}
                  <Text style={styles.gender}>👩‍🦰</Text>

                  <Text style={styles.gender}>Female*</Text>
                  <View style={styles.radio}>
                    <RadioButton value="Female" style={styles.radio} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioButtonOption}
                  onPress={() => setRegGender("Other")}
                >
                  <Ionicons name="people-outline" size={24} color="grey" />

                  <Text style={styles.gender}>Other*</Text>
                  <View style={styles.radio}>
                    <RadioButton value="Other" />
                  </View>
                </TouchableOpacity>
              </View>
            </RadioButton.Group>
          </View>

          <View style={styles.inputContainer}>
            {/* <Ionicons name="key-outline" size={24} color="grey" /> */}
            <Text style={styles.icon}>🔑</Text>

            <TextInput
              type="password"
              secureTextEntry={true}
              style={styles.input}
              placeholder="Password*"
              value={regPassword}
              onChangeText={(value) => setPassword(value)}
              required
            />
          </View>

          <View style={styles.inputContainer}>
            {/* <Ionicons name="key-outline" size={24} color="grey" /> */}
            <Text style={styles.icon}>🔑</Text>

            <TextInput
              type="password"
              secureTextEntry={true}
              style={styles.input}
              placeholder="Confirm Password*"
              value={regConfirmPassword}
              onChangeText={(value) => setConfirmPassword(value)}
              required
            />
          </View>

          {error && <Text style={styles.errorValue}>{error}</Text>}
          {success && <Text style={styles.successValue}>{success}</Text>}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              checkUserAlreadyRegistered();
            }}
            // disabled={!allowSubmit}
          >
            {spinner === true ? (
              <EvilIcons name="spinner-2" size={24} color="black" />
            ) : (
              <Text style={styles.submitButtonText}>Submit</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("LoginPage");
            }}
            accessibilityRole="link"
            id="forgot-password-container"
            style={styles.forgotPassword}
          >
            <Text id="forgot-password">Back to Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

export default SignUp;

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
    fontSize: 16,
    // color: "#ccc",
    flex: 1,
    height: 40,
    marginLeft: 5,
    marginRight: 5,
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
  successValue: {
    fontSize: 14,
    textAlign: "center",
    top: 5,
    fontWeight: "bold",
    color: "#6be96f",
  },
  dobContainer: {
    width: "39.5%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 9,
    margin: 5,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#ccc",
    backgroundColor: "#6be96f",
  },
  dob: {
    flexDirection: "row",
    alignItems: "center",
  },
  gender: {
    fontSize: 14,
    color: "#ccc",
    padding: 2,
  },
  radioButtonOption: {
    width: "29.7%",
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    margin: 5,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#ccc",
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  radio: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "flex-start",

    // backgroundColor: "#6be96f",
  },
});

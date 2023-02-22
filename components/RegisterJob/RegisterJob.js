import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { ipAddress } from "../../address";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainContainer from "../mainContainer";
import SelectDropdown from "react-native-select-dropdown";

function RegisterJob({ navigation }) {
  const [jobTitle, setJobTitle] = useState("");
  const [jobCompany, setJobCompany] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [jobSalary, setJobSalary] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jobType, setJobType] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const job = ["Full-time", "Part-time", "Locum"];

  async function register() {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");
    if (
      jobTitle === "" ||
      jobCompany === "" ||
      jobLocation === "" ||
      jobSalary === "" ||
      jobType === ""
    ) {
      setError("Please fill all the required fields");
    } else {
      setError("");
      fetch("http://" + ipAddress + ":3000/api/registerjob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: jobTitle,
          company: jobCompany,
          location: jobLocation,
          job_type: jobType,
          apply_link: jobLink,
          jobSalary: jobSalary,
          date: formattedDate,
          contact: JSON.stringify([{ email: email, phone: phoneNumber }]),
          userId: await AsyncStorage.getItem("userId"),
        }),
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      setSuccess("Job Uploaded Successfully");

      console.log(jobLocation);

      setTimeout(() => {
        setSuccess("");
        navigation.navigate("Home");
      }, 3000);
    }
  }

  return (
    <ImageBackground style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formContainerText}>Add Job</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.icon}>🩺</Text>
          <TextInput
            style={styles.input}
            placeholder="Job Title*"
            value={jobTitle}
            onChangeText={setJobTitle}
            required
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.icon}>🏢</Text>
          <TextInput
            style={styles.input}
            placeholder="Company*"
            value={jobCompany}
            onChangeText={setJobCompany}
            required
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.icon}>📍</Text>
          <TextInput
            style={styles.input}
            placeholder="Location*"
            value={jobLocation}
            onChangeText={setJobLocation}
            required
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.icon}>🔗</Text>
          <TextInput
            style={styles.input}
            placeholder="Link to apply"
            value={jobLink}
            onChangeText={setJobLink}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.icon}>💰</Text>
          <TextInput
            style={styles.input}
            placeholder="Salary*"
            value={jobSalary}
            onChangeText={setJobSalary}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.icon}>📧</Text>
          <TextInput
            style={styles.input}
            placeholder="Contact Email"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.icon}>📞</Text>
          <TextInput
            style={styles.input}
            placeholder="Contact Phone"
            value={phoneNumber}
            keyboardType="numeric"
            onChangeText={setPhoneNumber}
          />
        </View>

        <View style={styles.inputContainer}>
          <SelectDropdown
            data={job}
            onSelect={(selectedItem, index) => {
              setJobType(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
        </View>

        {error && <Text style={styles.errorValue}>{error}</Text>}

        {success && <Text style={styles.successValue}>{success}</Text>}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            register();
          }}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <MainContainer navigation={navigation} />
    </ImageBackground>
  );
}

export default RegisterJob;

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
    width: "80%",
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

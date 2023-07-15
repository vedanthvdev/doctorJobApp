import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import MainContainer from "../mainContainer";
import { ipAddress } from "../../address";

function Jobs({ navigation }) {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filterTitle, setFilterTitle] = useState([]);
  const [filterLocation, setFilterLocation] = useState([]);
  const [filterJobType, setFilterJobType] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const job = ["All", "Full-time", "Part-time", "Locum"];
  const [spinner, setSpinner] = useState(true);

  const [contact, setContact] = useState(null);

  const openContactModal = (jobContact) => {
    setContact(jobContact);
    setIsOpen(true);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const closeModal = () => {
    setIsOpen(false);
    setContact(null);
  };

  const ContactModal = ({ contact }) => {
    if (!contact) {
      return null;
    }

    return (
      <Modal transparent={true} animationType="fade" visible={isOpen}>
        <View className="modal-overlay" style={{ flex: 2, position: "fixed" }}>
          <View className="modal-content" style={styles.modal}>
            <Text style={styles.title}>Contact Details</Text>
            {contact.email && <Text>Email: {contact.email}</Text>}
            {contact.phone && <Text>Phone: {contact.phone}</Text>}
            <TouchableOpacity
              onPress={() => {
                closeModal();
              }}
            >
              <Text style={styles.contactMod}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  function fetchData() {
    fetch(ipAddress + "/api/getjobs", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setJobs(responseData);
        setFilteredJobs(responseData);
        setSpinner(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    fetchData();
  }, [navigation]);

  function filterJobs() {
    // filter the jobs
    const filteredJobs = jobs.filter((job) => {
      if (
        (job.j_title.toLowerCase().includes(filterTitle) ||
          filterTitle.length === 0) &&
        (job.j_location.toLowerCase().includes(filterLocation) ||
          filterLocation.length === 0) &&
        (job.j_type === filterJobType ||
          filterJobType.length === 0 ||
          filterJobType === "All")
      ) {
        return true;
      }
      return false;
    });
    // update the filtered jobs in state
    setFilteredJobs(filteredJobs);
  }

  const validateCont = (conct) => {
    const finl = JSON.parse(conct);
    return finl[0];
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ImageBackground style={styles.container}>
        <View style={styles.filterContainer}>
          <View style={styles.filterSearch}>
            <Text style={styles.icon}>🩺</Text>
            <TextInput
              style={{ height: 40, width: 200, paddingLeft: 10 }}
              placeholder="Job Title"
              onChangeText={(text) => {
                setFilterTitle(text.toLowerCase());
              }}
            />
          </View>
          <View style={styles.filterSearch}>
            <Text style={styles.icon}>📍</Text>
            <TextInput
              style={{ height: 40, width: 200, paddingLeft: 10 }}
              placeholder="Location"
              onChangeText={(text) => {
                setFilterLocation(text.toLowerCase());
              }}
            />
          </View>
          <View style={styles.filterSearch}>
            <SelectDropdown
              data={job}
              onSelect={(selectedItem, index) => {
                setFilterJobType(selectedItem);
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
          <TouchableOpacity style={styles.submitButton} onPress={filterJobs}>
            <Text style={styles.submitButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>
        {spinner === true ? (
          <EvilIcons name="spinner-2" size={24} color="black" />
        ) : (
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <View
                  style={styles.inputContainer}
                  className="jobs-available"
                  key={job.j_id}
                >
                  <View className="job-card" style={styles.jobs} id={job.j_id}>
                    <Text style={styles.title}>{job.j_title}</Text>
                    <Text style={styles.details}>{job.j_company}</Text>
                    <Text style={styles.details}>{job.j_location}</Text>
                    <Text style={styles.details}>
                      {job.j_type} {job.j_salary}
                    </Text>
                    {job.j_link && (
                      <TouchableOpacity
                        accessibilityRole="link"
                        className="apply-link"
                        style={styles.details}
                      >
                        <Text id="apply-url">Apply Now</Text>
                      </TouchableOpacity>
                    )}
                    {(validateCont(job.j_contact).phone ||
                      validateCont(job.j_contact).email) && (
                      <TouchableOpacity
                        style={styles.contact}
                        className="contact-button"
                        onPress={() =>
                          openContactModal(validateCont(job.j_contact))
                        }
                      >
                        <Text id="contact-button">Contact</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))
            ) : (
              <View>
                <Text id="no-jobs">No jobs found</Text>
              </View>
            )}
            {contact && (
              <View>
                <View>
                  <ContactModal contact={contact} />
                </View>
              </View>
            )}
          </ScrollView>
        )}

        <MainContainer navigation={navigation} />
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

export default Jobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "rgba(255, 2, 255, 0.9)",
  },
  contactMod: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ccc",
    borderWidth: 2,
    padding: 5,
  },
  modal: {
    width: "60%",
    top: "50%",
    left: "20%",
    paddingTop: 5,
    paddingBottom: 5,

    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ccc",
    borderWidth: 2,
  },
  jobs: {
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    alignItems: "center",
    textAlign: "center",
    margin: 2,
    justifyContent: "center",
  },
  contact: {
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    margin: 2,
    borderColor: "#ccc",
    borderWidth: 2,
  },
  formContainer: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  filterContainer: {
    width: "95%",
    borderColor: "#ccc",
    borderWidth: 2,
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
  filterSearch: {
    position: "relative",
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
    marginLeft: 18,
    marginRight: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#ccc",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
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
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#ccc",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
  },
  submitButton: {
    width: "60%",
    padding: 14,
    marginTop: 10,
    marginBottom: 10,
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

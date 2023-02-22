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
  Dimensions,
} from "react-native";
import { ipAddress } from "../../address";
import MainContainer from "../mainContainer";

export default function Home({ navigation }) {
  const [jobs, setJobs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [contact, setContact] = useState(null);

  const openContactModal = (jobContact) => {
    setContact(jobContact);
    setIsOpen(true);
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
    fetch("http://" + ipAddress + ":3000/api/getrecentjobs", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setJobs(responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    fetchData();
  }, [navigation]);

  return (
    <ImageBackground style={styles.container}>
      <ScrollView
        onScrollToTop={fetchData()}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <View style={styles.formContainer}>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <View
                style={styles.inputContainer}
                className="jobs-available"
                key={job.id}
              >
                <View className="job-card" style={styles.jobs} id={job.id}>
                  <Text style={styles.title}>{job.title}</Text>
                  <Text style={styles.details}>{job.company}</Text>
                  <Text style={styles.details}>{job.location}</Text>
                  <Text style={styles.details}>
                    {job.job_type} {job.job_salary}
                  </Text>
                  {job.apply_link && (
                    <TouchableOpacity
                      accessibilityRole="link"
                      className="apply-link"
                      style={styles.details}
                    >
                      <Text id="forgot-password">Apply Now</Text>
                    </TouchableOpacity>
                  )}
                  {(job.contact[0].phone || job.contact[0].email) && (
                    <TouchableOpacity
                      style={styles.contact}
                      className="contact-button"
                      onPress={() => openContactModal(job.contact[0])}
                    >
                      <Text id="forgot-password">Contact</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))
          ) : (
            <View>
              <Text id="forgot-password">No jobs found</Text>
            </View>
          )}
          {contact && (
            <View>
              <View>
                <ContactModal contact={contact} />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <MainContainer navigation={navigation} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    margin: 3,
    fontWeight: "bold",
  },
  details: {
    alignItems: "center",
    textAlign: "center",
    margin: 2,
    justifyContent: "center",
  },
  contact: {
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "white",
    fontWeight: "bold",
    padding: 3,
    margin: 2,
    justifyContent: "center",
    borderRadius: 10,
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
    alignItems: "center",
    justifyContent: "center",
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
  errorValue: {
    fontSize: 14,
    textAlign: "center",
    top: 5,
    fontWeight: "bold",
    color: "#FF0000",
  },
});

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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainContainer from "../mainContainer";
import { ipAddress } from "../../address";

function UserJobs({ navigation }) {
  const [jobs, setJobs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [contact, setContact] = useState(null);

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [triggerFetch, setTriggerFetch] = React.useState(false);

  const [deleteJobId, setDeleteJobId] = useState(null);

  const handleDelete = () => {
    fetch("http://" + ipAddress + ":3000/api/deletejob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: deleteJobId,
      }),
    }).catch((error) => {
      console.log(error);
    });
    setTriggerFetch(true);

    closeDeleteConfirmationModal();
  };

  const openDeleteConfirmationModal = (id) => {
    setDeleteJobId(id);
    setIsDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmationModal = () => {
    setIsDeleteConfirmationOpen(false);
    setDeleteJobId(null);
  };

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

  const DeleteConfirmationModal = ({
    deleteJobId,
    closeDeleteConfirmationModal,
  }) => {
    if (!deleteJobId) {
      return null;
    }
    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={isDeleteConfirmationOpen}
      >
        <View className="delete-overlay" style={{ flex: 2, position: "fixed" }}>
          <View className="delete-content" style={styles.modal}>
            <Text style={styles.title}>Confirm Deleting the job</Text>
            <TouchableOpacity
              id="close-delete-modal"
              onPress={closeDeleteConfirmationModal}
            >
              <Text style={styles.contactMod}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity id="confirm-delete-modal" onPress={handleDelete}>
              <Text style={styles.contactMod}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  React.useEffect(() => {
    const fetchData = async () => {
      await fetch("http://" + ipAddress + ":3000/api/getuseruploadedjobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: await AsyncStorage.getItem("userId"),
        }),
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
    };
    fetchData();
    setTriggerFetch(false);
  }, [triggerFetch]);

  return (
    <ImageBackground style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          marginBottom: 50,
          flexWrap: "wrap",
        }}
      >
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
                <TouchableOpacity
                  className="deleteJob"
                  onPress={() => openDeleteConfirmationModal(job.id)}
                >
                  <Text style={styles.contact}>🗑️</Text>
                </TouchableOpacity>
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
            <ContactModal contact={contact} />
          </View>
        )}
        {deleteJobId && (
          <View>
            <DeleteConfirmationModal
              deleteJobId={deleteJobId}
              closeDeleteConfirmationModal={closeDeleteConfirmationModal}
            />
          </View>
        )}
      </ScrollView>
      <MainContainer navigation={navigation} />
    </ImageBackground>
  );
}

export default UserJobs;

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
    // marginBottom: 18,
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

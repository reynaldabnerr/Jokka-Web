import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonAvatar,
  IonImg,
  IonSpinner,
  IonToast,
  IonAlert,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "../../api/firebaseConfig";
import { getAuth, onAuthStateChanged, deleteUser } from "firebase/auth";
import NavBar from "../../components/NavBar";
import "./Profile.css";

interface ProfileProps {
  isProfileUpdated: boolean;
}

const Profile: React.FC<ProfileProps> = ({ isProfileUpdated }) => {
  const history = useHistory();
  const location = useLocation();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    profilePicture: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const fetchUserData = async (userId: string) => {
    setIsLoading(true);
    try {
      const userDoc = await getDoc(doc(firestore, "users", userId));
      if (userDoc.exists()) {
        setUserData({
          name: userDoc.data().name,
          email: userDoc.data().email,
          phone: userDoc.data().phone_number,
          profilePicture: userDoc.data().profile_picture_url || "", // default to empty if not set
        });
      } else {
        setUserData({
          name: "Unknown User",
          email: "No Email Available",
          phone: "No Phone Available",
          profilePicture: "",
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid);
      }
    });

    if (location.search.includes("updated=true")) {
      fetchUserData(auth.currentUser?.uid || "");
    }

    return () => unsubscribe();
  }, [location.search]);

  const handleDeleteAccount = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      try {
        await deleteDoc(doc(firestore, "users", userId));
        await deleteUser(currentUser);
        setToastMessage("Account deleted successfully.");
        setShowToast(true);
        setTimeout(() => history.push("/home"), 1500);
      } catch (error) {
        console.error("Error deleting account:", error);
        setToastMessage("Error deleting account. Please try again.");
        setShowToast(true);
      }
    }
  };

  return (
    <IonPage>
      <NavBar />
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="profile-container">
          <h2>My Profile</h2>

          {isLoading ? (
            <IonSpinner name="crescent" />
          ) : (
            <>
              <div className="profile-picture-container">
                <IonAvatar className="profile-avatar">
                  <IonImg
                    src={
                      userData.profilePicture ||
                      "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" // default image
                    }
                  />
                </IonAvatar>
              </div>

              <div className="profile-field-container">
                <div className="profile-field-label">Name</div>
                <div className="profile-field-value">{userData.name}</div>
              </div>

              <div className="profile-field-container">
                <div className="profile-field-label">Email</div>
                <div className="profile-field-value">{userData.email}</div>
              </div>

              <div className="profile-field-container">
                <div className="profile-field-label">Phone</div>
                <div className="profile-field-value">{userData.phone}</div>
              </div>

              <IonButton
                expand="full"
                shape="round"
                color="primary"
                onClick={() => history.push("/edit-profile")}
                className="ion-margin-top"
              >
                Edit Profile
              </IonButton>

              <IonButton
                color="secondary"
                expand="full"
                shape="round"
                onClick={() => setShowAlert(true)}
                className="ion-margin-top"
              >
                Delete Account
              </IonButton>

              <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={"Delete Account"}
                message={
                  "Are you sure you want to delete your account? This action cannot be undone."
                }
                buttons={[
                  {
                    text: "Cancel",
                    role: "cancel",
                    handler: () => setShowAlert(false),
                  },
                  {
                    text: "Delete",
                    handler: handleDeleteAccount,
                  },
                ]}
              />
            </>
          )}
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={1500}
          color="success"
          position="bottom"
        />
      </IonContent>
    </IonPage>
  );
};

export default Profile;

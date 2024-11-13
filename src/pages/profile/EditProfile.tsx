import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonAvatar,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonToast,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firestore } from "../../api/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import NavBar from "../../components/NavBar";
import "./EditProfile.css"; // Mengimpor CSS

const EditProfile: React.FC = () => {
  const history = useHistory();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    profilePicture: "",
  });

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const userRef = doc(firestore, "users", userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setUserData({
            name: userDoc.data().name || "",
            email: userDoc.data().email || "",
            phone: userDoc.data().phone_number || "",
            profilePicture: userDoc.data().profile_picture_url || "",
          });
        }
      } else {
        console.log("No user is signed in.");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userId = currentUser.uid;
        const userRef = doc(firestore, "users", userId);

        await updateDoc(userRef, {
          name: userData.name,
          email: userData.email,
          phone_number: userData.phone,
          profile_picture_url: userData.profilePicture,
        });

        setShowToast(true);
        setTimeout(() => history.push("/profile?refresh=true"), 1000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <NavBar />
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Edit Profile</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="edit-profile-container">
          <h2>Edit Your Profile</h2>

          <div className="edit-profile-avatar">
            <IonAvatar>
              <IonImg
                src={
                  userData.profilePicture ||
                  "https://www.example.com/default-profile.jpg"
                }
              />
            </IonAvatar>
          </div>

          {/* Field yang bisa diedit */}
          <div className="profile-field-container">
            <div className="profile-field-label">Name</div>
            <IonInput
              value={userData.name}
              onIonChange={(e) =>
                setUserData({ ...userData, name: e.detail.value! })
              }
            />
          </div>

          <div className="profile-field-container">
            <div className="profile-field-label">Phone</div>
            <IonInput
              value={userData.phone}
              onIonChange={(e) =>
                setUserData({ ...userData, phone: e.detail.value! })
              }
            />
          </div>

          {/* Field untuk URL gambar profil */}
          <div className="profile-field-container">
            <div className="profile-field-label">Profile Picture URL</div>
            <IonInput
              value={userData.profilePicture}
              onIonChange={(e) =>
                setUserData({ ...userData, profilePicture: e.detail.value! })
              }
              placeholder="Enter image URL"
            />
          </div>

          {/* Tombol Simpan */}
          <button
            className="rounded-save-button"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>

          {/* Toast Pesan Sukses/Error */}
          <IonToast
            isOpen={showToast}
            message="Profile updated successfully!"
            duration={1000}
            onDidDismiss={() => setShowToast(false)}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;

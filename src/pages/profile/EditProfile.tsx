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

const EditProfile: React.FC = () => {
  const history = useHistory();

  // State untuk menyimpan data pengguna yang dapat diedit
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    profilePicture: "",
  });

  const [showToast, setShowToast] = useState(false);

  // Ambil data pengguna berdasarkan userId saat ini
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

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  // Fungsi untuk menyimpan perubahan profil ke Firestore
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

        setShowToast(true); // Tampilkan pesan sukses
        setTimeout(() => history.push("/profile?refresh=true"), 1000); // Redirect ke profil dengan parameter refresh
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setShowToast(true); // Tampilkan pesan error
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

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h2>Edit Your Profile</h2>

          {/* Gambar Profil */}
          <IonGrid>
            <IonRow>
              <IonCol
                size="12"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <IonAvatar
                  style={{
                    width: "120px",
                    height: "120px",
                    marginBottom: "20px",
                  }}
                >
                  <IonImg
                    src={
                      userData.profilePicture ||
                      "https://www.example.com/default-profile.jpg"
                    }
                  />
                </IonAvatar>
              </IonCol>
            </IonRow>
          </IonGrid>

          {/* Field yang bisa diedit */}
          <IonItem>
            <IonLabel position="stacked">Name</IonLabel>
            <IonInput
              value={userData.name}
              onIonChange={(e) =>
                setUserData({ ...userData, name: e.detail.value! })
              }
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              value={userData.email}
              onIonChange={(e) =>
                setUserData({ ...userData, email: e.detail.value! })
              }
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Phone</IonLabel>
            <IonInput
              value={userData.phone}
              onIonChange={(e) =>
                setUserData({ ...userData, phone: e.detail.value! })
              }
            />
          </IonItem>

          {/* Tombol Simpan */}
          <IonButton expand="full" onClick={handleSaveChanges}>
            Save Changes
          </IonButton>

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

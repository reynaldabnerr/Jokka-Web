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
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../api/firebaseConfig"; // Import Firestore
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth dengan listener
import NavBar from "../../components/NavBar";
import "./Profile.css"; // Import custom CSS for profile styling

const Profile: React.FC = () => {
  const history = useHistory();
  const location = useLocation(); // Untuk mendeteksi perubahan URL

  // State untuk menyimpan data pengguna
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    profilePicture: "",
  });

  // Fungsi untuk mengambil data pengguna dari Firestore
  const fetchUserData = async (userId: string) => {
    const userDoc = await getDoc(doc(firestore, "users", userId));
    if (userDoc.exists()) {
      setUserData({
        name: userDoc.data().name,
        email: userDoc.data().email,
        phone: userDoc.data().phone_number,
        profilePicture: userDoc.data().profile_picture_url,
      });
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Jika ada pengguna yang login, fetch data pengguna
        fetchUserData(user.uid);
      } else {
        // Jika tidak ada pengguna yang login, kosongkan data profil
        setUserData({
          name: "",
          email: "",
          phone: "",
          profilePicture: "",
        });
      }
    });

    // Membersihkan listener ketika komponen tidak digunakan lagi
    return () => unsubscribe();
  }, []);

  // Mendeteksi perubahan URL dan memuat ulang data jika ada parameter refresh
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("refresh") === "true") {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        fetchUserData(user.uid); // Refresh data dari Firestore
      }
    }
  }, [location.search]); // Mengulang useEffect setiap kali URL berubah

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

          {/* Tampilkan foto profil */}
          <div className="profile-picture-container">
            <IonAvatar className="profile-avatar">
              <IonImg
                src={
                  userData.profilePicture ||
                  "https://www.example.com/default-profile.jpg"
                }
              />
            </IonAvatar>
          </div>

          {/* Tampilkan informasi pengguna */}
          <IonItem>
            <IonLabel position="stacked">Name</IonLabel>
            <IonInput value={userData.name} readonly />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput value={userData.email} readonly />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Phone</IonLabel>
            <IonInput value={userData.phone} readonly />
          </IonItem>

          {/* Tombol untuk mengedit profil */}
          <IonButton
            expand="full"
            onClick={() => history.push("/edit-profile")}
          >
            Edit Profile
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;

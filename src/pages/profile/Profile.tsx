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
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../api/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NavBar from "../../components/NavBar";
import "./Profile.css"; // Import custom CSS for profile styling

const Profile: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  // State untuk menyimpan data pengguna
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    profilePicture: "",
  });
  const [isLoading, setIsLoading] = useState(true); // State untuk melacak loading

  // Fungsi untuk mengambil data pengguna dari Firestore
  const fetchUserData = async (userId: string) => {
    setIsLoading(true);
    try {
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
      } else {
        setUserData({
          name: "",
          email: "",
          phone: "",
          profilePicture: "",
        });
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("refresh") === "true") {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        fetchUserData(user.uid);
      }
    }
  }, [location.search]);

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
              {/* Tampilkan foto profil di tengah */}
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

              {/* Field untuk Nama */}
              <div className="profile-field-container">
                <div className="profile-field-label">Name</div>
                <div className="profile-field-value">{userData.name}</div>
              </div>

              {/* Field untuk Email */}
              <div className="profile-field-container">
                <div className="profile-field-label">Email</div>
                <div className="profile-field-value">{userData.email}</div>
              </div>

              {/* Field untuk Nomor Telepon */}
              <div className="profile-field-container">
                <div className="profile-field-label">Phone</div>
                <div className="profile-field-value">{userData.phone}</div>
              </div>

              {/* Tombol untuk mengedit profil */}
              <button
                className="ion-button"
                onClick={() => history.push("/edit-profile")}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;

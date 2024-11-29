import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonToast,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  IonImg,
} from "@ionic/react";
import { firestore } from "../../api/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom";

interface CompleteProfileProps {
  onComplete: () => void;
}

const CompleteProfile: React.FC<CompleteProfileProps> = ({ onComplete }) => {
  const history = useHistory();
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleSaveProfile = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userId = currentUser.uid;

      // Menyimpan data user ke Firestore
      const userRef = doc(firestore, "users", userId);
      await setDoc(userRef, {
        name,
        phone_number: phoneNumber,
        email: currentUser.email,
        role: "user",
        profile_picture_url: profilePictureUrl, // Menyimpan URL gambar profil
      });

      setShowToast(true);
      onComplete(); // Notify App that profile has been updated
      setTimeout(() => history.push("/home"), 1500);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Complete Your Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-justify-content-center ion-align-items-center">
            <IonCol size="12" sizeMd="8" className="ion-text-center">
              {/* Avatar and Profile Picture URL */}
              <IonAvatar className="ion-margin-bottom ion-align-self-center">
                {profilePictureUrl ? (
                  <IonImg src={profilePictureUrl} />
                ) : (
                  <IonImg
                    src="https://via.placeholder.com/150"
                    alt="default-profile"
                  />
                )}
              </IonAvatar>

              {/* Input for Profile Picture URL */}
              <IonItem>
                <IonLabel position="stacked">Profile Picture URL</IonLabel>
                <IonInput
                  value={profilePictureUrl}
                  placeholder="Enter profile picture URL"
                  onIonChange={(e) => setProfilePictureUrl(e.detail.value!)}
                  clearInput
                />
              </IonItem>

              {/* Name Input */}
              <IonItem>
                <IonLabel position="stacked">Name</IonLabel>
                <IonInput
                  value={name}
                  placeholder="Enter your name"
                  onIonChange={(e) => setName(e.detail.value!)}
                  clearInput
                />
              </IonItem>

              {/* Phone Input */}
              <IonItem>
                <IonLabel position="stacked">Phone</IonLabel>
                <IonInput
                  value={phoneNumber}
                  placeholder="Enter your phone number"
                  onIonChange={(e) => setPhoneNumber(e.detail.value!)}
                  clearInput
                />
              </IonItem>

              {/* Save Button */}
              <IonButton
                expand="full"
                onClick={handleSaveProfile}
                className="ion-margin-top"
                size="large"
                color="primary"
              >
                Save Profile
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Toast for successful profile save */}
        <IonToast
          isOpen={showToast}
          message="Profile saved successfully!"
          duration={1000}
          color="success"
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default CompleteProfile;

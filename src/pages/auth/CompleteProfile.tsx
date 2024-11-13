// src/pages/CompleteProfile.tsx
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
} from "@ionic/react";
import { firestore } from "../../api/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom";

const CompleteProfile: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleSaveProfile = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userId = currentUser.uid;
      const userRef = doc(firestore, "users", userId);
      await setDoc(userRef, {
        name,
        phoneNumber,
        email: currentUser.email,
        role: "user", // Default role for new users
      });
      setShowToast(true);
      setTimeout(() => history.push("/home"), 1500); // Redirect to home after saving
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
        <IonItem>
          <IonLabel position="stacked">Name</IonLabel>
          <IonInput
            value={name}
            placeholder="Enter your name"
            onIonChange={(e) => setName(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Phone</IonLabel>
          <IonInput
            value={phoneNumber}
            placeholder="Enter your phone number"
            onIonChange={(e) => setPhoneNumber(e.detail.value!)}
          />
        </IonItem>

        <IonButton
          expand="full"
          onClick={handleSaveProfile}
          className="ion-margin-top"
        >
          Save Profile
        </IonButton>

        <IonToast
          isOpen={showToast}
          message="Profile saved successfully!"
          duration={1000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default CompleteProfile;

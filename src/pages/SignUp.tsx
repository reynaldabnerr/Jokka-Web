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
  IonText,
  IonToast,
  IonIcon,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import {
  mailOutline,
  lockClosedOutline,
  personOutline,
  callOutline,
} from "ionicons/icons";
import "./SignUp.css"; // Import file CSS

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const history = useHistory();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;

      // Save additional user data to Firestore
      await setDoc(doc(firestore, "users", userId), {
        name,
        phone_number: phoneNumber,
        email,
        profile_picture_url: profilePictureUrl,
      });

      setToastMessage("Account created successfully!");
      setShowToast(true);

      setTimeout(() => {
        history.push("/signin");
      }, 1500);
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setToastMessage(
          "Email is already in use. Please use a different email."
        );
        setShowToast(true);
      } else {
        setError("Error: " + err.message);
      }
    }
  };

  const goToSignIn = () => {
    history.push("/signin");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-text-center">Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ "--background": "#f5f5f5" }}>
        <div className="content-container">
          <div className="ion-text-center ion-padding">
            <h2 className="ion-no-margin" style={{ color: "#ff0000" }}>
              Sign Up
            </h2>
            <p className="ion-text-muted">
              Create a new account to get started
            </p>
          </div>

          <IonCard className="signup-card">
            <IonCardContent>
              {/* Name Input */}
              <div className="custom-input">
                <IonItem
                  lines="none"
                  className="ion-margin-bottom input-container"
                >
                  <IonIcon
                    icon={personOutline}
                    slot="start"
                    color="primary"
                    className="icon-style"
                  />
                  <IonInput
                    type="text"
                    value={name}
                    placeholder="Enter your name"
                    onIonChange={(e) => setName(e.detail.value!)}
                    className="input-field custom-input-field"
                  />
                </IonItem>
              </div>

              {/* Phone Number Input */}
              <div className="custom-input">
                <IonItem
                  lines="none"
                  className="ion-margin-bottom input-container"
                >
                  <IonIcon
                    icon={callOutline}
                    slot="start"
                    color="primary"
                    className="icon-style"
                  />
                  <IonInput
                    type="tel"
                    value={phoneNumber}
                    placeholder="Enter your phone number"
                    onIonChange={(e) => setPhoneNumber(e.detail.value!)}
                    className="input-field custom-input-field"
                  />
                </IonItem>
              </div>

              {/* Email Input */}
              <div className="custom-input">
                <IonItem
                  lines="none"
                  className="ion-margin-bottom input-container"
                >
                  <IonIcon
                    icon={mailOutline}
                    slot="start"
                    color="primary"
                    className="icon-style"
                  />
                  <IonInput
                    type="email"
                    value={email}
                    placeholder="Enter your email"
                    onIonChange={(e) => setEmail(e.detail.value!)}
                    className="input-field custom-input-field"
                  />
                </IonItem>
              </div>

              {/* Password Input */}
              <div className="custom-input">
                <IonItem
                  lines="none"
                  className="ion-margin-bottom input-container"
                >
                  <IonIcon
                    icon={lockClosedOutline}
                    slot="start"
                    color="primary"
                    className="icon-style"
                  />
                  <IonInput
                    type="password"
                    value={password}
                    placeholder="Enter your password"
                    onIonChange={(e) => setPassword(e.detail.value!)}
                    className="input-field custom-input-field"
                  />
                </IonItem>
              </div>

              {/* Confirm Password Input */}
              <div className="custom-input">
                <IonItem
                  lines="none"
                  className="ion-margin-bottom input-container"
                >
                  <IonIcon
                    icon={lockClosedOutline}
                    slot="start"
                    color="primary"
                    className="icon-style"
                  />
                  <IonInput
                    type="password"
                    value={confirmPassword}
                    placeholder="Confirm your password"
                    onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                    className="input-field custom-input-field"
                  />
                </IonItem>
              </div>

              {error && (
                <IonText color="danger" className="ion-padding-start">
                  <p className="ion-no-margin">{error}</p>
                </IonText>
              )}

              <div className="button-container">
                <IonButton
                  onClick={handleSignUp}
                  shape="round"
                  color="primary"
                  className="button-style"
                >
                  Sign Up
                </IonButton>
              </div>

              <div className="signup-container">
                <IonText color="medium">Already have an account?</IonText>
                <IonButton
                  fill="clear"
                  onClick={goToSignIn}
                  size="small"
                  color="primary"
                  className="signup-button-style"
                >
                  Sign In
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          color="success"
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default SignUp;

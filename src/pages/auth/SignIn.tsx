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
  IonText,
  IonToast,
  IonIcon,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import { logoGoogle, mailOutline, lockClosedOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, firestore } from "../../firebaseConfig";
import "./SignIn.css"; // Import file CSS
import { doc, getDoc } from "firebase/firestore";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const history = useHistory();

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;

      // Mendapatkan peran pengguna dari Firestore
      const userDoc = await getDoc(doc(firestore, "users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData?.role;

        // Simpan peran ke localStorage untuk digunakan di NavBar
        localStorage.setItem("userRole", userRole || "user");

        // Setel pesan toast
        setToastMessage("Sign in successful!");
        setShowToast(true);

        // Redirect berdasarkan role pengguna
        if (userRole === "admin") {
          history.push("/home");
        } else {
          history.push("/home");
        }
      } else {
        setToastMessage("User data not found.");
        setShowToast(true);
      }
    } catch (err) {
      console.error("Error during sign-in:", err);
      setToastMessage("Error signing in. Please try again.");
      setShowToast(true);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setToastMessage("Signed in with Google successfully!");
      setShowToast(true);
      setTimeout(() => {
        history.push("/home");
      }, 1500);
    } catch (err: any) {
      setError("Error: " + err.message);
    }
  };

  const goToSignUp = () => {
    history.push("/signup");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-text-center">Hallo Jokkers</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ "--background": "#f5f5f5" }}>
        <div className="content-container">
          <div className="ion-text-center ion-padding">
            <h2 className="ion-no-margin" style={{ color: "#ff0000" }}>
              Sign In
            </h2>
            <p className="ion-text-muted">Please sign in to continue</p>
          </div>

          <IonCard className="signin-card">
            <IonCardContent>
              {/* Custom styled email input */}
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

              {/* Custom styled password input */}
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

              {error && (
                <IonText color="danger" className="ion-padding-start">
                  <p className="ion-no-margin">{error}</p>
                </IonText>
              )}

              <div className="button-container">
                <IonButton
                  onClick={handleSignIn}
                  shape="round"
                  color="primary"
                  className="button-style"
                >
                  Sign In
                </IonButton>
              </div>

              <div className="ion-text-center ion-padding">
                <IonText color="medium">or continue with</IonText>
              </div>

              <div className="button-container">
                <IonButton
                  color="secondary"
                  onClick={handleGoogleSignIn}
                  shape="round"
                  className="button-style"
                >
                  <IonIcon slot="start" icon={logoGoogle} />
                  Sign in with Google
                </IonButton>
              </div>

              <div className="signup-container">
                <IonText color="medium">Don't have an account?</IonText>
                <IonButton
                  fill="clear"
                  onClick={goToSignUp}
                  size="small"
                  color="primary"
                  className="signup-button-style"
                >
                  Sign Up
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
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

export default SignIn;

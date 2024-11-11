import React, { useState, useEffect } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonAlert,
} from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { auth } from "../firebaseConfig"; // Pastikan konfigurasi Firebase Auth

const NavBar: React.FC = () => {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState<boolean>(false); // State untuk mengontrol alert logout

  const navigateTo = (path: string) => {
    history.push(path);
  };

  useEffect(() => {
    // Periksa status autentikasi saat ini
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    // Bersihkan subscription saat komponen di-unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    setIsAuthenticated(false);
    history.push("/home"); // Redirect ke halaman Home setelah logout
  };

  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          {/* Left side - Title */}
          <IonTitle slot="start" className="ion-text-bold">
            Jokka
          </IonTitle>

          {/* Center - Navigation Links */}
          <IonButtons slot="start" style={{ marginLeft: "10px" }}>
            <IonButton onClick={() => navigateTo("/home")}>Home</IonButton>
            <IonButton onClick={() => navigateTo("/event")}>Event</IonButton>
            <IonButton onClick={() => navigateTo("/destination")}>
              Destination
            </IonButton>
            <IonButton onClick={() => navigateTo("/food")}>Food</IonButton>
            <IonButton onClick={() => navigateTo("/AboutUs")}>
              About Us
            </IonButton>
          </IonButtons>

          {/* Right side - Profile Icon and Sign In/Logout */}
          <IonButtons slot="end">
            {!isAuthenticated ? (
              <IonButton onClick={() => navigateTo("/signin")}>
                Sign In
              </IonButton>
            ) : (
              <>
                <IonButton onClick={() => navigateTo("/profile")}>
                  <IonIcon icon={personCircleOutline} slot="icon-only" />
                </IonButton>
                <IonButton onClick={() => setShowLogoutConfirm(true)}>
                  Logout
                </IonButton>
              </>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* Alert for Logout Confirmation */}
      <IonAlert
        isOpen={showLogoutConfirm}
        onDidDismiss={() => setShowLogoutConfirm(false)}
        header={"Confirm Logout"}
        message={"Are you sure you want to log out?"}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              setShowLogoutConfirm(false);
            },
          },
          {
            text: "OK",
            handler: () => {
              handleLogout();
            },
          },
        ]}
      />
    </>
  );
};

export default NavBar;

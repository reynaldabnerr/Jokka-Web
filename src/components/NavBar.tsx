import React, { useEffect, useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { personCircleOutline, logOutOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { auth } from "../firebaseConfig";

const NavBar: React.FC = () => {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const navigateTo = (path: string) => {
    history.push(path);
  };

  useEffect(() => {
    // Periksa apakah pengguna sedang login
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);

      // Ambil userRole dari localStorage setelah login
      if (user) {
        const role = localStorage.getItem("userRole");
        setIsAdmin(role === "admin");
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe(); // Bersihkan listener saat komponen di-unmount
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    localStorage.removeItem("userRole");
    history.push("/signin");
  };

  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle slot="start" className="ion-text-bold">
          Jokka
        </IonTitle>

        <IonButtons slot="start" style={{ marginLeft: "10px" }}>
          <IonButton onClick={() => navigateTo("/home")}>Home</IonButton>
          <IonButton onClick={() => navigateTo("/event")}>Event</IonButton>
          <IonButton onClick={() => navigateTo("/destination")}>
            Destination
          </IonButton>
          <IonButton onClick={() => navigateTo("/food")}>Food</IonButton>
          <IonButton onClick={() => navigateTo("/AboutUs")}>About Us</IonButton>
          {isAdmin && (
            <IonButton onClick={() => navigateTo("/admin-dashboard")}>
              Dashboard
            </IonButton>
          )}
        </IonButtons>

        <IonButtons slot="end">
          {isLoggedIn ? (
            <>
              <IonButton onClick={handleLogout}>
                <IonIcon icon={logOutOutline} slot="icon-only" />
              </IonButton>
              <IonButton onClick={() => navigateTo("/profile")}>
                <IonIcon icon={personCircleOutline} slot="icon-only" />
              </IonButton>
            </>
          ) : (
            <IonButton onClick={() => navigateTo("/signin")}>Sign In</IonButton>
          )}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default NavBar;

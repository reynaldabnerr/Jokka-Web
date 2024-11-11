import React, { useEffect, useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import {
  personCircleOutline,
  logOutOutline,
  menuOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { auth } from "../firebaseConfig";
import "./NavBar.css";

const NavBar: React.FC = () => {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const navigateTo = (path: string) => {
    history.push(path);
    setMenuOpen(false); // Tutup menu saat navigasi
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      const role = localStorage.getItem("userRole");
      setIsAdmin(role === "admin");
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    localStorage.removeItem("userRole");
    history.push("/signin");
    setMenuOpen(false); // Tutup menu saat logout
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <IonHeader>
      <IonToolbar color="primary" className="navbar-toolbar">
        {/* Tulisan Jokka di kiri */}
        <IonTitle slot="start" className="navbar-title">
          Jokka
        </IonTitle>

        {/* Semua tombol navigasi rata kanan */}
        <IonButtons slot="end" className="navbar-end-buttons">
          <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
            <IonButton onClick={() => navigateTo("/home")}>Home</IonButton>
            <IonButton onClick={() => navigateTo("/event")}>Event</IonButton>
            <IonButton onClick={() => navigateTo("/destination")}>
              Destination
            </IonButton>
            <IonButton onClick={() => navigateTo("/food")}>Food</IonButton>
            <IonButton onClick={() => navigateTo("/AboutUs")}>
              About Us
            </IonButton>
            {isAdmin && (
              <IonButton onClick={() => navigateTo("/admin-dashboard")}>
                Dashboard
              </IonButton>
            )}
            {isLoggedIn ? (
              <>
                <IonButton onClick={handleLogout} className="logout-button">
                  <IonIcon icon={logOutOutline} className="icon-style" />
                </IonButton>
                <IonButton
                  onClick={() => navigateTo("/profile")}
                  className="profile-button"
                >
                  <IonIcon icon={personCircleOutline} className="icon-style" />
                </IonButton>
              </>
            ) : (
              <IonButton
                onClick={() => navigateTo("/signin")}
                className="signin-button"
              >
                Sign In
              </IonButton>
            )}
          </div>

          {/* Ikon menu untuk perangkat seluler */}
          <IonButton className="menu-icon" onClick={toggleMenu}>
            <IonIcon icon={menuOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default NavBar;

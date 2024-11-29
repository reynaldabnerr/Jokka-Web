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
  receiptOutline, // Tambahkan ikon untuk My Orders
} from "ionicons/icons";
import { useHistory, useLocation } from "react-router-dom";
import { auth } from "../../api/firebaseConfig";
import "./NavBar.css";

const NavBar: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
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
        <IonTitle slot="start" className="navbar-title">
          Jokka
        </IonTitle>

        <IonButtons slot="end" className="navbar-end-buttons">
          <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
            <IonButton
              onClick={() => navigateTo("/home")}
              className={location.pathname === "/home" ? "selected" : ""}
            >
              Home
            </IonButton>
            <IonButton
              onClick={() => navigateTo("/event")}
              className={location.pathname === "/event" ? "selected" : ""}
            >
              Event
            </IonButton>
            <IonButton
              onClick={() => navigateTo("/destination")}
              className={location.pathname === "/destination" ? "selected" : ""}
            >
              Destination
            </IonButton>
            <IonButton
              onClick={() => navigateTo("/food")}
              className={location.pathname === "/food" ? "selected" : ""}
            >
              Food
            </IonButton>
            <IonButton
              onClick={() => navigateTo("/aboutus")}
              className={location.pathname === "/aboutus" ? "selected" : ""}
            >
              About Us
            </IonButton>

            {isAdmin && (
              <IonButton
                onClick={() => navigateTo("/admin-dashboard")}
                className={
                  location.pathname === "/admin-dashboard" ? "selected" : ""
                }
              >
                Dashboard
              </IonButton>
            )}

            {isLoggedIn && (
              <IonButton
                onClick={() => navigateTo("/orders")}
                className={location.pathname === "/orders" ? "selected" : ""}
              >
                <IonIcon icon={receiptOutline} className="icon-style" />
                My Orders
              </IonButton>
            )}

            {isLoggedIn ? (
              <>
                <IonButton onClick={handleLogout} className="logout-button">
                  <IonIcon icon={logOutOutline} className="icon-style" />
                </IonButton>
                <IonButton
                  onClick={() => navigateTo("/profile")}
                  className={location.pathname === "/profile" ? "selected" : ""}
                >
                  <IonIcon icon={personCircleOutline} className="icon-style" />
                </IonButton>
              </>
            ) : (
              <IonButton
                onClick={() => navigateTo("/signin")}
                className={location.pathname === "/signin" ? "selected" : ""}
              >
                Sign In
              </IonButton>
            )}
          </div>

          <IonButton className="menu-icon" onClick={toggleMenu}>
            <IonIcon icon={menuOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default NavBar;

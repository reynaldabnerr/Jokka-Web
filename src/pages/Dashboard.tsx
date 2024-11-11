import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import NavBar from "../components/NavBar";

const Dashboard: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Hapus role dari localStorage
    localStorage.removeItem("userRole");
    history.push("/signin"); // Redirect ke halaman sign in
  };

  return (
    <IonPage>
      <NavBar />
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Welcome, Admin!</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              This is your admin dashboard where you can manage the application
              data and settings.
            </p>
          </IonCardContent>
        </IonCard>

        <IonList>
          <IonItem>
            <IonLabel>Manage Users</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Manage Events</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Manage Destinations</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Manage Food Items</IonLabel>
          </IonItem>
        </IonList>

        <div className="ion-padding">
          <IonButton expand="block" color="danger" onClick={handleLogout}>
            Logout
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;

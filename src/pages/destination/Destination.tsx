// src/pages/destination/Destination.tsx
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import NavBar from "../../components/NavBar";

const Destination: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <NavBar />
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Destination</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div>
          <h2>Destination</h2>
          {/* Add destination content here */}
          <p>
            Welcome to our company! We are dedicated to providing excellent
            service.
          </p>
          <p>
            Our mission is to deliver innovative solutions to our customers.
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Destination;

// src/pages/event/Event.tsx
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import NavBar from "../../components/NavBar";

const Event: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <NavBar />
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Event</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div>
          <h2>Event</h2>
          {/* Add event content here */}
          <p>
            Welcome to our event! We are dedicated to providing excellent
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

export default Event;

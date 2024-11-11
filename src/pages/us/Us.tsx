// src/pages/us/aboutus.tsx
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

const AboutUs: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <NavBar />
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">About Us</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div>
          <h2>About Us</h2>
          {/* Add about us content here */}
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

export default AboutUs;

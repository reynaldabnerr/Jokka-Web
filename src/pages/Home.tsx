// src/pages/Home.tsx
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import NavBar from "../components/NavBar";


const Home: React.FC = () => {
  const history = useHistory();

  const goToSignIn = () => {
    history.push("/signin");
  };

  return (
    <IonPage>
      <NavBar />
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <p>Welcome to the Home Page!</p>
      </IonContent>
    </IonPage>
  );
};

export default Home;

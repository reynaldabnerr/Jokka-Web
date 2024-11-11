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


const Home: React.FC = () => {
  const history = useHistory();

  const goToSignIn = () => {
    history.push("/signin");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <p>Welcome to the Home Page!</p>
        <IonButton
          expand="block"
          onClick={goToSignIn}
          className="ion-margin-top"
        >
          Go to Sign In
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;

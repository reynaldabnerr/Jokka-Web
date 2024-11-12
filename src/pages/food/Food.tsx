// src/pages/food/Food.tsx
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

const Food: React.FC = () => {
    const history = useHistory();

    return (
        <IonPage>
            <NavBar />
            <IonContent fullscreen className="ion-padding">
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Food</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div>
                    <h2>Food</h2>
                    {/* Add food content here */}
                    <p>
                        Welcome to our food page! We are dedicated to providing excellent
                        culinary experiences.
                    </p>
                    <p>
                        Our mission is to deliver innovative and delicious food to our customers.
                    </p>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Food;

// src/pages/profile/Profile.tsx
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

const Profile: React.FC = () => {
    const history = useHistory();

    return (
        <IonPage>
            <NavBar />
            <IonContent fullscreen className="ion-padding">
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Profile</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div>
                    <h2>My Profile</h2>
                    {/* Add profile content here */}
                    <p>Profile information will be displayed here</p>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Profile;

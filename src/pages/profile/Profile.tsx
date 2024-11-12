// src/pages/profile/Profile.tsx
import React, { useState, useEffect } from "react";
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonAvatar,
    IonImg,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import NavBar from "../../components/NavBar";
import "./Profile.css"; // Import custom CSS for profile styling


const Profile: React.FC = () => {
    const history = useHistory();


    // Mock data for logged in user
    const [userData, setUserData] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "081234567890",
        profilePicture: "https://www.example.com/profile-picture.jpg", // Mock image URL
    });


    useEffect(() => {
        // Here you would normally fetch the user data from your API or localStorage
        // For now, we're using mock data
    }, []);


    return (
        <IonPage>
            <NavBar />
            <IonContent fullscreen className="ion-padding">
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Profile</IonTitle>
                    </IonToolbar>
                </IonHeader>


                <div className="profile-container">
                    <h2>My Profile</h2>


                    {/* Display profile picture in the center and enlarged */}
                    <div className="profile-picture-container">
                        <IonAvatar className="profile-avatar">
                            <IonImg src={userData.profilePicture} />
                        </IonAvatar>
                    </div>


                    {/* Display user information */}
                    <IonItem>
                        <IonLabel position="stacked">Name</IonLabel>
                        <IonInput value={userData.name} readonly />
                    </IonItem>


                    <IonItem>
                        <IonLabel position="stacked">Email</IonLabel>
                        <IonInput value={userData.email} readonly />
                    </IonItem>


                    <IonItem>
                        <IonLabel position="stacked">Phone</IonLabel>
                        <IonInput value={userData.phone} readonly />
                    </IonItem>


                    {/* Button to edit profile */}
                    <IonButton expand="full" onClick={() => history.push("/edit-profile")}>
                        Edit Profile
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};


export default Profile;

import React, { useState } from "react";
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
    IonGrid,
    IonRow,
    IonCol,
    IonToast
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import NavBar from "../../components/NavBar";


const EditProfile: React.FC = () => {
    const history = useHistory();


    // Mock data for the editable user data
    const [userData, setUserData] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "081234567890",
        profilePicture: "https://www.example.com/profile-picture.jpg", // Mock image URL
    });


    // State to handle new profile picture
    const [newProfilePicture, setNewProfilePicture] = useState<string | null>(null);


    // State for handling success/error toast
    const [showToast, setShowToast] = useState(false);


    // Handle change in user data
    const handleChange = (field: string, value: string) => {
        setUserData({ ...userData, [field]: value });
    };


    // Handle image change
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setNewProfilePicture(reader.result as string); // Set new profile picture
                }
            };
            reader.readAsDataURL(file); // Convert image to data URL
        }
    };


    // Handle saving changes
    const handleSaveChanges = () => {
        setUserData({
            ...userData,
            profilePicture: newProfilePicture || userData.profilePicture, // Save new image if exists
        });
        setShowToast(true); // Show success message
        setTimeout(() => history.push("/profile"), 2000); // Redirect after 2 seconds
    };


    return (
        <IonPage>
            <NavBar />
            <IonContent fullscreen className="ion-padding">
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Edit Profile</IonTitle>
                    </IonToolbar>
                </IonHeader>


                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <h2>Edit Your Profile</h2>


                    {/* Profile Picture with centered styling */}
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12" style={{ display: "flex", justifyContent: "center" }}>
                                <IonAvatar style={{ width: "120px", height: "120px", marginBottom: "20px" }}>
                                    <IonImg src={newProfilePicture || userData.profilePicture} />
                                </IonAvatar>
                            </IonCol>
                        </IonRow>
                    </IonGrid>


                    {/* Image Selection */}
                    <IonButton
                        expand="full"
                        fill="clear"
                        onClick={() => document.getElementById('fileInput')?.click()}
                    >
                        Change Profile Picture
                    </IonButton>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleImageChange}
                    />


                    {/* Editable fields */}
                    <IonItem>
                        <IonLabel position="stacked">Name</IonLabel>
                        <IonInput
                            value={userData.name}
                            onIonChange={(e) => handleChange("name", e.detail.value!)}
                        />
                    </IonItem>


                    <IonItem>
                        <IonLabel position="stacked">Email</IonLabel>
                        <IonInput
                            value={userData.email}
                            onIonChange={(e) => handleChange("email", e.detail.value!)}
                        />
                    </IonItem>


                    <IonItem>
                        <IonLabel position="stacked">Phone</IonLabel>
                        <IonInput
                            value={userData.phone}
                            onIonChange={(e) => handleChange("phone", e.detail.value!)}
                        />
                    </IonItem>


                    <IonButton expand="full" onClick={handleSaveChanges}>
                        Save Changes
                    </IonButton>


                    {/* Toast Message for Success */}
                    <IonToast
                        isOpen={showToast}
                        message="Profile updated successfully!"
                        duration={2000}
                        onDidDismiss={() => setShowToast(false)}
                    />
                </div>
            </IonContent>
        </IonPage>
    );
};


export default EditProfile;

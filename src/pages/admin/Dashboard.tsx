import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonDatetime,
  IonToast,
  IonAccordionGroup,
  IonAccordion,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { firestore } from "../../api/firebaseConfig"; // Import Firestore
import { collection, addDoc } from "firebase/firestore";
import { format } from "date-fns";
import NavBar from "../../components/NavBar";

const Dashboard: React.FC = () => {
  const [eventName, setEventName] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const [eventCategory, setEventCategory] = useState<string>("");
  const [eventLocation, setEventLocation] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [eventID, setEventID] = useState<string>("");
  const [eventImage, setEventImage] = useState<string>("");

  const [foodName, setFoodName] = useState<string>("");
  const [foodDescription, setFoodDescription] = useState<string>("");
  const [foodCategory, setFoodCategory] = useState<string>("");
  const [foodRating, setFoodRating] = useState<string>("");
  const [foodID, setFoodID] = useState<string>("");
  const [foodPrice, setFoodPrice] = useState<string>("");
  const [foodImage, setFoodImage] = useState<string>("");

  const [destinationName, setDestinationName] = useState<string>("");
  const [destinationDescription, setDestinationDescription] =
    useState<string>("");
  const [destinationLocation, setDestinationLocation] = useState<string>("");
  const [destinationRating, setDestinationRating] = useState<string>("");
  const [destinationCategory, setDestinationCategory] = useState<string>("");
  const [destinationID, setDestinationID] = useState<string>("");
  const [destinationImage, setDestinationImage] = useState<string>("");

  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const eventCategories = [
    "Music",
    "Conference",
    "Workshop",
    "Seminar",
    "Festival",
    "Sports",
    "Party",
    "Exhibition",
  ];

  const foodCategories = [
    "Traditional",
    "Fast Food",
    "Dessert",
    "Vegetarian",
    "Vegan",
    "Seafood",
    "Street Food",
  ];

  const destinationCategories = [
    "Nature",
    "Beach",
    "Mountains",
    "Historical",
    "Urban",
    "Adventure",
    "Cultural",
    "Parks",
    "Resorts",
  ];

  const handleEventSubmit = async () => {
    try {
      if (
        eventName &&
        eventDescription &&
        eventCategory &&
        eventLocation &&
        eventDate &&
        eventID &&
        eventImage
      ) {
        const formattedDate = format(
          new Date(eventDate),
          "dd MMMM yyyy 'at' HH:mm 'WITA'"
        );
        await addDoc(collection(firestore, "event"), {
          eventname: eventName,
          eventdescription: eventDescription,
          eventcategories: eventCategory, // Store selected category
          eventlocation: eventLocation,
          eventdate: formattedDate,
          eventid: eventID,
          eventimage: eventImage,
        });

        setToastMessage("Event added successfully!");
        setShowToast(true);
        setEventName("");
        setEventDescription("");
        setEventCategory("");
        setEventLocation("");
        setEventDate("");
        setEventID("");
        setEventImage("");
      } else {
        setToastMessage("Please fill in all event fields");
        setShowToast(true);
      }
    } catch (error) {
      console.error("Error adding event: ", error);
      setToastMessage("Failed to add event. Try again.");
      setShowToast(true);
    }
  };

  const handleFoodSubmit = async () => {
    try {
      if (
        foodName.trim() !== "" &&
        foodDescription.trim() !== "" &&
        foodCategory.trim() !== "" &&
        foodRating.trim() !== "" &&
        foodID.trim() !== "" &&
        foodPrice.trim() !== "" &&
        foodImage.trim() !== ""
      ) {
        // Menghilangkan semua karakter non-numerik selain tanda koma dan titik
        const cleanedPrice = foodPrice.replace(/[^0-9,-]+/g, "");

        // Menambahkan "Rp" di depan harga dan memastikan format dengan titik sebagai pemisah ribuan
        const formattedPrice = `Rp ${cleanedPrice.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          "."
        )}`;

        await addDoc(collection(firestore, "food"), {
          foodname: foodName,
          fooddesc: foodDescription,
          foodcategories: foodCategory,
          foodrating: foodRating, // Added foodRating
          foodid: foodID,
          foodprice: formattedPrice, // Save the formatted price with Rp
          foodimage: foodImage,
        });

        setToastMessage("Food added successfully!");
        setShowToast(true);

        // Reset field setelah submit
        setFoodName("");
        setFoodDescription("");
        setFoodCategory("");
        setFoodRating(""); // Reset foodRating
        setFoodID("");
        setFoodPrice("");
        setFoodImage("");
      } else {
        setToastMessage("Please fill in all food fields");
        setShowToast(true);
      }
    } catch (error) {
      console.error("Error adding food: ", error);
      setToastMessage("Failed to add food. Try again.");
      setShowToast(true);
    }
  };


  const handleDestinationSubmit = async () => {
    try {
      if (
        destinationName &&
        destinationDescription &&
        destinationLocation &&
        destinationRating &&
        destinationCategory &&
        destinationID &&
        destinationImage
      ) {
        await addDoc(collection(firestore, "destination"), {
          destinationname: destinationName,
          destinationdescription: destinationDescription,
          destinationlocation: destinationLocation,
          destinationrating: destinationRating, // Added destination rating
          destinationcategory: destinationCategory, // Added destination category
          destinationid: destinationID,
          destinationimage: destinationImage,
        });

        setToastMessage("Destination added successfully!");
        setShowToast(true);
        setDestinationName("");
        setDestinationDescription("");
        setDestinationLocation("");
        setDestinationRating(""); // Reset destination rating
        setDestinationCategory(""); // Reset destination category
        setDestinationID("");
        setDestinationImage("");
      } else {
        setToastMessage("Please fill in all destination fields");
        setShowToast(true);
      }
    } catch (error) {
      console.error("Error adding destination: ", error);
      setToastMessage("Failed to add destination. Try again.");
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <NavBar />
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Admin Dashboard</IonCardTitle>
          </IonCardHeader>

          <IonAccordionGroup>
            {/* Accordion for Event */}
            <IonAccordion value="event">
              <IonItem slot="header" color="light">
                <IonLabel>Add New Event</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                <IonItem>
                  <IonLabel position="stacked">Event Name</IonLabel>
                  <IonInput
                    value={eventName}
                    onIonChange={(e) => setEventName(e.detail.value!)}
                    placeholder="Enter event name"
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Event Description</IonLabel>
                  <IonTextarea
                    value={eventDescription}
                    onIonChange={(e) => setEventDescription(e.detail.value!)}
                    placeholder="Enter event description"
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Event Categories</IonLabel>
                  <IonSelect
                    value={eventCategory}
                    onIonChange={(e) => setEventCategory(e.detail.value!)}
                  >
                    {eventCategories.map((category, index) => (
                      <IonSelectOption key={index} value={category}>
                        {category}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Event Location</IonLabel>
                  <IonInput
                    value={eventLocation}
                    onIonChange={(e) => setEventLocation(e.detail.value!)}
                    placeholder="Enter event location"
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Event Date</IonLabel>
                  <IonDatetime
                    presentation="date-time"
                    value={eventDate}
                    onIonChange={(e) => setEventDate(e.detail.value as string)}
                    showDefaultButtons
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Event ID</IonLabel>
                  <IonInput
                    value={eventID}
                    onIonChange={(e) => setEventID(e.detail.value!)}
                    placeholder="Enter event ID"
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Event Image URL</IonLabel>
                  <IonInput
                    value={eventImage}
                    onIonChange={(e) => setEventImage(e.detail.value!)}
                    placeholder="Enter image URL"
                  />
                </IonItem>
                <IonButton
                  expand="block"
                  color="primary"
                  onClick={handleEventSubmit}
                >
                  Add Event
                </IonButton>
              </div>
            </IonAccordion>

            {/* Accordion for Food */}
            <IonAccordion value="food">
              <IonItem slot="header" color="light">
                <IonLabel>Add New Food</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                <IonItem>
                  <IonLabel position="stacked">Food Name</IonLabel>
                  <IonInput
                    value={foodName}
                    onIonChange={(e) => setFoodName(e.detail.value!)}
                    placeholder="Enter food name"
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Food Description</IonLabel>
                  <IonTextarea
                    value={foodDescription}
                    onIonChange={(e) => setFoodDescription(e.detail.value!)}
                    placeholder="Enter food description"
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Food Categories</IonLabel>
                  <IonSelect
                    value={foodCategory}
                    onIonChange={(e) => setFoodCategory(e.detail.value!)}
                  >
                    {foodCategories.map((category, index) => (
                      <IonSelectOption key={index} value={category}>
                        {category}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Food Rating</IonLabel>
                  <IonInput
                    value={foodRating}
                    onIonChange={(e) => setFoodRating(e.detail.value!)}
                    placeholder="Enter food rating"
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Food ID</IonLabel>
                  <IonInput
                    value={foodID}
                    onIonChange={(e) => setFoodID(e.detail.value!)}
                    placeholder="Enter food ID"
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Food Price</IonLabel>
                  <IonInput
                    value={foodPrice}
                    onIonChange={(e) => setFoodPrice(e.detail.value!)}
                    placeholder="Enter food price (e.g., Rp 25.000)"
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Food Image URL</IonLabel>
                  <IonInput
                    value={foodImage}
                    onIonChange={(e) => setFoodImage(e.detail.value!)}
                    placeholder="Enter image URL"
                  />
                </IonItem>
                <IonButton
                  expand="block"
                  color="primary"
                  onClick={handleFoodSubmit}
                >
                  Add Food
                </IonButton>
              </div>
            </IonAccordion>

            {/* Accordion for Destination */}
            <IonAccordion value="destination">
              <IonItem slot="header" color="light">
                <IonLabel>Add New Destination</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                <IonItem>
                  <IonLabel position="stacked">Destination Name</IonLabel>
                  <IonInput
                    value={destinationName}
                    onIonChange={(e) => setDestinationName(e.detail.value!)}
                    placeholder="Enter destination name"
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">
                    Destination Description
                  </IonLabel>
                  <IonTextarea
                    value={destinationDescription}
                    onIonChange={(e) =>
                      setDestinationDescription(e.detail.value!)
                    }
                    placeholder="Enter destination description"
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Destination Location</IonLabel>
                  <IonInput
                    value={destinationLocation}
                    onIonChange={(e) => setDestinationLocation(e.detail.value!)}
                    placeholder="Enter destination location"
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Destination Rating</IonLabel>
                  <IonInput
                    value={destinationRating}
                    onIonChange={(e) => setDestinationRating(e.detail.value!)}
                    placeholder="Enter destination rating"
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Destination Category</IonLabel>
                  <IonSelect
                    value={destinationCategory}
                    onIonChange={(e) => setDestinationCategory(e.detail.value!)}
                  >
                    {destinationCategories.map((category, index) => (
                      <IonSelectOption key={index} value={category}>
                        {category}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Destination ID</IonLabel>
                  <IonInput
                    value={destinationID}
                    onIonChange={(e) => setDestinationID(e.detail.value!)}
                    placeholder="Enter destination ID"
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Destination Image URL</IonLabel>
                  <IonInput
                    value={destinationImage}
                    onIonChange={(e) => setDestinationImage(e.detail.value!)}
                    placeholder="Enter image URL"
                  />
                </IonItem>
                <IonButton
                  expand="block"
                  color="primary"
                  onClick={handleDestinationSubmit}
                >
                  Add Destination
                </IonButton>
              </div>
            </IonAccordion>
          </IonAccordionGroup>
        </IonCard>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;

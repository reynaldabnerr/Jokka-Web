import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonImg,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons,
  IonSpinner,
  IonItem,
  IonLabel,
  IonInput,
  IonDatetime,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { fetchEventById } from "../../api/dataService";
import { collection, doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import { firestore } from "../../api/firebaseConfig";
import { getAuth } from "firebase/auth";
import "./Eventdetail.css";

const EventDetailPage: React.FC = () => {
  const { eventid } = useParams<{ eventid: string }>();
  const [eventDetail, setEventDetail] = useState<any>(null);
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  const [ticketDate, setTicketDate] = useState<string>(""); // Simpan hanya tanggal
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const getEventDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const event = (await fetchEventById(eventid)) as {
          id: string;
          eventprice: number;
          eventname: string;
          eventimage: string;
          eventdescription: string;
          eventcategories: string;
          eventlocation: string;
          eventdate: string;
        };
        setEventDetail(event);
        setTotalPrice(event.eventprice);
      } catch (error: any) {
        setError(error.message || "Failed to fetch event details.");
      } finally {
        setLoading(false);
      }
    };

    getEventDetail();
  }, [eventid]);

  useEffect(() => {
    if (eventDetail) {
      setTotalPrice(eventDetail.eventprice * ticketQuantity);
    }
  }, [ticketQuantity, eventDetail]);

  const placeTicketOrder = async () => {
    if (!eventDetail) return;

    if (!user) {
      setError("You need to be logged in to place an order.");
      return;
    }

    try {
      setError(null);
      setSuccessMessage(null);

      const userDocRef = doc(firestore, "users", user.uid);
      const userSnapshot = await getDoc(userDocRef);
      const userData = userSnapshot.exists() ? userSnapshot.data() : null;

      if (!userData) {
        setError("User data not found.");
        return;
      }

      const eventDocRef = doc(firestore, "event", eventDetail.id);
      const ordersCollectionRef = collection(eventDocRef, "ticketevent");

      const orderData = {
        email: user.email,
        name: userData.name,
        ticketQuantity,
        ticketDate, // Simpan hanya tanggal
        totalPrice,
        timestamp: new Date(),
      };

      // Gunakan `addDoc` untuk membuat dokumen baru dengan ID unik secara otomatis
      await addDoc(ordersCollectionRef, orderData);

      setSuccessMessage("Ticket order placed successfully!");
    } catch (error: any) {
      setError("Failed to place ticket order: " + error.message);
    }
  };

  if (loading) {
    return (
      <IonPage>
        <IonContent className="loading-container">
          <IonSpinner name="crescent" />
          <p>Loading event details...</p>
        </IonContent>
      </IonPage>
    );
  }

  if (error) {
    return (
      <IonPage>
        <IonContent className="error-container">
          <p>{error}</p>
          <IonButton expand="full" color="danger" routerLink="/event">
            Go Back to Event List
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }

  if (!eventDetail) {
    return (
      <IonPage>
        <IonContent className="error-container">
          <p>Event not found.</p>
          <IonButton expand="full" color="danger" routerLink="/event">
            Go Back to Event List
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/event" />
          </IonButtons>
          <IonTitle>{eventDetail.eventname}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="event-detail-container">
          <IonImg
            src={eventDetail.eventimage}
            alt={eventDetail.eventname}
            className="event-detail-image"
          />
          <div className="event-detail-info">
            <h1>{eventDetail.eventname}</h1>
            <p>{eventDetail.eventdescription}</p>
            <p>
              <strong>Category:</strong> {eventDetail.eventcategories}
            </p>
            <p>
              <strong>Location:</strong> {eventDetail.eventlocation}
            </p>
            <p>
              <strong>Date:</strong> {eventDetail.eventdate}
            </p>
            <p>
              <strong>Price (per ticket):</strong> Rp{" "}
              {eventDetail.eventprice.toLocaleString()}
            </p>

            <IonItem>
              <IonLabel>Tickets:</IonLabel>
              <IonInput
                type="number"
                value={ticketQuantity}
                min="1"
                onIonChange={(e) =>
                  setTicketQuantity(Math.max(1, Number(e.detail.value)))
                }
              />
            </IonItem>

            <IonItem>
              <IonLabel>Date:</IonLabel>
              <IonDatetime
                presentation="date" // Hanya menampilkan tanggal
                value={ticketDate}
                onIonChange={(e) => {
                  const selectedDate = Array.isArray(e.detail.value)
                    ? e.detail.value[0]
                    : e.detail.value || ""; // Pastikan hasil adalah string
                  setTicketDate(selectedDate);
                }}
              />
            </IonItem>

            <p>
              <strong>Total Price:</strong> Rp {totalPrice.toLocaleString()}
            </p>

            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
            {error && <p className="error-message">{error}</p>}

            <IonButton expand="full" color="primary" onClick={placeTicketOrder}>
              Place Ticket Order
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EventDetailPage;

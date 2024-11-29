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
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { firestore } from "../../api/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./Eventdetail.css";

const EventDetailPage: React.FC = () => {
  const { eventid } = useParams<{ eventid: string }>(); // Ambil eventid dari URL
  const [eventDetail, setEventDetail] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Tambahkan state untuk error

  // Fungsi untuk mengambil data event berdasarkan eventid
  const fetchEventById = async (id: string) => {
    try {
      const q = query(
        collection(firestore, "event"),
        where("eventid", "==", id)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() };
      } else {
        throw new Error("Event not found");
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
      throw error;
    }
  };

  useEffect(() => {
    const getEventDetail = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error sebelum mengambil data
        const event = await fetchEventById(eventid); // Ambil detail event berdasarkan id
        setEventDetail(event);
      } catch (error: any) {
        setError(error.message || "Failed to fetch event details.");
      } finally {
        setLoading(false);
      }
    };

    getEventDetail();
  }, [eventid]);

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
            Go Back to Events
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
            Go Back to Events
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
              <strong>Location:</strong> {eventDetail.eventlocation}
            </p>
            <p>
              <strong>Date:</strong> {eventDetail.eventdate}
            </p>
            <p>
              <strong>Category:</strong> {eventDetail.eventcategories}
            </p>
            <IonButton expand="full" color="primary">
              Register Now
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EventDetailPage;

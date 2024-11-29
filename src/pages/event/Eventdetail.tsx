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
import "./Eventdetail.css";
import { fetchEventById } from "../../api/dataService";

const EventDetailPage: React.FC = () => {
  const { eventid } = useParams<{ eventid: string }>(); // Ambil eventid dari URL
  const [eventDetail, setEventDetail] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk mengambil data event berdasarkan eventid

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

      <IonContent className="page-container">
        <div className="event-detail-container">
          <div className="image-wrapper">
            <IonImg
              src={eventDetail.eventimage}
              alt={eventDetail.eventname}
              className="event-detail-image"
            />
          </div>
          <div className="event-detail-info">
            <h1>{eventDetail.eventname}</h1>
            <p className="description">{eventDetail.eventdescription}</p>
            <p>
              <strong>Location:</strong> {eventDetail.eventlocation}
            </p>
            <p>
              <strong>Date:</strong> {eventDetail.eventdate}
            </p>
            <p>
              <strong>Category:</strong> {eventDetail.eventcategories}
            </p>
            <IonButton expand="full" color="danger">
              Register Now
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EventDetailPage;

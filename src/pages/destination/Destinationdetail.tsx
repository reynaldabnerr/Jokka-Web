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
import "./Destinationdetail.css";
import {fetchDestinationById} from "../../api/dataService"

const DestinationDetailPage: React.FC = () => {
  const { destinationid } = useParams<{ destinationid: string }>(); // Ambil destinationid dari URL
  const [destinationDetail, setDestinationDetail] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const getDestinationDetail = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state
        const destination = await fetchDestinationById(destinationid); // Ambil detail destinasi
        setDestinationDetail(destination);
      } catch (error: any) {
        setError(error.message || "Failed to fetch destination details.");
      } finally {
        setLoading(false);
      }
    };

    getDestinationDetail();
  }, [destinationid]);

  if (loading) {
    return (
      <IonPage>
        <IonContent className="loading-container">
          <IonSpinner name="crescent" />
          <p>Loading destination details...</p>
        </IonContent>
      </IonPage>
    );
  }

  if (error) {
    return (
      <IonPage>
        <IonContent className="error-container">
          <p>{error}</p>
          <IonButton expand="full" color="danger" routerLink="/destination">
            Go Back to Destination List
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }

  if (!destinationDetail) {
    return (
      <IonPage>
        <IonContent className="error-container">
          <p>Destination not found.</p>
          <IonButton expand="full" color="danger" routerLink="/destination">
            Go Back to Destination List
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
            <IonBackButton defaultHref="/destination" />
          </IonButtons>
          <IonTitle>{destinationDetail.destinationname}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="destination-detail-container">
          <IonImg
            src={destinationDetail.destinationimage}
            alt={destinationDetail.destinationname}
            className="destination-detail-image"
          />
          <div className="destination-detail-info">
            <h1>{destinationDetail.destinationname}</h1>
            <p>{destinationDetail.destinationdescription}</p>
            <p>
              <strong>Category:</strong> {destinationDetail.destinationcategory}
            </p>
            <p>
              <strong>Location:</strong> {destinationDetail.destinationlocation}
            </p>
            <p>
              <strong>Price:</strong> {destinationDetail.destinationprice}
            </p>
            <p>
              <strong>Rating:</strong> {destinationDetail.destinationrating}
            </p>
            <IonButton expand="full" color="primary">
              Visit Now
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DestinationDetailPage;

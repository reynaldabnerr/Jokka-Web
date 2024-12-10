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
import { fetchDestinationById } from "../../api/dataService";
import { collection, doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import { firestore } from "../../api/firebaseConfig";
import { getAuth } from "firebase/auth";
import "./Destinationdetail.css";

const DestinationDetailPage: React.FC = () => {
  const { destinationid } = useParams<{ destinationid: string }>();
  const [destinationDetail, setDestinationDetail] = useState<any>(null);
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  const [reservationDate, setReservationDate] = useState<string>(""); // Simpan tanggal reservasi
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const getDestinationDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const destination = (await fetchDestinationById(destinationid)) as {
          id: string;
          destinationprice: number;
          destinationname: string;
          destinationimage: string;
          destinationdescription: string;
          destinationcategory: string;
          destinationlocation: string;
          destinationrating: number;
        };
        setDestinationDetail(destination);
        setTotalPrice(destination.destinationprice);
      } catch (error: any) {
        setError(error.message || "Failed to fetch destination details.");
      } finally {
        setLoading(false);
      }
    };

    getDestinationDetail();
  }, [destinationid]);

  useEffect(() => {
    if (destinationDetail) {
      setTotalPrice(destinationDetail.destinationprice * ticketQuantity);
    }
  }, [ticketQuantity, destinationDetail]);

  const placeTicketOrder = async () => {
    if (!destinationDetail) return;

    if (!user) {
      setError("You need to be logged in to place an order.");
      return;
    }

    try {
      setError(null);
      setSuccessMessage(null);

      // Ambil data pengguna dari Firestore
      const userDocRef = doc(firestore, "users", user.uid);
      const userSnapshot = await getDoc(userDocRef);
      const userData = userSnapshot.exists() ? userSnapshot.data() : null;

      if (!userData) {
        setError("User data not found.");
        return;
      }

      const destinationDocRef = doc(
        firestore,
        "destination",
        destinationDetail.id
      );
      const ordersCollectionRef = collection(destinationDocRef, "ticketorders");

      // Data pesanan
      const orderData = {
        email: user.email,
        name: userData.name,
        ticketQuantity,
        reservationDate, // Simpan tanggal reservasi
        totalPrice,
        timestamp: new Date(), // Tambahkan timestamp untuk pesanan
      };

      // Tambahkan dokumen baru (ID akan dibuat secara otomatis)
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
              <strong>Price (per ticket):</strong> Rp{" "}
              {destinationDetail.destinationprice.toLocaleString()}
            </p>
            <p>
              <strong>Rating:</strong> {destinationDetail.destinationrating}
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
              <IonLabel>Reservation Date:</IonLabel>
              <IonDatetime
                presentation="date" // Hanya menampilkan tanggal
                value={reservationDate}
                onIonChange={(e) => {
                  const selectedDate = Array.isArray(e.detail.value)
                    ? e.detail.value[0]
                    : e.detail.value || "";
                  setReservationDate(selectedDate); // Tetapkan nilai ke reservationDate
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

export default DestinationDetailPage;

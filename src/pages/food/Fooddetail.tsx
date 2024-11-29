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
import "./Fooddetail.css";

const FoodDetailPage: React.FC = () => {
  const { foodid } = useParams<{ foodid: string }>(); // Ambil foodid dari URL
  const [foodDetail, setFoodDetail] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFoodById = async (id: string) => {
    try {
      const q = query(collection(firestore, "food"), where("foodid", "==", id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() };
      } else {
        throw new Error("Food not found");
      }
    } catch (error) {
      console.error("Error fetching food details:", error);
      throw error;
    }
  };

  useEffect(() => {
    const getFoodDetail = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state
        const food = await fetchFoodById(foodid); // Ambil detail makanan berdasarkan id
        setFoodDetail(food);
      } catch (error: any) {
        setError(error.message || "Failed to fetch food details.");
      } finally {
        setLoading(false);
      }
    };

    getFoodDetail();
  }, [foodid]);

  if (loading) {
    return (
      <IonPage>
        <IonContent className="loading-container">
          <IonSpinner name="crescent" />
          <p>Loading food details...</p>
        </IonContent>
      </IonPage>
    );
  }

  if (error) {
    return (
      <IonPage>
        <IonContent className="error-container">
          <p>{error}</p>
          <IonButton expand="full" color="danger" routerLink="/food">
            Go Back to Food List
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }

  if (!foodDetail) {
    return (
      <IonPage>
        <IonContent className="error-container">
          <p>Food not found.</p>
          <IonButton expand="full" color="danger" routerLink="/food">
            Go Back to Food List
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
            <IonBackButton defaultHref="/food" />
          </IonButtons>
          <IonTitle>{foodDetail.foodname}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="food-detail-container">
          <IonImg
            src={foodDetail.foodimage}
            alt={foodDetail.foodname}
            className="food-detail-image"
          />
          <div className="food-detail-info">
            <h1>{foodDetail.foodname}</h1>
            <p>{foodDetail.fooddesc}</p>
            <p>
              <strong>Category:</strong> {foodDetail.foodcategories}
            </p>
            <p>
              <strong>Price:</strong> {foodDetail.foodprice}
            </p>
            <p>
              <strong>Rating:</strong> {foodDetail.foodrating}
            </p>
            <IonButton expand="full" color="primary">
              Order Now
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FoodDetailPage;

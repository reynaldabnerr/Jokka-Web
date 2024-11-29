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
import "./Fooddetail.css";
import { fetchFoodById } from "../../api/dataService"; 

const FoodDetailPage: React.FC = () => {
  const { foodid } = useParams<{ foodid: string }>(); // Ambil foodid dari URL
  const [foodDetail, setFoodDetail] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

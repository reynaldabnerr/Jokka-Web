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
  IonInput,
  IonItem,
  IonLabel,
  IonDatetime,
} from "@ionic/react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../../api/firebaseConfig";
import { getAuth } from "firebase/auth";
import "./Fooddetail.css";
import { useParams } from "react-router";

interface FoodDetail {
  id: string;
  foodid: string;
  foodname: string;
  foodprice: number;
  fooddesc: string;
  foodcategories: string;
  foodimage: string;
  foodrating: number;
}

const FoodDetailPage: React.FC = () => {
  const { foodid } = useParams<{ foodid: string }>();
  const [foodDetail, setFoodDetail] = useState<FoodDetail | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [reservationTime, setReservationTime] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchFoodById = async (id: string): Promise<FoodDetail> => {
    const q = query(collection(firestore, "food"), where("foodid", "==", id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...(doc.data() as Omit<FoodDetail, "id">),
      };
    } else {
      throw new Error("Food not found");
    }
  };

  const placeOrder = async () => {
    if (!foodDetail) return;

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setError("You need to be logged in to place an order.");
      return;
    }

    try {
      const userDocRef = doc(firestore, "users", user.uid); // Referensi ke pengguna
      const userSnapshot = await getDoc(userDocRef); // Gunakan getDoc untuk dokumen individual
      const userData = userSnapshot.exists() ? userSnapshot.data() : null;

      if (!userData || !userData.name) {
        setError("User data or name not found.");
        return;
      }

      const foodDocRef = doc(firestore, "food", foodDetail.id); // Referensi ke dokumen food
      const ordersCollectionRef = collection(foodDocRef, "foodorders"); // Subkoleksi foodorders

      const orderData = {
        phone_number: userData.phone_number,
        email: user.email,
        name: userData.name,
        quantity,
        totalPrice,
        reservationTime,
        timestamp: new Date(),
      };

      // Gunakan userData.name sebagai document ID
      const orderDocRef = doc(ordersCollectionRef, userData.name);
      await setDoc(orderDocRef, orderData); // Tambahkan pesanan dengan ID userData.name

      setSuccessMessage("Order placed successfully!");
    } catch (error: any) {
      setError("Failed to place order: " + error.message);
    }
  };

  useEffect(() => {
    const getFoodDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const food = await fetchFoodById(foodid);
        setFoodDetail(food);
        setTotalPrice(food.foodprice);
      } catch (error: any) {
        setError(error.message || "Failed to fetch food details.");
      } finally {
        setLoading(false);
      }
    };

    getFoodDetail();
  }, [foodid]);

  useEffect(() => {
    if (foodDetail) {
      setTotalPrice(foodDetail.foodprice * quantity);
    }
  }, [quantity, foodDetail]);

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
              <strong>Price (per item):</strong> Rp{" "}
              {foodDetail.foodprice.toLocaleString()}
            </p>

            <IonItem>
              <IonLabel>Quantity:</IonLabel>
              <IonInput
                type="number"
                value={quantity}
                min="1"
                onIonChange={(e) =>
                  setQuantity(Math.max(1, Number(e.detail.value)))
                }
              />
            </IonItem>

            <IonItem>
              <IonLabel>Reservation Time:</IonLabel>
              <IonDatetime
                value={reservationTime}
                onIonChange={(e) =>
                  setReservationTime(
                    Array.isArray(e.detail.value)
                      ? e.detail.value[0]
                      : e.detail.value || ""
                  )
                }
              />
            </IonItem>

            <p>
              <strong>Total Price:</strong> Rp {totalPrice.toLocaleString()}
            </p>

            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
            {error && <p className="error-message">{error}</p>}

            <IonButton expand="full" color="primary" onClick={placeOrder}>
              Place Order
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FoodDetailPage;

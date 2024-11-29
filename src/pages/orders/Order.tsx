import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSpinner,
  IonList,
  IonCard,
  IonCardContent,
  IonText,
  IonButton,
} from "@ionic/react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../../api/firebaseConfig";
import { getAuth } from "firebase/auth";
import "./Order.css";
import NavBar from "../../components/common/NavBar";

interface Order {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  quantity: number;
  totalPrice: number;
  reservationTime: string;
  foodName: string; // Tambahkan foodName untuk menampilkan nama makanan
}

const OrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setError("You need to be logged in to view your orders.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Query pesanan dari koleksi foodorders berdasarkan email pengguna
      const foodCollection = collection(firestore, "food");
      const foodQuerySnapshot = await getDocs(foodCollection);

      const userOrders: Order[] = [];
      for (const foodDoc of foodQuerySnapshot.docs) {
        const foodName = foodDoc.data().foodname; // Ambil nama makanan
        const foodOrdersRef = collection(foodDoc.ref, "foodorders");
        const orderQuery = query(
          foodOrdersRef,
          where("email", "==", user.email) // Filter berdasarkan email pengguna
        );

        const orderSnapshot = await getDocs(orderQuery);
        orderSnapshot.forEach((orderDoc) => {
          userOrders.push({
            id: orderDoc.id,
            foodName, // Tambahkan nama makanan ke data pesanan
            ...(orderDoc.data() as Omit<Order, "id" | "foodName">),
          });
        });
      }

      setOrders(userOrders);
    } catch (error: any) {
      setError(error.message || "Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <IonPage>
        <IonContent className="loading-container">
          <IonSpinner name="crescent" />
          <p>Loading your orders...</p>
        </IonContent>
      </IonPage>
    );
  }

  if (error) {
    return (
      <IonPage>
        <IonContent className="error-container">
          <p>{error}</p>
          <IonButton expand="full" shape="round" color="danger" routerLink="/food">
            Go Back to Food List
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <NavBar />
      <IonContent>
        {orders.length > 0 ? (
          <IonList>
            {orders.map((order) => (
              <IonCard key={order.id}>
                <IonCardContent>
                  <h2>Food Order</h2>
                  <p>
                    <strong>Food:</strong> {order.foodName}
                  </p>
                  <p>
                    <strong>Name:</strong> {order.name}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {order.quantity}
                  </p>
                  <p>
                    <strong>Total Price:</strong> Rp{" "}
                    {order.totalPrice.toLocaleString()}
                  </p>
                  <p>
                    <strong>Reservation Time:</strong>{" "}
                    {new Date(order.reservationTime).toLocaleString()}
                  </p>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        ) : (
          <IonText className="no-orders-message">
            <p>You have no orders yet.</p>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default OrderPage;

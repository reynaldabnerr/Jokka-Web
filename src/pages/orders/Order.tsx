import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardContent,
  IonSpinner,
  IonText,
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
  quantity: number;
  totalPrice: number;
  reservationTime?: string; // Untuk kategori Food
  ticketDate?: string; // Untuk kategori Event atau Destination
  itemName: string; // Nama makanan, event, atau destinasi
  category: string; // Kategori pesanan: "Food", "Event", "Destination"
}

const OrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

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

      const userOrders: Order[] = [];

      // Fetch food orders
      const foodCollection = collection(firestore, "food");
      const foodQuerySnapshot = await getDocs(foodCollection);
      for (const foodDoc of foodQuerySnapshot.docs) {
        const foodName = foodDoc.data().foodname;
        const foodOrdersRef = collection(foodDoc.ref, "foodorders");
        const foodOrderQuery = query(
          foodOrdersRef,
          where("email", "==", user.email)
        );
        const foodOrderSnapshot = await getDocs(foodOrderQuery);
        foodOrderSnapshot.forEach((orderDoc) => {
          userOrders.push({
            id: orderDoc.id,
            itemName: foodName,
            category: "Food",
            ...(orderDoc.data() as Omit<Order, "id" | "itemName" | "category">),
          });
        });
      }

      // Fetch event orders
      const eventCollection = collection(firestore, "event");
      const eventQuerySnapshot = await getDocs(eventCollection);
      for (const eventDoc of eventQuerySnapshot.docs) {
        const eventName = eventDoc.data().eventname;
        const eventOrdersRef = collection(eventDoc.ref, "ticketevent");
        const eventOrderQuery = query(
          eventOrdersRef,
          where("email", "==", user.email)
        );
        const eventOrderSnapshot = await getDocs(eventOrderQuery);
        eventOrderSnapshot.forEach((orderDoc) => {
          userOrders.push({
            id: orderDoc.id,
            itemName: eventName,
            category: "Event",
            ...(orderDoc.data() as Omit<Order, "id" | "itemName" | "category">),
          });
        });
      }

      // Fetch destination orders
      const destinationCollection = collection(firestore, "destination");
      const destinationQuerySnapshot = await getDocs(destinationCollection);
      for (const destinationDoc of destinationQuerySnapshot.docs) {
        const destinationName = destinationDoc.data().destinationname;
        const destinationOrdersRef = collection(
          destinationDoc.ref,
          "ticketorders"
        );
        const destinationOrderQuery = query(
          destinationOrdersRef,
          where("email", "==", user.email)
        );
        const destinationOrderSnapshot = await getDocs(destinationOrderQuery);
        destinationOrderSnapshot.forEach((orderDoc) => {
          const rawData = orderDoc.data();
          userOrders.push({
            id: orderDoc.id,
            itemName: destinationName,
            category: "Destination",
            ticketDate: rawData.reservationDate,
            ...(rawData as Omit<
              Order,
              "id" | "itemName" | "category" | "ticketDate"
            >),
          });
        });
      }

      setOrders(userOrders);
      setFilteredOrders(userOrders); // Set semua pesanan sebagai default
    } catch (error: any) {
      setError(error.message || "Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredOrders([...orders]);
    } else {
      setFilteredOrders(
        orders.filter(
          (order) => order.category.toLowerCase() === category.toLowerCase()
        )
      );
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
          <IonButton expand="full" shape="round" color="danger" routerLink="/home">
            Go Back to Home
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <NavBar />
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Orders</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="order-layout">
          <div className="filter-section">
            <IonCard className="filter-container">
              <IonCardContent>
                <h2>Filter</h2>
                <IonItem lines="none">
                  {/* <IonLabel>Category</IonLabel> */}
                  <IonSelect
                    value={selectedCategory}
                    placeholder="Select Category"
                    onIonChange={(e) => handleCategoryChange(e.detail.value)}
                  >
                    <IonSelectOption value="All">All</IonSelectOption>
                    <IonSelectOption value="Food">Food</IonSelectOption>
                    <IonSelectOption value="Event">Event</IonSelectOption>
                    <IonSelectOption value="Destination">Destination</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonButton shape="round" expand="block" onClick={() => handleCategoryChange("All")}>
                Reset
                </IonButton>
              </IonCardContent>
            </IonCard>
          </div>
          <div className="card-section">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <IonCard key={order.id} className="order-card">
                  <IonCardContent>
                    <h2>{order.itemName}</h2>
                    <p>
                      <strong>Name:</strong> {order.name}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {order.quantity}
                    </p>
                    <p>
                      <strong>Total Price:</strong> Rp {order.totalPrice.toLocaleString()}
                    </p>
                    {order.category === "Food" ? (
                      <p>
                        <strong>Reservation Time:</strong>{" "}
                        {order.reservationTime
                          ? new Date(order.reservationTime).toLocaleString()
                          : "Invalid Date"}
                      </p>
                    ) : (
                      <p>
                        <strong>Reservation Date:</strong>{" "}
                        {order.ticketDate
                          ? new Date(order.ticketDate).toLocaleDateString()
                          : "Invalid Date"}
                      </p>
                    )}
                    <IonButton shape="round">See Details</IonButton>
                  </IonCardContent>
                </IonCard>
              ))
            ) : (
              <IonText className="no-orders-message">
                <p>No orders found for this category.</p>
              </IonText>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default OrderPage;

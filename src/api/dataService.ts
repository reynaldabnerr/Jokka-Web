import { firestore } from "./firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

// Fungsi untuk mengambil data dari koleksi "event"
export const fetchEvents = async () => {
  const eventSnapshot = await getDocs(collection(firestore, "event"));
  return eventSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Fungsi untuk mengambil data dari koleksi "destination"
export const fetchPlaces = async () => {
  const placeSnapshot = await getDocs(collection(firestore, "destination"));
  return placeSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Fungsi untuk mengambil data dari koleksi "food"
export const fetchFood = async () => {
  const foodSnapshot = await getDocs(collection(firestore, "food"));
  return foodSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Fungsi untuk mengambil data dari koleksi "users"
export const fetchUser = async () => {
  const userSnapshot = await getDocs(collection(firestore, "users"));
  return userSnapshot.docs.map((doc) => ({
    id: doc.id,
    email: doc.data().email,
    name: doc.data().name,
    phone_number: doc.data().phone_number,
    profile_picture_url: doc.data().profile_picture_url,
    role: doc.data().role,
  }));
};

export const fetchFoodById = async (id: string) => {
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

// Fungsi untuk fetch data berdasarkan destinationid
  export const fetchDestinationById = async (id: string) => {
    try {
      const q = query(
        collection(firestore, "destination"),
        where("destinationid", "==", id)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() };
      } else {
        throw new Error("Destination not found");
      }
    } catch (error) {
      console.error("Error fetching destination details:", error);
      throw error;
    }
  };

  export const fetchEventById = async (id: string) => {
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

import { firestore } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

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

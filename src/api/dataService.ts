import { firestore } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const fetchEvents = async () => {
  const eventSnapshot = await getDocs(collection(firestore, "event"));
  return eventSnapshot.docs.map((doc) => doc.data());
};

export const fetchPlaces = async () => {
  const placeSnapshot = await getDocs(collection(firestore, "destination"));
  return placeSnapshot.docs.map((doc) => doc.data());
};

export const fetchFood = async () => {
  const foodSnapshot = await getDocs(collection(firestore, "food"));
  return foodSnapshot.docs.map((doc) => doc.data());
};

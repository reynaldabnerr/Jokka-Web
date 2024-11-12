import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonLabel,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import NavBar from "../../components/NavBar";
import { firestore } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./Home.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Home: React.FC = () => {
  const [carouselImages, setCarouselImages] = useState<string[]>([
    "https://i.ibb.co.com/XX6Z1QN/pokemon.jpg",
    "https://i.ibb.co.com/XX6Z1QN/pokemon.jpg",
    "https://i.ibb.co.com/XX6Z1QN/pokemon.jpg",
  ]);
  const [popularEvent, setPopularEvent] = useState<any[]>([]);
  const [popularPlaces, setPopularPlaces] = useState<any[]>([]);
  const [popularFood, setPopularFood] = useState<any[]>([]);

  // Fungsi untuk mengambil data dari Firestore
  const fetchData = async () => {
    try {
      // Mengambil data event
      const eventSnapshot = await getDocs(collection(firestore, "event"));
      const eventData = eventSnapshot.docs.map((doc) => doc.data());
      setPopularEvent(eventData);

      // Mengambil data destination
      const placeSnapshot = await getDocs(collection(firestore, "destination"));
      const placeData = placeSnapshot.docs.map((doc) => doc.data());
      setPopularPlaces(placeData);

      // Mengambil data food
      const foodSnapshot = await getDocs(collection(firestore, "food"));
      const foodData = foodSnapshot.docs.map((doc) => doc.data());
      setPopularFood(foodData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <IonPage>
      <NavBar />
      <IonContent fullscreen>
        {/* Hero Slider */}
        <div className="carousel-container">
          <Swiper
            modules={[Autoplay, Pagination]}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="hero-swiper"
          >
            {carouselImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="carousel-image"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Popular Event */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Event Terkini</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                {popularEvent.map((event, index) => (
                  <IonCol size="6" key={index}>
                    <div className="event-card">
                      <IonImg src={event.eventimage} className="event-image" />
                      <IonLabel className="event-name">
                        {event.eventname}
                      </IonLabel>
                    </div>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Popular Places */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Tempat Populer</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                {popularPlaces.map((place, index) => (
                  <IonCol size="6" key={index}>
                    <div className="place-card">
                      <IonImg
                        src={place.destinationimage}
                        className="place-image"
                      />
                      <IonLabel className="place-name">
                        {place.destinationname}
                      </IonLabel>
                    </div>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Popular Food */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Kuliner Populer</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                {popularFood.map((food, index) => (
                  <IonCol size="6" key={index}>
                    <div className="food-card">
                      <IonImg src={food.foodimage} className="food-image" />
                      <IonLabel className="food-name">{food.foodname}</IonLabel>
                    </div>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <IonCard className="download-card">
          <IonCardContent>
            <div className="download-container">
              {/* Bagian Gambar */}
              <div className="image-section">
                <IonImg
                  src="https://uim-makassar.ac.id/wp-content/uploads/2022/07/1_jD-8s4iAF5IBBUi3LlMQog.png" // Ganti URL gambar dengan URL gambar asli
                  className="main-image"
                />
              </div>

              {/* Bagian Konten Teks */}
              <div className="content-section">
                <h2>Dapatkan Aplikasi Jokka App</h2>
                <div className="features">
                  <p>✓ Mudah Merencanakan Perjalanan</p>
                  <p>✓ Akses Dimanapun</p>
                </div>
                <div className="goals">
                  <span>Lebih Mudah</span>
                  <span>Lebih Hemat</span>
                </div>
                <p className="qr-instruction">
                  Scan QR Code untuk mengunduh aplikasi !
                </p>
                <IonImg
                  src="https://via.placeholder.com/120" // URL QR code asli
                  className="qr-code"
                />
              </div>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;

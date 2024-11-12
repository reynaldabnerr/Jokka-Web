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
    "https://awsimages.detik.net.id/community/media/visual/2021/06/18/rammang-rammang_169.jpeg?w=650",
    "https://awsimages.detik.net.id/community/media/visual/2021/06/18/rammang-rammang_169.jpeg?w=650",
    "https://awsimages.detik.net.id/community/media/visual/2021/06/18/rammang-rammang_169.jpeg?w=650",
  ]);
  const [popularEvent, setPopularEvent] = useState<any[]>([]);
  const [popularPlaces, setPopularPlaces] = useState<any[]>([]);
  const [popularFood, setPopularFood] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const eventSnapshot = await getDocs(collection(firestore, "event"));
      const eventData = eventSnapshot.docs.map((doc) => doc.data());
      setPopularEvent(eventData);

      const placeSnapshot = await getDocs(collection(firestore, "destination"));
      const placeData = placeSnapshot.docs.map((doc) => doc.data());
      setPopularPlaces(placeData);

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

        {/* Dekoratif Text untuk Event Terkini */}
        <div className="decorative-text">
          <h2>Discover Amazing Events Near You</h2>
          <p>Stay updated with the latest events happening around you.</p>
        </div>

        {/* Popular Event */}
        <IonCard className="popular-card">
          <IonCardHeader>
            <IonCardTitle>Event Terkini</IonCardTitle>
            <p className="section-description">
              Ikuti beragam acara terkini di sekitar Anda untuk pengalaman tak
              terlupakan.
            </p>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid className="event-grid">
              <IonRow>
                {popularEvent.map((event, index) => (
                  <IonCol size="6" key={index} className="event-col">
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

        {/* Dekoratif Text untuk Tempat Populer */}
        <div className="decorative-text">
          <h2>Explore Popular Destinations</h2>
          <p>Find the most popular and breathtaking destinations to visit.</p>
        </div>

        {/* Popular Places */}
        <IonCard className="popular-card">
          <IonCardHeader>
            <IonCardTitle>Tempat Populer</IonCardTitle>
            <p className="section-description">
              Temukan destinasi wisata favorit untuk kunjungan yang mengesankan
              dan penuh inspirasi.
            </p>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid className="place-grid">
              <IonRow>
                {popularPlaces.map((place, index) => (
                  <IonCol size="6" key={index} className="place-col">
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

        {/* Dekoratif Text untuk Kuliner Populer */}
        <div className="decorative-text">
          <h2>Taste Popular Culinary Delights</h2>
          <p>Indulge in the best local cuisine that the city has to offer.</p>
        </div>

        {/* Popular Food */}
        <IonCard className="popular-card">
          <IonCardHeader>
            <IonCardTitle>Kuliner Populer</IonCardTitle>
            <p className="section-description">
              Nikmati aneka kuliner khas yang menggugah selera di destinasi
              Anda.
            </p>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid className="food-grid">
              <IonRow>
                {popularFood.map((food, index) => (
                  <IonCol size="6" key={index} className="food-col">
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
        {/* Download App Section */}
        <IonCard className="download-card">
          <IonCardContent>
            <div className="download-container">
              <div className="image-section">
                <IonImg
                  src="https://uim-makassar.ac.id/wp-content/uploads/2022/07/1_jD-8s4iAF5IBBUi3LlMQog.png"
                  className="main-image"
                />
              </div>
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
                  Scan QR Code untuk mengunduh aplikasi!
                </p>
                <IonImg
                  src="https://via.placeholder.com/120"
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

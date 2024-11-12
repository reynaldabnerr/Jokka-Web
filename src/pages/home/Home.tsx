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
  IonChip,
  IonLabel,
  IonButton,
  IonRow,
  IonCol,
  IonImg,
  IonGrid,
} from "@ionic/react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "./Home.css";
import NavBar from "../../components/NavBar";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tempat Bersejarah");

  const carouselImages = [
    "https://via.placeholder.com/800x400?text=Hero+Image+1",
    "https://via.placeholder.com/800x400?text=Hero+Image+2",
    "https://via.placeholder.com/800x400?text=Hero+Image+3",
  ];
  const popularEvent = [
    {
      name: "Festival Budaya",
      image: "https://via.placeholder.com/150?text=Festival+Budaya",
    },
    {
      name: "Pameran Seni",
      image: "https://via.placeholder.com/150?text=Pameran+Seni",
    },
    {
      name: "Konser Musik",
      image: "https://via.placeholder.com/150?text=Konser+Musik",
    },
    {
      name: "Lomba Masak",
      image: "https://via.placeholder.com/150?text=Lomba+Masak",
    },
    {
      name: "Pertunjukan Teater",
      image: "https://via.placeholder.com/150?text=Pertunjukan+Teater",
    },
    {
      name: "Bazar Kuliner",
      image: "https://via.placeholder.com/150?text=Bazar+Kuliner",
    },
  ];

  const popularPlaces = [
    {
      name: "Benteng Rotterdam",
      image: "https://via.placeholder.com/150?text=Benteng+Rotterdam",
    },
    {
      name: "Pulau Samalona",
      image: "https://via.placeholder.com/150?text=Pulau+Samalona",
    },
    {
      name: "Center Point Indonesia",
      image: "https://via.placeholder.com/150?text=Center+Point+Indonesia",
    },
    {
      name: "Masjid 99 Kubah CPI",
      image: "https://via.placeholder.com/150?text=Masjid+99+Kubah+CPI",
    },
    {
      name: "Kampoeng Karst Rammang Rammang",
      image:
        "https://via.placeholder.com/150?text=Kampoeng+Karst+Rammang+Rammang",
    },
    {
      name: "Pulau Samalona",
      image: "https://via.placeholder.com/150?text=Pulau+Samalona",
    },
  ];

  const popularFood = [
    {
      name: "Coto Makassar",
      image: "path/to/coto.jpg",
    },
    {
      name: "Pallu Bassa",
      image: "path/to/pallu-bassa.jpg",
    },
    {
      name: "Sop Konro",
      image: "path/to/sop-konro.jpg",
    },
    {
      name: "Pisang Epe",
      image: "path/to/pisang-epe.jpg",
    },
    {
      name: "Pisang Hijau",
      image: "path/to/pisang-hijau.jpg",
    },
    {
      name: "Ikan Bakar Parape",
      image: "path/to/ikan-bakar.jpg",
    },
  ];

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
            <IonCardTitle>Event terkini</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                {popularEvent.map((Event, index) => (
                  <IonCol size="6" key={index}>
                    <div className="event-card">
                      <IonImg src={Event.image} className="event-image" />
                      <IonLabel className="event-name">{Event.name}</IonLabel>
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
                      <IonImg src={place.image} className="place-image" />
                      <IonLabel className="place-name">{place.name}</IonLabel>
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
                      <IonImg src={food.image} className="food-image" />
                      <IonLabel className="food-name">{food.name}</IonLabel>
                    </div>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* App Download Section */}
        <IonCard className="download-card">
          <IonCardContent>
            <div className="download-container">
              <div className="download-text">
                <h2>Dapatkan Aplikasi Jokka App</h2>
                <p>✓ Mudah Merencanakan Perjalanan</p>
                <p>✓ Akses Dimanapun</p>
                <div className="goals">
                  <span>Mencapai Indonesia Emas 2045</span>
                  <span>Memenuhi Poin-Poin SDG</span>
                </div>
              </div>
              <IonImg
                src="https://via.placeholder.com/150?text=QR+Code"
                className="qr-code"
              />
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
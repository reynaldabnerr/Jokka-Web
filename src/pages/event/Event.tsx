import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { fetchEvents } from "../../api/dataService";
import "./Event.css";
import NavBar from "../../components/common/NavBar";
import DownloadCard from "../../components/DownloadCard";
import Carousel2 from "../../components/Carousel2";
import { Swiper, SwiperSlide } from "swiper/react";

const slideOpts = {
  initialSlide: 0,
  speed: 400,
  slidesPerView: 3,
  spaceBetween: 10,
  breakpoints: {
    320: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
};

const Event: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const history = useHistory(); // Tambahkan useHistory untuk navigasi

  // Daftar kategori event yang dipilih, termasuk "All"
  const eventCategories = [
    "All",
    "Music",
    "Conference",
    "Workshop",
    "Seminar",
    "Festival",
    "Sports",
    "Party",
    "Exhibition",
  ];

  // State untuk menyimpan data event yang diambil dari Firestore
  const [trendingEvents, setTrendingEvents] = useState<any[]>([]);

  // Fetch data dari Firestore
  const fetchData = async () => {
    try {
      const events = await fetchEvents(); // Mengambil data event dari Firestore
      setTrendingEvents(events); // Menyimpan data event ke state
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };

  useEffect(() => {
    fetchData(); // Panggil fetchData saat komponen pertama kali dimuat
  }, []);

  // Filter event berdasarkan kategori yang dipilih
  const filteredEvents =
    selectedCategory === "All"
      ? trendingEvents
      : trendingEvents.filter(
          (event) => event.eventcategories === selectedCategory
        );

  // Ambil gambar kategori dan nama event dari event yang difilter
  const categoryImages = filteredEvents.map((event) => ({
    image: event.eventimage,
    title: event.eventname,
    id: event.eventid, // Pastikan `eventid` diteruskan
  }));

  return (
    <IonPage>
      <NavBar />

      <IonContent>
        <div className="event-container">
          {/* Event Trending Section */}
          <div className="carousel-container">
            <div
              className="carousel-arrow left-arrow"
              onClick={() =>
                (
                  document.querySelector(".swiper-button-prev") as HTMLElement
                )?.click()
              }
            >
              &#10094;
            </div>
            <Carousel2
              images={trendingEvents.map((event) => ({
                url: event.eventimage,
              }))}
            />
            <div
              className="carousel-arrow right-arrow"
              onClick={() =>
                (
                  document.querySelector(".swiper-button-next") as HTMLElement
                )?.click()
              }
            >
              &#10095;
            </div>
          </div>

          {/* Categories Section */}
          <h2 className="section-title section-title-categories">Categories</h2>
          <div className="categories-buttons">
            {eventCategories.map((category, index) => (
              <button
                key={index}
                className={`category-button ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Category Images */}
          <div className="category-images">
            <Swiper {...slideOpts}>
              {categoryImages.map((category) => (
                <SwiperSlide
                  key={category.id}
                  className="category-slide"
                  onClick={() => history.push(`/event/${category.id}`)} // Navigasi ke detail page berdasarkan eventid
                >
                  <img
                    src={category.image}
                    alt={`Event ${category.title}`}
                    className="category-image"
                  />
                  <div className="category-title">{category.title}</div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Special Events Section (Without Category Filter) */}
          <div className="special-event-background">
            <h2 className="section-title">Jelajahi Event Luar Biasa</h2>
            <p className="section-title-special">
              Maksimalkan pengorganisasian berbagai festival yang menarik bagi
              wisatawan lokal dan internasional.
            </p>
            <IonGrid>
              <IonRow>
                {trendingEvents.slice(0, 8).map((event) => (
                  <IonCol size="12" sizeMd="6" sizeLg="3" key={event.eventid}>
                    <IonCard
                      className="special-event-card"
                      onClick={() => history.push(`/event/${event.eventid}`)} // Navigasi ke detail page berdasarkan eventid
                    >
                      <IonImg src={event.eventimage} alt={event.eventname} />
                      <IonCardContent>
                        <h3>{event.eventname}</h3>
                        <p>{event.eventdescription}</p>
                        <p>
                          <strong>Location:</strong> {event.eventlocation}
                        </p>
                        <p>
                          <strong>Date:</strong> {event.eventdate}
                        </p>
                        <p>
                          <strong>Category:</strong> {event.eventcategories}
                        </p>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </div>
        </div>
        <DownloadCard />
      </IonContent>
    </IonPage>
  );
};

export default Event;

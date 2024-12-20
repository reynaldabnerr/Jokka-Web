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
import { fetchPlaces } from "../../api/dataService";
import "./Destination.css";
import NavBar from "../../components/common/NavBar";
import DownloadCard from "../../components/DownloadCard";
import Carousel2 from "../../components/Carousel2";
import { Swiper, SwiperSlide } from "swiper/react";
import Footer from '../../components/Footer';

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

const Destination: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const history = useHistory(); // Tambahkan useHistory untuk navigasi

  // Daftar kategori destination yang dipilih, termasuk "All"
  const destinationCategories = [
    "All",
    "Nature",
    "Beach",
    "Mountains",
    "Historical",
    "Urban",
    "Adventure",
    "Cultural",
    "Parks",
    "Resorts",
  ];

  // State untuk menyimpan data destination yang diambil dari Firestore
  const [trendingdestinations, setTrendingdestinations] = useState<any[]>([]);

  // Fetch data dari Firestore
  const fetchData = async () => {
    try {
      const destinations = await fetchPlaces(); // Mengambil data destination dari Firestore
      setTrendingdestinations(destinations); // Menyimpan data destination ke state
    } catch (error) {
      console.error("Error fetching destinations: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtereddestinations =
    selectedCategory === "All"
      ? trendingdestinations
      : trendingdestinations.filter(
          (destination) => destination.destinationcategory === selectedCategory
        );

  const categoryImages = filtereddestinations.map((destination) => ({
    image: destination.destinationimage,
    title: destination.destinationname,
    id: destination.destinationid, // Pastikan destinationid diteruskan
  }));

  return (
    <IonPage>
      <NavBar />

      <IonContent>
        <div className="destination-container">
          {/* destination Trending Section */}
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
              images={trendingdestinations.map((destination) => ({
                url: destination.destinationimage,
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
            {destinationCategories.map((category, index) => (
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
                  onClick={() => history.push(`/destination/${category.id}`)} // Navigasi ke detail page berdasarkan destinationid
                >
                  <img
                    src={category.image}
                    alt={`destination ${category.title}`}
                    className="category-image"
                  />
                  <div className="category-title">{category.title}</div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Special destinations Section (Without Category Filter) */}
          <div className="special-destination-background">
            <h2 className="section-title">Jelajahi destination Luar Biasa</h2>
            <p className="section-title-special">
              Temukan destinasi wisata favorit untuk kunjungan yang mengesankan
              dan penuh inspirasi.
            </p>
            <IonGrid>
              <IonRow>
                {/* Menampilkan semua destination tanpa filter kategori */}
                {trendingdestinations.slice(0, 8).map((destination) => (
                  <IonCol
                    size="12"
                    sizeMd="6"
                    sizeLg="3"
                    key={destination.destinationid}
                  >
                    <IonCard
                      className="special-destination-card"
                      onClick={() =>
                        history.push(
                          `/destination/${destination.destinationid}`
                        )
                      } // Navigasi ke detail page berdasarkan destinationid
                    >
                      <IonImg
                        src={destination.destinationimage}
                        alt={destination.destinationname}
                      />
                      <IonCardContent>
                        <h3>{destination.destinationname}</h3>
                        <p>
                          <strong>Location:</strong>{" "}
                          {destination.destinationlocation}
                        </p>
                        <p>
                          <strong>★</strong>{" "}
                          {destination.destinationrating || "N/A"}
                        </p>
                        <p>
                          <strong>Category:</strong>{" "}
                          {destination.destinationcategory}
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
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Destination;

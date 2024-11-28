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
import { fetchFood } from "../../api/dataService";
import "./Food.css";
import NavBar from "../../components/NavBar";
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

const food: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Daftar kategori food yang dipilih, termasuk "All"
  const foodCategories = [
    "All",
    "Traditional",
    "Fast Food",
    "Dessert",
    "Vegetarian",
    "Vegan",
    "Seafood",
    "Street Food",
  ];

  // State untuk menyimpan data food yang diambil dari Firestore
  const [trendingfoods, setTrendingfoods] = useState<any[]>([]);

  // Fetch data dari Firestore
  const fetchData = async () => {
    try {
      const foods = await fetchFood();
      setTrendingfoods(foods);
    } catch (error) {
      console.error("Error fetching foods: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredfoods =
    selectedCategory === "All"
      ? trendingfoods
      : trendingfoods.filter(
          (food) => food.foodcategories === selectedCategory
        );

  const categoryImages = filteredfoods.map((food) => ({
    image: food.foodimage,
    title: food.foodname,
  }));

  return (
    <IonPage>
      <NavBar />

      <IonContent>
        <div className="food-container">
          {/* food Trending Section */}
          {/* <h2 className="section-title">food Trending</h2> */}
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
              images={trendingfoods.map((food) => ({
                url: food.foodimage,
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
            {foodCategories.map((category, index) => (
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
              {categoryImages.map((category, index) => (
                <SwiperSlide key={index} className="category-slide">
                  <img
                    src={category.image}
                    alt={`food ${index + 1}`}
                    className="category-image"
                  />
                  <div className="category-title">{category.title}</div>{" "}
                  {/* Menampilkan foodname */}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Special foods Section (Without Category Filter) */}
          <div className="special-food-background">
            <h2 className="section-title">Jelajahi food Luar Biasa</h2>
            <p className="section-title-special">
              Nikmati aneka kuliner khas yang menggugah selera di destinasi
              Anda.
            </p>
            <IonGrid>
              <IonRow>
                {trendingfoods.slice(0, 8).map((food, index) => (
                  <IonCol size="12" sizeMd="6" sizeLg="3" key={food.foodid}>
                    <IonCard className="special-food-card">
                      <IonImg src={food.foodimage} alt={food.foodname} />
                      <IonCardContent>
                        <h3>{food.foodname}</h3>
                        <p>{food.fooddesc}</p>
                        <p>
                          <strong>Harga:</strong> {food.foodprice}
                        </p>
                        <p>
                          <strong>★</strong> {food.foodrating || "N/A"}
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

export default food;

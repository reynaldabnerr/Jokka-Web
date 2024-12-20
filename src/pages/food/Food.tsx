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
import { fetchFood } from "../../api/dataService";
import "./Food.css";
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
  const history = useHistory(); // Tambahkan useHistory untuk navigasi

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
    id: food.foodid,
  }));

  return (
    <IonPage>
      <NavBar />

      <IonContent>
        <div className="food-container">
          {/* food Trending Section */}
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
              {categoryImages.map((category) => (
                <SwiperSlide
                  key={category.id}
                  className="category-slide"
                  onClick={() => history.push(`/food/${category.id}`)} // Navigasi ke detail page
                >
                  <img
                    src={category.image}
                    alt={`food ${category.title}`}
                    className="category-image"
                  />
                  <div className="category-title">{category.title}</div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Special foods Section */}
          <div className="special-food-background">
            <h2 className="section-title">Jelajahi food Luar Biasa</h2>
            <p className="section-title-special">
              Nikmati aneka kuliner khas yang menggugah selera di destinasi
              Anda.
            </p>
            <IonGrid>
              <IonRow>
                {trendingfoods.slice(0, 8).map((food) => (
                  <IonCol size="12" sizeMd="6" sizeLg="3" key={food.foodid}>
                    <IonCard
                      className="special-food-card"
                      onClick={() => history.push(`/food/${food.foodid}`)} // Navigasi ke detail page
                    >
                      <IonImg src={food.foodimage} alt={food.foodname} />
                      <IonCardContent>
                        <h3>{food.foodname}</h3>
                        <p>
                            <strong>Harga:</strong> {`RP ${food.foodprice.toLocaleString('id-ID')}`}
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
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default food;

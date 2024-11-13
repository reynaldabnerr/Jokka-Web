import React, { useState, useEffect } from "react";
import { IonContent, IonPage } from "@ionic/react";
import NavBar from "../../components/NavBar";
import Carousel from "../../components/Carousel";
import { fetchEvents, fetchPlaces, fetchFood } from "../../api/dataService";
import "./Home.css";
import DownloadCard from "../../components/DownloadCard";
import PopularCard from "../../components/PopularCard";
import { useHistory, useLocation } from "react-router-dom";

const Home: React.FC = () => {
  const [carouselImages, setCarouselImages] = useState<string[]>([
    "https://awsimages.detik.net.id/community/media/visual/2021/06/18/rammang-rammang_169.jpeg?w=650",
    "https://awsimages.detik.net.id/community/media/visual/2021/06/18/rammang-rammang_169.jpeg?w=650",
    "https://awsimages.detik.net.id/community/media/visual/2021/06/18/rammang-rammang_169.jpeg?w=650",
  ]);

  const [popularEvent, setPopularEvent] = useState<any[]>([]);
  const [popularPlaces, setPopularPlaces] = useState<any[]>([]);
  const [popularFood, setPopularFood] = useState<any[]>([]);
  const history = useHistory();
  const location = useLocation();

  const fetchData = async () => {
    try {
      setPopularEvent(await fetchEvents());
      setPopularPlaces(await fetchPlaces());
      setPopularFood(await fetchFood());
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
        <Carousel images={carouselImages} />
        <div className="decorative-text">
          <h2>Discover Amazing Events Near You</h2>
          <p>Stay updated with the latest events happening around you.</p>
        </div>

        <PopularCard
          title="Event Terkini"
          description="Ikuti beragam acara terkini di sekitar Anda untuk pengalaman tak terlupakan."
          targetUrl="/event"
        >
          <div className="event-grid">
            {popularEvent.map((event, index) => (
              <div className="event-card" key={index}>
                <img
                  src={event.eventimage}
                  className="event-image"
                  alt="Event"
                />
                <p className="event-name">{event.eventname}</p>
              </div>
            ))}
          </div>
        </PopularCard>

        <div className="decorative-text">
          <h2>Discover Amazing Places Near You</h2>
          <p>Stay updated with the latest events happening around you.</p>
        </div>

        <PopularCard
          title="Tempat Populer"
          description="Temukan destinasi wisata favorit untuk kunjungan yang mengesankan dan penuh inspirasi."
          targetUrl="/destination"
        >
          <div className="place-grid">
            {popularPlaces.map((place, index) => (
              <div className="place-card" key={index}>
                <img
                  src={place.destinationimage}
                  className="place-image"
                  alt="Place"
                />
                <p className="place-name">{place.destinationname}</p>
              </div>
            ))}
          </div>
        </PopularCard>

        <div className="decorative-text">
          <h2>Discover Delicious Food Near You</h2>
          <p>Stay updated with the latest events happening around you.</p>
        </div>

        <PopularCard
          title="Kuliner Populer"
          description="Nikmati aneka kuliner khas yang menggugah selera di destinasi Anda."
          targetUrl="/food"
        >
          <div className="food-grid">
            {popularFood.map((food, index) => (
              <div className="food-card" key={index}>
                <img src={food.foodimage} className="food-image" alt="Food" />
                <p className="food-name">{food.foodname}</p>
              </div>
            ))}
          </div>
        </PopularCard>
        <DownloadCard />
      </IonContent>
    </IonPage>
  );
};

export default Home;

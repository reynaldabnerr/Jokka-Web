import React, { useState, useEffect } from "react";
import { IonContent, IonPage } from "@ionic/react";
import NavBar from "../../components/NavBar";
import Carousel from "../../components/Carousel";
import { fetchEvents, fetchPlaces, fetchFood } from "../../api/dataService";
import "./Home.css";
import DownloadCard from "../../components/DownloadCard";
import PopularDestinationCard from "../../components/PopularCard/PopularDestinationCard";
import PopularEventCard from "../../components/PopularCard/PopularEventCard";
import PopularFoodCard from "../../components/PopularCard/PopularFoodCard";

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

        <div className="event-section">
          <h3>Event Terkini</h3>
          <p>
            Ikuti beragam acara terkini di sekitar Anda untuk pengalaman tak
            terlupakan.
          </p>
          <div className="event-grid">
            {popularEvent.map((event, index) => (
              <PopularEventCard
                key={index}
                imageUrl={event.eventimage}
                title={event.eventname}
                date={event.eventdate}
                location={event.eventlocation}
              />
            ))}
          </div>
        </div>

        <div className="place-section">
          <h3>Tempat Populer</h3>
          <p>
            Temukan destinasi wisata favorit untuk kunjungan yang mengesankan
            dan penuh inspirasi.
          </p>
          <div className="place-grid">
            {popularPlaces.map((place, index) => (
              <PopularDestinationCard
                key={index}
                imageUrl={place.destinationimage}
                title={place.destinationname}
                rating={place.destinationrating}
                category={place.destinationcategory}
              />
            ))}
          </div>
        </div>

        <div className="food-section">
          <h3>Kuliner Populer</h3>
          <p>
            Nikmati aneka kuliner khas yang menggugah selera di destinasi Anda.
          </p>
          <div className="food-grid">
            {popularFood.map((food, index) => (
              <PopularFoodCard
                key={index}
                imageUrl={food.foodimage}
                title={food.foodname}
                price={food.foodprice}
                rating={food.foodrating}
              />
            ))}
          </div>
        </div>

        <DownloadCard />
      </IonContent>
    </IonPage>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { IonContent, IonPage, IonButton, IonIcon } from "@ionic/react";
import { chevronForwardOutline } from "ionicons/icons";
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
          <h2>Discover Amazing Journey Near You</h2>
          <p>Stay updated with the latest events happening around you.</p>
        </div>

        {/* Event Section */}
        <div className="event-section">
          <div className="section-header">
            <h3>Event Terkini</h3>
            <IonButton
              fill="clear"
              className="see-all-button"
              routerLink="/event" // Tambahkan rute yang sesuai untuk navigasi
            >
              See All <IonIcon icon={chevronForwardOutline} />
            </IonButton>
          </div>
          <p>
            Ikuti beragam acara terkini di sekitar Anda untuk pengalaman tak
            terlupakan.
          </p>
          <div className="event-grid">
            {popularEvent.slice(0, 8).map((event) => (
              <PopularEventCard
                key={event.eventid} // Gunakan id unik jika tersedia
                imageUrl={event.eventimage}
                title={event.eventname}
                date={event.eventdate}
                location={event.eventlocation}
              />
            ))}
          </div>
        </div>

        {/* Place Section */}
        <div className="place-section">
          <div className="section-header">
            <h3>Tempat Populer</h3>
            <IonButton
              fill="clear"
              className="see-all-button"
              routerLink="/destination" // Tambahkan rute yang sesuai untuk navigasi
            >
              See All <IonIcon icon={chevronForwardOutline} />
            </IonButton>
          </div>
          <p>
            Temukan destinasi wisata favorit untuk kunjungan yang mengesankan
            dan penuh inspirasi.
          </p>
          <div className="place-grid">
            {popularPlaces.slice(0, 8).map((place) => (
              <PopularDestinationCard
                key={place.destinationid} // Gunakan id unik jika tersedia
                imageUrl={place.destinationimage}
                title={place.destinationname}
                rating={place.destinationrating}
                category={place.destinationcategory}
              />
            ))}
          </div>
        </div>

        {/* Food Section */}
        <div className="food-section">
          <div className="section-header">
            <h3>Kuliner Populer</h3>
            <IonButton
              fill="clear"
              className="see-all-button"
              routerLink="/food" // Tambahkan rute yang sesuai untuk navigasi
            >
              See All <IonIcon icon={chevronForwardOutline} />
            </IonButton>
          </div>
          <p>
            Nikmati aneka kuliner khas yang menggugah selera di destinasi Anda.
          </p>
          <div className="food-grid">
            {popularFood.slice(0, 8).map((food) => (
              <PopularFoodCard
                key={food.foodid} // Gunakan id unik jika tersedia
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

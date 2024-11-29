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
import SdgInfo from "../../components/SdgInfo";

const Home: React.FC = () => {
  const [carouselImages, setCarouselImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1667664885297-8e180a9bc667?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://events.rumah123.com/wp-content/uploads/sites/38/2021/05/08163245/Pusat-Pertumbuhan-Indonesia.jpg",
    "https://plus.unsplash.com/premium_photo-1663133752932-3757e32a644b?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
          <h2>Explore Unforgettable Experiences in Kota Daeng</h2>
          <p>
            Stay updated with the latest activities and experiences in Makassar
          </p>
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
                eventId={event.eventid} // Pastikan eventId diisi dengan nilai yang benar
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
                destinationId={place.destinationid} // Tambahkan destinationId untuk navigasi
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
          <p>Nikmati aneka kuliner khas yang menggugah selera di Kota Daeng.</p>
          <div className="food-grid">
            {popularFood.slice(0, 8).map((food) => (
              <PopularFoodCard
                key={food.foodid} // Gunakan id unik jika tersedia
                foodId={food.foodid} // Tambahkan foodId untuk navigasi
                imageUrl={food.foodimage}
                title={food.foodname}
                price={food.foodprice}
                rating={food.foodrating}
              />
            ))}
          </div>
        </div>
        <SdgInfo />
        <DownloadCard />
      </IonContent>
    </IonPage>
  );
};

export default Home;

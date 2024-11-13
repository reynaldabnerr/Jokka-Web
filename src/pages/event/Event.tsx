import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonImg,
} from '@ionic/react';
import { qrCode, logoGoogle, logoApple } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './Event.css';
import NavBar from '../../components/NavBar';
import DownloadCard from '../../components/DownloadCard';
import Carousel2 from '../../components/Carousel2';

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
import { useHistory } from "react-router-dom";

const Event: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Event Trending');
  
  const categories = [
    'Event Trending',
    'Event Sosial',
    'Event Hiburan',
    'Event Religius'
  ];

  const [trendingEvents] = useState([
    {
      title: 'Festival F8 Makassar',
      image: 'https://img.antaranews.com/cache/1200x800/2023/09/06/ImgResizer_20230906_2007_11366.jpg',
    },
    {
      title: 'Toraja International Festival',
      image: 'https://eventdaerah.kemenparekraf.go.id/storage/app/uploads/public/666/138/6fe/6661386fec2ee809666341.jpg',
    },
    {
      title: 'Makassar Jazz Festival',
      image: 'https://jadwalevent.web.id/wp-content/uploads/2022/10/Job-Fair-Makassar-720x405.jpg',
    },
    {
      title: 'Lovely December',
      image: 'https://eventdaerah.kemenparekraf.go.id/storage/app/uploads/public/666/138/6a5/6661386a5f9dc074116045.jpeg',
    },
    {
      title: 'Gandrang Bulo Festival',
      image: 'https://eventdaerah.kemenparekraf.go.id/storage/app/uploads/public/666/138/6a5/6661386a5f9dc074116045.jpeg',
    },
    {
      title: 'Toraja International Festival',
      image: 'https://eventdaerah.kemenparekraf.go.id/storage/app/uploads/public/666/138/6fe/6661386fec2ee809666341.jpg',
    },
    {
      title: 'Makassar Jazz Festival',
      image: 'https://jadwalevent.web.id/wp-content/uploads/2022/10/Job-Fair-Makassar-720x405.jpg',
    },
    {
      title: 'Lovely December',
      image: 'https://eventdaerah.kemenparekraf.go.id/storage/app/uploads/public/666/138/6a5/6661386a5f9dc074116045.jpeg',
    },
  ]);

  const carouselImages = trendingEvents.map((event) => ({
    url: event.image,
  }));

  const [categoriesImages] = useState([
    {
      title: 'Tempat Bersejarah',
      image: 'https://eventdaerah.kemenparekraf.go.id/storage/app/uploads/public/666/138/6a5/6661386a5f9dc074116045.jpeg',
    },
    {
      title: 'Wisata Alam',
      image: 'https://eventdaerah.kemenparekraf.go.id/storage/app/uploads/public/664/c4b/3b1/664c4b3b10ec9627803525.png',
    },
    {
      title: 'Pantai',
      image: 'https://i0.wp.com/smartcitymakassar.com/wp-content/uploads/2023/12/IMG-20231206-WA0023.jpg',
    },
  ]);

  return (
    <IonPage>
      <NavBar />

      <IonContent>
        <div className="event-container">
          {/* Event Trending Section */}
          <h2 className="section-title">Event Trending</h2>
          <div className="carousel-container">
            <div className="carousel-arrow left-arrow" onClick={() => (document.querySelector('.swiper-button-prev') as HTMLElement)?.click()}>
              &#10094;
            </div>
            <Carousel2 images={carouselImages} />
            <div className="carousel-arrow right-arrow" onClick={() => (document.querySelector('.swiper-button-next') as HTMLElement)?.click()}>
              &#10095;
            </div>
          </div>

          {/* Categories Section */}
          <h2 className="section-title section-title-categories">Categories</h2>
          <div className="categories-buttons">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Category Images */}
          <div className="category-images">
            <Swiper {...slideOpts}>
              {categoriesImages.map((category, index) => (
                <SwiperSlide key={index} className="category-slide">
                  <img src={category.image} alt={`Category ${index + 1}`} className="category-image" />
                  <div className="category-title">{category.title}</div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Special Events Section */}
          <div className='special-event-background'>
          <h2 className="section-title">Jelajahi Event Luar Biasa</h2>
          <p section-title-special>
            Maksimalkan pengorganisasian berbagai festival yang menarik bagi wisatawan lokal dan internasional.
          </p>
          <IonGrid>
            <IonRow>
              {trendingEvents.map((event, index) => (
                <IonCol size="12" sizeMd="6" sizeLg="3" key={index}>
                  <IonCard className="special-event-card">
                    <IonImg src={event.image} alt={event.title} />
                    <IonCardContent>
                      <h3>{event.title}</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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

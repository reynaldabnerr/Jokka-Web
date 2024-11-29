import React from "react";
import { IonCard, IonCardContent, IonImg, IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./PopularEventCard.css";

interface PopularEventCardProps {
  eventId: string; // ID event untuk navigasi
  imageUrl: string; // URL gambar event
  title: string; // Judul event
  date: string; // Tanggal event
  location: string; // Lokasi event
}

const PopularEventCard: React.FC<PopularEventCardProps> = ({
  eventId,
  imageUrl,
  title,
  date,
  location,
}) => {
  const history = useHistory(); // Hook untuk navigasi

  // Fungsi untuk menangani klik pada card
  const handleCardClick = () => {
    if (!eventId) {
      console.error("Event ID is missing!");
      return;
    }
    history.push(`/event/${eventId}`); // Navigasi ke halaman detail
  };

  return (
    <IonCard
      className="popular-event-card"
      onClick={handleCardClick}
      button // Tambahkan atribut button untuk menjadikannya interaktif
    >
      {/* Gambar Event */}
      <IonImg src={imageUrl} alt={title} className="event-image" />
      <IonCardContent>
        <div className="event-info">
          {/* Informasi Event */}
          <IonText className="event-title">{title}</IonText>
          <IonText className="event-date">{date}</IonText>
          <IonText className="event-location">{location}</IonText>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default PopularEventCard;

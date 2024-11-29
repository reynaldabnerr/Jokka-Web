import React from "react";
import { IonCard, IonCardContent, IonImg, IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./PopularDestinationCard.css";

interface PopularDestinationCardProps {
  destinationId: string; // Tambahkan ID destinasi untuk navigasi
  imageUrl: string;
  title: string;
  rating: number;
  category: string;
}

const PopularDestinationCard: React.FC<PopularDestinationCardProps> = ({
  destinationId,
  imageUrl,
  title,
  rating,
  category,
}) => {
  const history = useHistory();

  const handleCardClick = () => {
    history.push(`/destination/${destinationId}`); // Navigasi ke halaman detail destinasi
  };

  return (
    <IonCard
      className="popular-destination-card"
      onClick={handleCardClick}
      button // Tambahkan atribut button untuk menjadikannya interaktif
    >
      <IonImg src={imageUrl} alt={title} className="destination-image" />
      <IonCardContent>
        <div className="destination-info">
          {/* Nama destinasi */}
          <IonText className="destination-title">{title}</IonText>
          {/* Rating dan Kategori */}
          <div className="destination-rating-category">
            <IonText className="destination-rating">⭐ {rating}</IonText>
            <IonText className="destination-category">{category}</IonText>
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default PopularDestinationCard;

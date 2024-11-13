import React from "react";
import { IonCard, IonCardContent, IonImg, IonText } from "@ionic/react";
import "./PopularDestinationCard.css";

interface PopularDestinationCardProps {
  imageUrl: string;
  title: string;
  rating: number;
  category: string;
}

const PopularDestinationCard: React.FC<PopularDestinationCardProps> = ({
  imageUrl,
  title,
  rating,
  category,
}) => (
  <IonCard className="popular-destination-card">
    <IonImg src={imageUrl} alt={title} className="destination-image" />
    <IonCardContent>
      <div className="destination-info">
        {/* Title di bagian atas */}
        <IonText className="destination-title">{title}</IonText>
        {/* Container untuk Rating dan Category di satu baris */}
        <div className="destination-rating-category">
          <IonText className="destination-rating"> {rating}</IonText>
          <IonText className="destination-category">{category}</IonText>
        </div>
      </div>
    </IonCardContent>
  </IonCard>
);

export default PopularDestinationCard;

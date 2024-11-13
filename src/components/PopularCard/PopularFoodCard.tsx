import React from "react";
import { IonCard, IonCardContent, IonImg, IonText } from "@ionic/react";
import "./PopularFoodCard.css";

interface PopularFoodCardProps {
  imageUrl: string;
  title: string;
  price: string;
  rating: number;
}

const PopularFoodCard: React.FC<PopularFoodCardProps> = ({
  imageUrl,
  title,
  price,
  rating,
}) => (
  <IonCard className="popular-food-card">
    <IonImg src={imageUrl} alt={title} className="food-image" />
    <IonCardContent>
      <div className="food-info">
        {/* Title di bagian atas */}
        <IonText className="food-title">{title}</IonText>
        {/* Container untuk Rating di kiri dan Price di kanan */}
        <div className="food-price-rating">
          <IonText className="food-rating">{rating}</IonText>
          <IonText className="food-price">{price}</IonText>
        </div>
      </div>
    </IonCardContent>
  </IonCard>
);

export default PopularFoodCard;

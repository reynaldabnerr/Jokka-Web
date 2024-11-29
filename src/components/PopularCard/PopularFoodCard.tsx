import React from "react";
import { IonCard, IonCardContent, IonImg, IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./PopularFoodCard.css";

interface PopularFoodCardProps {
  foodId: string; // ID makanan untuk navigasi
  imageUrl: string; // URL gambar makanan
  title: string; // Nama makanan
  price: string; // Harga makanan
  rating: number; // Rating makanan
}

const PopularFoodCard: React.FC<PopularFoodCardProps> = ({
  foodId,
  imageUrl,
  title,
  price,
  rating,
}) => {
  const history = useHistory();

  const handleCardClick = () => {
    if (!foodId) {
      console.error("Food ID is missing!");
      return;
    }
    history.push(`/food/${foodId}`); // Navigasi ke halaman detail makanan
  };

  return (
    <IonCard className="popular-food-card" onClick={handleCardClick} button>
      <IonImg src={imageUrl} alt={title} className="food-image" />
      <IonCardContent>
        <div className="food-info">
          {/* Nama makanan */}
          <IonText className="food-title">{title}</IonText>
          {/* Rating di kiri dan Harga di kanan */}
          <div className="food-price-rating">
            <IonText className="food-rating">⭐ {rating}</IonText>
            <IonText className="food-price">{price}</IonText>
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default PopularFoodCard;

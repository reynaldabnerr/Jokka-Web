import React from "react";
import { IonCard, IonCardContent, IonImg, IonText } from "@ionic/react";
import "./PopularEventCard.css";

interface PopularEventCardProps {
  imageUrl: string;
  title: string;
  date: string;
  location: string;
}

const PopularEventCard: React.FC<PopularEventCardProps> = ({
  imageUrl,
  title,
  date,
  location,
}) => (
  <IonCard className="popular-event-card">
    <IonImg src={imageUrl} alt={title} className="event-image" />
    <IonCardContent>
      <div className="event-info">
        <IonText className="event-title">{title}</IonText>
        <IonText className="event-date">{date}</IonText>
        <IonText className="event-location">{location}</IonText>
      </div>
    </IonCardContent>
  </IonCard>
);

export default PopularEventCard;

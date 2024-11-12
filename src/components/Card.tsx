import React, { ReactNode } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { arrowForward } from "ionicons/icons"; // Import icon

interface CardProps {
  title: string;
  description: string;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, children }) => (
  <IonCard className="popular-card">
    <IonCardHeader className="card-header">
      <div className="header-content">
        <IonCardTitle className="card-title">{title}</IonCardTitle>
        <IonButton fill="clear" className="see-all-button" routerLink="/all">
          <IonIcon icon={arrowForward} slot="icon-only" />
        </IonButton>
      </div>
      <p className="section-description">{description}</p>
    </IonCardHeader>
    <IonCardContent>{children}</IonCardContent>
  </IonCard>
);

export default Card;

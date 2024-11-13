import React, { ReactNode } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { arrowForward } from "ionicons/icons";

interface PopularCardProps {
  title: string;
  description: string;
  targetUrl: string; // URL tujuan navigasi
  children?: ReactNode;
}

const PopularCard: React.FC<PopularCardProps> = ({
  title,
  description,
  targetUrl,
  children,
}) => (
  <IonCard className="popular-card">
    <IonCardHeader className="card-header">
      <div className="header-content">
        <IonCardTitle className="card-title">{title}</IonCardTitle>
        <IonButton
          fill="clear"
          className="see-all-button"
          routerLink={targetUrl}
        >
          <IonIcon icon={arrowForward} slot="icon-only" />
        </IonButton>
      </div>
      <p className="section-description">{description}</p>
    </IonCardHeader>
    <IonCardContent>{children}</IonCardContent>
  </IonCard>
);

export default PopularCard;

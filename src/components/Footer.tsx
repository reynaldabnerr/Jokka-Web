import React from "react";
import { IonFooter, IonGrid, IonRow, IonCol, IonText } from "@ionic/react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <IonFooter className="footer-container">
      <IonGrid className="footer-content">
        <IonRow>
          <IonCol size="12" sizeMd="4" className="footer-column">
            <h3>Hubungi Kami</h3>
            <ul>
              <li>Layanan Pelanggan</li>
              <li>Jaminan Layanan</li>
              <li>Info Layanan lainnya</li>
            </ul>
          </IonCol>
          <IonCol size="12" sizeMd="4" className="footer-column">
            <h3>Tentang Kami</h3>
            <ul>
              <li>Tentang Jokka App</li>
              <li>Berita</li>
              <li>Karier</li>
              <li>Syarat dan Ketentuan</li>
              <li>Pernyataan Privasi</li>
              <li>Informasi Lanjutan</li>
              <li>Tentang Developer</li>
            </ul>
          </IonCol>
          <IonCol size="12" sizeMd="4" className="footer-column">
            <h3>Layanan Lain</h3>
            <ul>
              <li>Hubungan Investor</li>
              <li>Reward Jokka-web</li>
              <li>Program lainnya</li>
              <li>Keamanan</li>
            </ul>
          </IonCol>
        </IonRow>
      </IonGrid>
      <div className="footer-bottom">
        <IonText>
          Hak Cipta ©2024 Jokka-Web Tugas Pemrograman Web Kelas C
        </IonText>
      </div>
    </IonFooter>
  );
};

export default Footer;

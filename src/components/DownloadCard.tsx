import React from "react";
import { IonCard, IonCardContent, IonImg } from "@ionic/react";
import "./DownloadCard.css";

const DownloadCard: React.FC = () => {
  return (
    <IonCard className="download-card">
      <IonCardContent>
        <div className="download-container">
          {/* Bagian Gambar */}
          <div className="image-section">
            <IonImg
              src="https://uim-makassar.ac.id/wp-content/uploads/2022/07/1_jD-8s4iAF5IBBUi3LlMQog.png"
              className="main-image"
            />
          </div>

          {/* Bagian Konten Teks dan QR */}
          <div className="content-section">
            <div className="content-text">
              <h2>Dapatkan Aplikasi Jokka App</h2>
              <div className="features">
                <span>✓ Mudah Merencanakan Perjalanan</span>
                <span>✓ Akses Dimanapun</span>
              </div>
              <div className="goals">
                <div className="goal-item">Mencapai Indonesia Emas 2045</div>
                <div className="goal-item">Memenuhi Poin-Poin SDG</div>
              </div>
              <p className="qr-instruction">
                Scan QR Code untuk mengunduh aplikasi!
              </p>
            </div>
            <div className="content-section">
              <IonImg
                src="https://sennastudiodesign.com/wp-content/uploads/2023/03/Kegunaan-barcode-dan-QR-Code-dalam-desain-kemasan-produk-1.jpg "
                className="qr-code" />
            </div>
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default DownloadCard;

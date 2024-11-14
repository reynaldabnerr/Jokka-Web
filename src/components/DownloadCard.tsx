import React from "react";
import { IonCard, IonCardContent, IonImg } from "@ionic/react";
import "./DownloadCard.css";

const DownloadCard: React.FC = () => {
  return (
    <IonCard className="download-card">
      <IonCardContent>
        <div className="download-container">
          {/* Bagian Gambar */}
            <div
            className="image-section"
            style={{ borderRadius: "0 300px 300px 0", overflow: "hidden", marginLeft: "-16px" }}
            >
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
                <div className="goal-item">Lebih Mudah Lebih Cepat</div>
              </div>
              <p className="qr-instruction">
                Scan QR Code untuk mengunduh aplikasi!
              </p>
            </div>
            <div className="content-section">
              <IonImg
                src="https://sennastudiodesign.com/wp-content/uploads/2023/03/Kegunaan-barcode-dan-QR-Code-dalam-desain-kemasan-produk-1.jpg"
                className="qr-code"
                style={{ width: "280px", height: "280px" }}
              />
            </div>
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default DownloadCard;

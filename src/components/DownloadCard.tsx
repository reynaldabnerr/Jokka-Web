import React from "react";
import { IonCard, IonCardContent, IonImg } from "@ionic/react";
// Pastikan Anda memiliki CSS ini atau sesuaikan dengan gaya yang diinginkan

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

          {/* Bagian Konten Teks */}
          <div className="content-section">
            <h2>Dapatkan Aplikasi Jokka App</h2>
            <div className="features">
              <p>✓ Mudah Merencanakan Perjalanan</p>
              <p>✓ Akses Dimanapun</p>
            </div>
            <div className="goals">
              <span>Lebih Mudah</span>
              <span>Lebih Hemat</span>
            </div>
            <p className="qr-instruction">
              Scan QR Code untuk mengunduh aplikasi!
            </p>
            <IonImg
              src="https://sennastudiodesign.com/wp-content/uploads/2023/03/Kegunaan-barcode-dan-QR-Code-dalam-desain-kemasan-produk-1.jpg"
              className="qr-code"
            />
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default DownloadCard;

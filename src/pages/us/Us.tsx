// src/pages/us/AboutUs.tsx
import { 
  IonPage,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonText,
  IonToast,
  IonIcon,
  IonCard,
  IonCardContent,
} from "@ionic/react";

import NavBar from "../../components/NavBar";
import "./AboutUs.css";

import { callOutline, mailOutline, logoInstagram, locationOutline } from "ionicons/icons";
import DownloadCard from "../../components/DownloadCard";

const AboutUs: React.FC = () => {
  return (
    <IonPage>
      <NavBar />
      <IonContent fullscreen className="ion-padding">
        <div className="about-header">
          <div className="header-text">
            <h1 className="header-title">About Us</h1>
            <p className="sub-title">Jokka information and contact</p>
          </div>
        </div>

        {/* About content section */}
        <div className="about-content">
          {/* Gambar di sebelah kiri teks */}
          <div className="about-image-container">
            <img
              src="data:image/jpeg;base64,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"
              alt="About Jokka"
              className="about-image"
            />
            <div className="about-text">
              <h2>About Jokka</h2>
              <p>
                Jokka merupakan platform informasi terdepan untuk menjelajahi
                kekayaan kota Makassar. Sebagai aplikasi web yang berfokus pada
                destinasi wisata, acara, dan kuliner terbaik di Makassar, Jokka
                hadir untuk memberikan panduan menyeluruh, baik warga lokal
                maupun wisatawan, yang ingin menikmati dan mengeksplorasi setiap
                sudut kota dengan cara yang berbeda.
              </p>
              <p>
                Kami berkomitmen untuk terus memberikan informasi terkini,
                terpercaya, dan inspiratif agar Anda dapat merasakan pengalaman
                terbaik di kota Makassar. Jelajahi kota ini bersama Jokka dan
                temukan sisi terbaik dari Makassar yang belum Anda kenal.
              </p>
            </div>
          </div>
        </div>

        <div className="why-choose-us">
          <h2>Why Choose Us?</h2>
          <div className="reason-boxes">
            <div className="reason-box">
              <h3>Destinasi Terpilih</h3>
              <img
                src="https://i.pinimg.com/564x/a7/e4/ee/a7e4ee2fca989f18c24bb70ce2e9b2ca.jpg"
                alt="Destinasi"
                className="reason-image"
              />
              <p>
                Temukan rekomendasi destinasi wisata unggulan, mulai dari
                keindahan alam, situs bersejarah, hingga landmark ikonik yang
                mencerminkan keragaman budaya Makassar.
              </p>
            </div>
            <div className="reason-box">
              <h3>Informasi Acara Terkini</h3>
              <p>
                {" "}
                <img
                  src="https://i.pinimg.com/564x/db/8a/28/db8a28812d50d77a337f51028fa3eea5.jpg"
                  alt="Acara Terkini"
                  className="reason-image"
                />
                Dapatkan informasi terbaru mengenai acara-acara menarik di
                Makassar, seperti festival budaya, pameran seni, hingga konser
                yang menggugah antusiasme.
              </p>
            </div>
            <div className="reason-box">
              <h3>Pengalaman Kuliner Autentik</h3>
              <img
                src="https://i.pinimg.com/474x/cb/e1/5c/cbe15cacc2eb8a00250bf4a95bd1b491.jpg"
                alt="Kuliner"
                className="reason-image"
              />
              <p>
                Eksplorasi dunia kuliner Makassar dengan rekomendasi tempat
                makan yang menggugah selera, dari makanan khas hingga kuliner
                modern yang memanjakan lidah.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="contact-us">
          <h2>Contact Us</h2>
          <div className="contact-info">
            <div className="contact-box">
              <IonIcon icon={callOutline} className="contact-icon" />
              <h3>Phone</h3>
              <p>+62 123 4567 890</p>
            </div>
            <div className="contact-box">
              <IonIcon icon={mailOutline} className="contact-icon" />
              <h3>Email</h3>
              <p>contact@jokka.com</p>
            </div>
            <div className="contact-box">
              <IonIcon icon={logoInstagram} className="contact-icon" />
              <h3>Instagram</h3>
              <p>@jokka.id</p>
            </div>
            <div className="contact-box">
              <IonIcon icon={locationOutline} className="contact-icon" />
              <h3>Location</h3>
              <p>Makassar, Sulawesi Selatan</p>
            </div>
          </div>
        </div>
        <DownloadCard />
      </IonContent>
    </IonPage>
  );
};

export default AboutUs;
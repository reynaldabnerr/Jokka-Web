// src/pages/us/AboutUs.tsx
import {
  IonPage,
  IonContent,
  IonIcon,
} from "@ionic/react";

import NavBar from "../../components/common/NavBar";
import "./AboutUs.css";

import {
  callOutline,
  mailOutline,
  logoInstagram,
  locationOutline,
} from "ionicons/icons";
import DownloadCard from "../../components/DownloadCard";
import Footer from '../../components/Footer';

const AboutUs: React.FC = () => {
  return (
    <IonPage>
      <NavBar />
      <IonContent fullscreen className="ion-padding">
        <div className="about-header">
          <div className="header-text">
            <h1 className="header-title">Welcome to Jokka</h1>
            <p className="sub-title">Makassar bisa ton ji</p>
          </div>
        </div>

        {/* About content section */}
        <div className="about-content">
          {/* Gambar di sebelah kiri teks */}
          <div className="about-image-container">
            <img
              src="https://cdn1-production-images-kly.akamaized.net/92n8u027AIJFj-leo9dDKEH_sbU=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3564493/original/006532300_1631062991-floating-mosque-6278398_1920.jpg"
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
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default AboutUs;

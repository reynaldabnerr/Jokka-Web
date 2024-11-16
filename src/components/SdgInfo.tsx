import React from "react";
import "./SdgInfo.css";
import SdgAsset from "./Assets/SdgAsset.png"; // Mengimpor gambar asset

const SdgInfo: React.FC = () => {
  return (
    <div className="sdg-info-container">
      <div className="sdg-info-row">
        <div className="sdg-info-text">
          <h1>Jokka: Driving Innovation and Growth to Build a Sustainable Makassar</h1>
        </div>
        <div className="sdg-info-points">
          <p>✅ Jokka is for SDG 8: Decent Work and Economic Growth</p>
          <p>✅ Jokka is for SDG 11: Sustainable Cities and Communities</p>
        </div>
      </div>
      <div className="sdg-info-images">
        <img src={SdgAsset} alt="Sustainable Development Goals" className="sdg-info-image" />
      </div>
    </div>
  );
};

export default SdgInfo;

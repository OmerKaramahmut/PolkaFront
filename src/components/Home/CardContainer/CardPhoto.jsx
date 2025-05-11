import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const CardPhoto = () => {
  const [cardUrl, setCardUrl] = useState("");

  useEffect(() => {
    const fetchCardImage = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/container-imgs?populate=image`);
        console.log("API Response:", res.data);  // Konsolda veri yapısını görmek için
        const url = res.data?.data[0]?.image?.url;  // data[0] zorunlu
        if (url) {
          setCardUrl(`${BASE_URL}${url}`);
        }
      } catch (err) {
        console.error("Görsel alınamadı:", err);
      }
    };

    fetchCardImage();
  }, []);

  return (
    <div>
      {cardUrl && (
        <div
          style={{ width: "500px", height: "400px" }}
          className="card bg-black cardContainerResponsive"
        >
          <img
            src={cardUrl}
            alt="Container Image"
            style={{ width: "100%", overflow: "hidden" }}
          />
        </div>
      )}
    </div>
  );
};

export default CardPhoto;

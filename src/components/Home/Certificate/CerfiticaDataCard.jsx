import React, { useEffect, useState } from "react";
import axios from "axios";
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useLanguage } from "../../../context/LanguageContext";

// URL Tanımları
const API_BASE_URL = import.meta.env.VITE_API_URL;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const CertificateDataCard = () => {
  const [certificates, setCertificates] = useState([]);
  const { locale } = useLanguage();

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/certificates?populate=*&locale=${locale}`);
        const formattedCertificates = res.data.data.map(item => {
          const url = item.CertificateImg?.url;
          const imageUrl = url ? `${BASE_URL}${url}` : "";
          return {
            id: item.id,
            title: item.title,
            text: item.text,
            imageUrl,
          };
        });
        setCertificates(formattedCertificates);
      } catch (err) {
        console.error('Strapi veri çekme hatası:', err);
      }
    };

    fetchCertificates();
  }, [locale]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out',
      once: false,
    });
  }, []);

  if (!certificates || certificates.length === 0) {
    return <p>Veri yüklenemedi.</p>;
  }

  return (
    <div className="row">
      {certificates.map((card, index) => (
        <div
          className="d-flex justify-content-center col-12 col-md-6 col-lg-4 col-xl-3"
          key={card.id}
          data-aos="fade-up"
          data-aos-delay={index * 100}
          data-aos-offset="200"
        >
          <div className="cardBrand">
            <div className="contentBrand">
              <div className="imgBx">
                {card.imageUrl && (
                  <img className="img-fluid" src={card.imageUrl} alt={card.title} />
                )}
              </div>
              <div className="contentBx">
                <h3 className="fw-bold" style={{ color: "#7eb0da" }}>{card.title}</h3>
                <span>{card.text}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CertificateDataCard;

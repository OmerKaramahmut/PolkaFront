import React, { useEffect, useState } from "react";
import axios from "axios";
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useLanguage } from "../../../context/LanguageContext"; // Dil bağlamını içe aktar


const API_BASE_URL = import.meta.env.VITE_API_URL;
const CerfiticaDataCard = () => {
  const [certificates, setCertificates] = useState([]);
  const { locale } = useLanguage(); // Locale bilgisini alıyoruz (Türkçe veya İngilizce)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out',
      once: false,
    });

    const fetchCertificates = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/certificates?populate=*&locale=${locale}`);
        const data = res.data?.data || [];

        // attributes kullanmadan her şeyi direkt nesne içinde tut
        const formattedData = data.map((item2) => ({
          id: item2.id,
          image:
            typeof item2.CertificateImg === 'string'
              ? `${API_BASE_URL}${item2.CertificateImg}`
              : `${API_BASE_URL}${item2.CertificateImg?.url || ''}`,
          description: item2?.title || 'Başlık yok',
          span: item2?.text || '',
        }));

        setCertificates(formattedData);
      } catch (err) {
        console.error("Sertifika verileri alınamadı:", err);
      }
    };

    fetchCertificates();
  }, [locale]); // Locale değiştiğinde yeniden veri çek

  return (
    <div className="container py-5">
      <div className="row g-4">
        {certificates.map((item, index) => (
          <div key={item.id} className="col-xl-3 col-md-6 col-sm-12">
            <div
              data-aos="fade-up"
              data-aos-delay={index * 100}
              data-aos-offset="200"
              className="card h-100 border-0 shadow-sm card-hover position-relative overflow-hidden"
            >
              <img
                src={item.image}
                className="card-img"
                alt={item.description}
              />
              <div className="card-overlay">
                <h5 style={{ color: "#7eb0da" }} className="card-title fw-bold">{item.description}</h5>
                <p className="card-text">{item.span}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CerfiticaDataCard;

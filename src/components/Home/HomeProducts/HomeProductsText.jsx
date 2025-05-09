import React, { useEffect, useState } from 'react';
import 'aos/dist/aos.css'; // AOS CSS dosyasını dahil edin
import AOS from 'aos'; // AOS kütüphanesini içe aktarın
import axios from 'axios';
import { useLanguage } from '../../../context/LanguageContext'; // Dil bağlamını içe aktar

const API_BASE_URL = import.meta.env.VITE_API_URL;
const HomeProductsText = () => {
  const { locale } = useLanguage(); // Kullanıcının seçtiği dil
  const [homeproduct, setHomeproduct] = useState(null); // Varsayılan değer null
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animasyon süresi (ms)
      easing: 'ease-out', // Animasyonun akıcılığı
      once: false, // Her scroll down'da animasyonu tekrar oynat
    });
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`${API_BASE_URL}/home-products-texts?locale=${locale}`);
        console.log(result.data); // Gelen veriyi kontrol edin
        setHomeproduct(result.data.data[0]); // İlk veriyi al
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
  }, [locale]); // Dil değiştikçe veri çek

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (error) {
    return <p>Bir hata oluştu: {error.message}</p>;
  }

  if (!homeproduct) {
    return <p>Veri yüklenemedi.</p>;
  }

  return (
    <div
      className='d-flex justify-content-center align-items-center flex-column'
      data-aos="fade-up" // AOS animasyonu
      data-aos-delay={50} // Her kart için gecikme
      data-aos-offset="200" // Animasyonun tetiklenme mesafesi
    >
      <h1
        style={{ color: "#7eb0da", letterSpacing: "8px", fontSize: "50px" }}
        className="d-flex fw-bold text-center justify-content-center"
      >
        {homeproduct?.Title || 'Başlık Yükleniyor...'} &nbsp; <span className='productsTittleSpan'>{homeproduct?.Span || 'Başlık Yükleniyor...'}</span>
      </h1>
      <p>{homeproduct?.Text || 'Başlık Yükleniyor...'}</p>
    </div>
  );
};

export default HomeProductsText;

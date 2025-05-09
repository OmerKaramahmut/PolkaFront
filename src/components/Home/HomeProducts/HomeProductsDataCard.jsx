import React, { useEffect, useState } from 'react';
import 'aos/dist/aos.css'; // AOS CSS dosyasını dahil edin
import AOS from 'aos'; // AOS kütüphanesini içe aktarın
import axios from 'axios';
import { useLanguage } from '../../../context/LanguageContext'; // Dil bağlamını içe aktar

const API_BASE_URL = import.meta.env.VITE_API_URL;
const HomeProductsDataCard = () => {
  const [cards, setCards] = useState([]);
  const { locale } = useLanguage(); // Kullanıcının seçtiği dil

  useEffect(() => {
    axios.get(`${API_BASE_URL}/home-products-cards?populate=*&locale=${locale}`)
      .then(res => {
        const formattedCards = res.data.data.map(item => ({
          id: item.id,
          title: item.Title, // Başlık
          text: item.Text, // Açıklama
          image: `${API_BASE_URL}${item.Image?.url || ''}`, // Resim
        }));
        setCards(formattedCards);
      })
      .catch(err => console.error('Strapi veri çekme hatası:', err));
  }, [locale]); // Dil değiştikçe veri çek

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animasyon süresi (ms)
      easing: 'ease-out', // Animasyonun akıcılığı
      once: false, // Her scroll down'da animasyonu tekrar oynat
    });
  }, []);

  if (!cards || cards.length === 0) {
    return <p>Veri yüklenemedi.</p>;
  }

  return (
    <div className="row">
      {cards.map((card, index) => (
        <div
          className="d-flex justify-content-center col-12 col-md-6 col-lg-4 col-xl-3"
          key={card.id}
          data-aos="fade-up" // AOS animasyonu
          data-aos-delay={index * 100} // Her kart için gecikme
          data-aos-offset="200" // Animasyonun tetiklenme mesafesi
        >
          <div className="cardBrand">
            <div className="contentBrand">
              <div className="imgBx">
                <img className="img-fluid" src={card.image} alt={card.title} />
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

export default HomeProductsDataCard;

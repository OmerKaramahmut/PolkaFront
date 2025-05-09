import React, { useEffect } from 'react';
import CerfiticaDataCard from './CerfiticaDataCard';
import "./Certificate.css";
import 'aos/dist/aos.css'; // AOS CSS dosyasını dahil edin
import AOS from 'aos'; // AOS kütüphanesini içe aktarın
import CerfiticaText from './CerfiticaText';


const Certificate = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animasyon süresi (ms)
      easing: 'ease-out', // Animasyonun akıcılığı
      once: false, // Her scroll down'da animasyonu tekrar oynat
    });
  }, []);


  return (
    <div className='py-5 bg-light'>
      <div
        data-aos="fade-up" // AOS animasyonu
        data-aos-delay={50} // Her kart için gecikme
        data-aos-offset="200" // Animasyonun tetiklenme mesafesi

        className="container py-5">
        <h1

       
          className='d-flex fw-bold text-center justify-content-center'
        >
          <CerfiticaText />
        </h1>
        <CerfiticaDataCard />
      </div>
    </div>
  );
};

export default Certificate;
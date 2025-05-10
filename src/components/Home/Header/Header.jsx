import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../../Button/Button';
import { useLanguage } from '../../../context/LanguageContext';

// URL Tanımları
const API_BASE_URL = import.meta.env.VITE_API_URL;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Slider = () => {
  const { locale } = useLanguage();
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/sliders?populate=*&locale=${locale}`);
        const formattedSlides = res.data.data.map(item => {
          const url = item.Image?.url;
          const imageUrl = url ? `${BASE_URL}${url}` : "";

          return {
            title: item.Tittle,
            content: item.Content,
            imageUrl,
          };
        });

        setSlides(formattedSlides);
      } catch (err) {
        console.error('Strapi veri çekme hatası:', err);
      }
    };

    fetchSlides();
  }, [locale]);

  useEffect(() => {
    if (slides.length === 0) return;

    const timeout = setTimeout(() => {
      setCurrentIndex(1);
    }, 5000);

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [slides]);

  return (
    <div className="position-relative w-100" style={{ height: '500px', overflow: 'hidden' }}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`position-absolute top-0 start-0 w-100 h-100 transition-opacity ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `url(${slide.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'opacity 1s ease-in-out, transform 5s ease-in-out',
            transform: index === currentIndex ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          <div className="w-100 h-100 flex-column d-flex align-items-center justify-content-center bg-dark bg-opacity-50 text-center px-3">
            <h3 className="text-white fw-bold display-1">{slide.title}</h3>
            <p className="text-white fw-normal display-5">{slide.content}</p>
            <Button />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLanguage } from '../../../context/LanguageContext';


const API_BASE_URL = import.meta.env.VITE_API_URL;
const IndustriesTex = () => {
  const { locale } = useLanguage(); // Aktif dil bilgisi
  const [industriesText, setIndustriesText] = useState({ title: '', text: '' });

  useEffect(() => {
    const fetchIndustriesText = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/industries-texts?locale=${locale}`);
        const data = res.data?.data[0] || {};
        setIndustriesText({
          title: data.title || 'Başlık bulunamadı',
          text: data.text || 'Metin bulunamadı',
        });
      } catch (error) {
        console.error('Sektörler verisi alınamadı:', error);
      }
    };

    fetchIndustriesText();
  }, [locale]); // Dil değiştikçe veriyi güncelle

  return (
    <div>
      <div className='text-center py-2 gap-2'>
        <h1 style={{ color: "#7eb0da", fontSize: "50px", letterSpacing: "8px" }} className='fw-bold'>
          {industriesText.title}
        </h1>
        <p style={{ color: "#fff"}}>{industriesText.text}</p>
      </div>
    </div>
  );
};

export default IndustriesTex;

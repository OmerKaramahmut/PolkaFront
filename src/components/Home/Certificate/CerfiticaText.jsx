import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLanguage } from '../../../context/LanguageContext'; // Dil context'i



const API_BASE_URL = import.meta.env.VITE_API_URL;
const CertificateText = () => {
  const { locale } = useLanguage(); // Aktif dili al
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/certificate-title?locale=${locale}`);
        setTitle(res.data?.data?.title || 'Başlık bulunamadı');
      } catch (error) {
        console.error('Sertifika başlığı alınamadı:', error);
      }
    };

    fetchTitle();
  }, [locale]);

  return (
    <div    style={{ color: "#7eb0da", letterSpacing: "5px",  }} className='d-flex display-5 fw-bold text-center justify-content-center'>
      <h1>{title}</h1>
    </div>
  );
};

export default CertificateText;

import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_API_URL;
const HomeFormMap = () => {

  const [mapHtml, setMapHtml] = useState('');
  useEffect(() => {
    const fetchMap = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/google-map`);
        const data = res.data?.data;
        console.log(data);
        // attribute kullanmadan doğrudan al
        const embedCode = data?.Map || '';
        setMapHtml(embedCode);
      } catch (err) {
        console.error("Harita verisi alınamadı:", err);
      }
    };

    fetchMap();
  }, []);
  return (
    <div className='overflow-hidden' dangerouslySetInnerHTML={{ __html: mapHtml }} />
  )
}

export default HomeFormMap
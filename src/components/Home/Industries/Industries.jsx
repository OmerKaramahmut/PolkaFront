import React, { useEffect, useState } from 'react';
import * as MuiIcons from '@mui/icons-material';
import axios from 'axios';
import 'aos/dist/aos.css';
import { useLanguage } from '../../../context/LanguageContext';
import IndustriesTex from './IndustriesTex';
import './Industries.css';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const Industries = () => {
  const { locale } = useLanguage();
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/industriess?locale=${locale}`);
        const data = response.data?.data || [];
        setIndustries(data);
      } catch (error) {
        console.error("Veri alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  if (loading) return <div className="text-center mt-5">Yükleniyor...</div>;

  return (
    <div className='py-5 d-flex flex-column align-items-center justify-content-center bg-dark'>
      <IndustriesTex />
      <div className="row w-100 container">
        {industries.map((industry) => {
          const { id, title, text, icon } = industry;
          const IconComponent = MuiIcons[icon] || MuiIcons.HelpOutline;

          return (
            <div key={id} className="col-12 col-xl-3 d-flex">
              <div className="card bg-dark text-white border-0 mb-4 p-5 rounded-3 text-center d-flex flex-column align-items-center justify-content-center gap-3">
                <IconComponent style={{ fontSize: 80, color: "#7eb0da" }} />
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Industries;

import React, { useEffect, useState } from 'react';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import './ContactPage.css'; // CSS dosyasını içe aktar
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS CSS dosyasını içe aktar
import ContactHeader from './ContactHeader';
import HomeFormContact from "../Home/HomeForm/HomeFormContact"
import ContactConteiner from './ContactConteiner';
import ContactFormTitle from './ContactFormTitle';



const API_BASE_URL = import.meta.env.VITE_API_URL;
const ContactPage = () => {
  const [mapHtml, setMapHtml] = useState('');
  const [contactData, setContactData] = useState(null);

  // Bu locale değerini i18n veya route'dan da alabilirsin
  const locale = 'tr';

  useEffect(() => {
    const fetchMap = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/google-map`);
        const data = res.data?.data;
        const embedCode = data?.Map || '';
        setMapHtml(embedCode);
      } catch (err) {
        console.error("Harita verisi alınamadı:", err);
      }
    };

    const fetchContactTexts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/contact-texts?locale=${locale}`);
        const data = res.data?.data;
        setContactData(data);
      } catch (err) {
        console.error("İletişim verileri alınamadı:", err);
      }
    };

    fetchMap();
    fetchContactTexts();
  }, [locale]);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animasyon süresi (ms)
      easing: 'ease-in-out', // Animasyon eğrisi
      once: true, // Animasyon bir kez çalışsın
    });
  }, []);

  return (

    <div style={{ backgroundColor: "#061c1d" }} className="">
      <ContactHeader />

      {/* Alt Bölüm
      <ContactConteiner/>
      */}
      <div className="contactforms py-5">
        <ContactFormTitle />
        <div className="container">
          <div className="row d-flex justify-content-around align-items-center py-5">
            {/* Form Bölümü */}
            <div className="col-lg-6 col-md-6 col-sm-12 p-0">
              <HomeFormContact />
            </div>

            {/* Harita Bölümü */}
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="map-container" dangerouslySetInnerHTML={{ __html: mapHtml }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

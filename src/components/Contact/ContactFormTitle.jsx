import React, { useEffect, useState } from 'react'
import { useLanguage } from '../../context/LanguageContext';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const ContactFormTitle = () => {
     const { locale } = useLanguage();
     const [contactData, setContactData] = useState(null);

      useEffect(() => {
          const fetchContactPage = async () => {
              try {
                  const res = await fetch(`${API_BASE_URL}/contact-pages?locale=${locale}`);
                  const data = await res.json();
                  setContactData(data.data[0] || null);
              } catch (error) {
                  console.error("İletişim sayfası verileri alınamadı:", error);
              }
          };
  
          fetchContactPage();
      }, [locale]);
    return (
        <div>  <h1 className='text-center'>{contactData?.title}</h1></div>
    )
}

export default ContactFormTitle
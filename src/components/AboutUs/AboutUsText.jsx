import React, { useEffect, useState } from 'react'
import { useLanguage } from '../../context/LanguageContext';


const API_BASE_URL = import.meta.env.VITE_API_URL;
const AboutUsText = () => {
    const { locale } = useLanguage();
    const [contactData, setContactData] = useState(null);

    useEffect(() => {
        const fetchContactPage = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/about-uses?locale=${locale}`);
                const data = await res.json();
                setContactData(data.data[0] || null);
            } catch (error) {
                console.error("İletişim sayfası verileri alınamadı:", error);
            }
        };

        fetchContactPage();
    }, [locale]);
    return (
        <div>  <h5 style={{ color: "gray" }}>
            {contactData?.title}
        </h5>
            <p>
                {contactData?.text}
            </p></div>
    )
}

export default AboutUsText
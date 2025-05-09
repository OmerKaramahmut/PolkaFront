import React, { useEffect, useState } from 'react'
import contactBanner from '../../../public/images/contact.webp';
import { useLanguage } from '../../context/LanguageContext';


const API_BASE_URL = import.meta.env.VITE_API_URL;
const ContactHeader = () => {
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
        <section>
            <div className="container">
                <div style={{ height: "450px" }} className="row">
                    {/* Sol Bölüm */}
                    <div
                        className="col-xl-6 col-md-12 text-white pt-5 container"
                        data-aos="fade-up" // AOS animasyonu
                    >
                        <h1>
                            {contactData?.title}<span style={{ color: "red" }}>.</span>
                        </h1>
                        <p>
                            {contactData?.text}
                        </p>
                    </div>

                    {/* Sağ Bölüm */}
                    <div
                        className="rImg col-xl-6 div-md-12 ps-5"
                        data-aos="fade-up" // AOS animasyonu
                        data-aos-delay="200" // Gecikme (ms)
                    >
                        <img src={contactBanner} alt="" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactHeader
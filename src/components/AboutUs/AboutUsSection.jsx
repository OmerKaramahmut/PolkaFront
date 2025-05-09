import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS CSS dosyasını içe aktar
import AboutUsTitle from './AboutUsTitle';
import AboutUsText from './AboutUsText';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import './AboutUs.css';
import AboutUsImage from './AboutUsImage';
import { useLanguage } from '../../context/LanguageContext';


const API_BASE_URL = import.meta.env.VITE_API_URL;
const AboutUsSection = () => {
    const { locale } = useLanguage();
    const [aboutData, setAboutData] = useState(null);

    useEffect(() => {
        const fetchContactPage = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/about-title?locale=${locale}`);
                const data = await res.json();
                setAboutData(data.data || null);
            } catch (error) {
                console.error("Hakkımızda başlığı alınamadı:", error);
            }
        };

        fetchContactPage();
    }, [locale]);

    useEffect(() => {
        AOS.init({
            duration: 1000, // Animasyon süresi (ms)
            easing: 'ease-in-out', // Animasyon eğrisi
            once: true, // Animasyon bir kez çalışsın
        });
    }, []);

    return (
        <div>
            <div className="row py-5">
                <div
                    className="col-xl-6 col-12 text-white gap-3 d-flex flex-column justify-content-center align-items-start"
                    data-aos="fade-up" // AOS animasyonu
                >
                    <AboutUsTitle />
                    <AboutUsText />
                    <div className="social">
                        <h5 className="py-3" style={{ color: 'gray' }}>{aboutData?.title}</h5>
                        <div className="d-flex justify-content-center align-items-center gap-3">
                            <div
                                className="bg-black p-0 m-0 p-2 text-center rounded-3 d-flex justify-content-center align-items-center social-icon"
                                style={{ width: '40px', height: '40px' }}
                                data-aos="fade-up" // AOS animasyonu
                                data-aos-delay="200" // Gecikme (ms)
                            >
                                <XIcon className="text-dark social-icon" />
                            </div>
                            <div
                                className="bg-black p-0 m-0 p-2 text-center rounded-3 d-flex justify-content-center align-items-center social-icon"
                                style={{ width: '40px', height: '40px' }}
                                data-aos="fade-up" // AOS animasyonu
                                data-aos-delay="400" // Gecikme (ms)
                            >
                                <InstagramIcon className="text-dark social-icon" />
                            </div>
                            <div
                                className="bg-black p-0 m-0 p-2 text-center rounded-3 d-flex justify-content-center align-items-center social-icon"
                                style={{ width: '40px', height: '40px' }}
                                data-aos="fade-up" // AOS animasyonu
                                data-aos-delay="600" // Gecikme (ms)
                            >
                                <EmailIcon className="text-dark social-icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="col-xl-6 col-12 d-flex justify-content-center align-items-center"
                    data-aos="fade-up" // AOS animasyonu
                    data-aos-delay="800" // Gecikme (ms)
                >
                    <AboutUsImage />
                </div>
            </div>
        </div>
    );
};

export default AboutUsSection;
import React, { useEffect, useState } from 'react';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import FooterMenu from './FooterMenu';
import axios from 'axios';
import { useLanguage } from '../../../context/LanguageContext';
import './Footer.css'; // CSS dosyasını içe aktar

const API_BASE_URL = import.meta.env.VITE_API_URL;
const Footer = () => {
    const { locale } = useLanguage(); // Dil bağlamını al
    const [footerText, setFooterText] = useState('');

    useEffect(() => {
        const fetchFooterText = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/footer-copyright?locale=${locale}`);
                const data = res.data?.data || {};
                console.log(data);
                setFooterText(data.text || '© 2025 Polka Kimya İnovasyon Tüm haklarımız saklıdırr.');
            } catch (error) {
                console.error('Footer verisi alınamadı:', error);
            }
        };

        fetchFooterText();
    }, [locale]); // Dil değiştikçe veriyi tekrar çek

    return (
        <div className="bg-dark text-white py-3">
            <div>
                <hr style={{ width: "100%", color: "#fff" }} />
            </div>
            <div className="container footer-menu">
                <div className="row">
                    {/* Sol Bölüm */}
                    <div className="col-lg-4 col-md-12 d-flex justify-content-start align-items-center">
                        <div className="footer-text">
                            {footerText}
                        </div>
                    </div>

                    {/* Orta Bölüm */}
                    <div className="col-lg-4 col-md-12 d-flex justify-content-center align-items-center">
                        <div className="footer-menu">
                            <FooterMenu />
                        </div>
                    </div>

                    {/* Sağ Bölüm */}
                    <div className="col-lg-4 col-md-12 d-flex justify-content-end align-items-center">
                        <div className="footer-icons d-flex gap-3">
                            <XIcon className="text-white" />
                            <InstagramIcon className="text-white" />
                            <EmailIcon className="text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;

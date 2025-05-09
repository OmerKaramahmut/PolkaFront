import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-bootstrap';
import axios from 'axios';
import { useLanguage } from '../../../context/LanguageContext';


const API_BASE_URL = import.meta.env.VITE_API_URL;
const FooterMenu = () => {
    const { locale } = useLanguage(); // Aktif dili al
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/navbar-menus?locale=${locale}`);
                const data = res.data?.data || [];
                setMenuItems(data);
            } catch (error) {
                console.error('Menü verileri alınamadı:', error);
            }
        };

        fetchMenuItems();
    }, [locale]); // Dil değiştikçe veriyi tekrar çek

    return (
        <div className='d-flex justify-content-end align-items-center gap-3'>
            {menuItems.map((menuItem, index) => (
                <NavLink key={index} className="text-white text-decoration-none nav-link-hover" to={menuItem.url}>
                    {menuItem.navbarTitle} {/* Menü elemanının dinamik başlığı */}
                </NavLink>
            ))}
        </div>
    );
};

export default FooterMenu;

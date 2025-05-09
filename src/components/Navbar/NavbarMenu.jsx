import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../../context/LanguageContext';


const API_BASE_URL = import.meta.env.VITE_API_URL;
const NavbarMenu = () => {
  const { locale } = useLanguage();
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/navbar-menus?locale=${locale}`);
        const data = res.data?.data || [];
        setMenus(data);
      } catch (error) {
        console.error('Navbar menüleri alınamadı:', error);
      }
    };

    fetchMenus();
  }, [locale]);

  // Verileri tek tek kullanmak
  const menu1 = menus[0];
  const menu2 = menus[1];
  const menu3 = menus[2];
  const menu4 = menus[3];

  return (
    <div id="navMenu" className="navPage">
      <nav className="navbar navbar-expand-lg">
        <div className="collapse navbar-collapse">
          <ul className="d-flex align-items-center gap-3 text-light">
            {/* İlk Menü */}
            {menu1 && (
              <NavLink key={menu1.id} style={{ textDecoration: 'none' }} to={menu1.slug || '/'}>
                <li className="nav-item">
                  <a href="#">{menu1.navbarTitle}</a>
                </li>
              </NavLink>
            )}

            {/* İkinci Menü */}
            {menu2 && (
              <NavLink key={menu2.id} style={{ textDecoration: 'none' }} to={menu2.slug || '/products'}>
                <li className="nav-item">
                  <a href="#">{menu2.navbarTitle}</a>
                </li>
              </NavLink>
            )}

            {/* Üçüncü Menü */}
            {menu3 && (
              <NavLink key={menu3.id} style={{ textDecoration: 'none' }} to={menu3.slug || '/contact'}>
                <li className="nav-item">
                  <a href="#">{menu3.navbarTitle}</a>
                </li>
              </NavLink>
            )}

            {/* Dördüncü Menü */}
            {menu4 && (
              <NavLink key={menu4.id} style={{ textDecoration: 'none' }} to={menu4.slug || '/aboutus'}>
                <li className="nav-item">
                  <a href="#">{menu4.navbarTitle}</a>
                </li>
              </NavLink>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavbarMenu;

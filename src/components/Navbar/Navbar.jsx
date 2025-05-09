import React, { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Navbar.css";
import NavbarMenu from './NavbarMenu';
import NavbarTop from './NavbarTop';
import NavbarLogo from './NavbarLogo';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../../context/LanguageContext'; // Dil bağlamını içe aktar


const API_BASE_URL = import.meta.env.VITE_API_URL;
const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { locale } = useLanguage(); // Dil bağlamını kullanarak locale alın
    const [menus, setMenus] = useState([]);

    const handleClickNav = () => {
        setMenuOpen(!menuOpen);
    };

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
        <>
            <div>
                <NavbarTop />
                <nav className="navbar bg-body-tertiary">
                    <hr className="container-fluid" style={{ width: "100%" }} />
                    <div className="container">
                        <NavbarLogo />
                        <div>
                            <NavbarMenu />
                        </div>
                        <div id="mobileIcon" onClick={handleClickNav}>
                            {!menuOpen ? (
                                <GiHamburgerMenu size={30} />
                            ) : (
                                <IoMdClose size={30} />
                            )}
                        </div>
                    </div>
                    <div className={!menuOpen ? "mblMenuClose" : "mblMenu"}>
                        <ul className="navbar-nav align-items-center gap-2 text-light">
                            {menu1 && (
                                <NavLink
                                    key={menu1.id}
                                    style={{ textDecoration: 'none' }}
                                    to={menu1.slug || '/'}
                                    onClick={() => setMenuOpen(false)} // Menü kapansın
                                >
                                    <li className="nav-item">
                                        <a href="#">{menu1.navbarTitle}</a>
                                    </li>
                                </NavLink>
                            )}
                            {menu2 && (
                                <NavLink
                                    key={menu2.id}
                                    style={{ textDecoration: 'none' }}
                                    to={menu2.slug || '/products'}
                                    onClick={() => setMenuOpen(false)} // Menü kapansın
                                >
                                    <li className="nav-item">
                                        <a href="#">{menu2.navbarTitle}</a>
                                    </li>
                                </NavLink>
                            )}
                            {menu3 && (
                                <NavLink
                                    key={menu3.id}
                                    style={{ textDecoration: 'none' }}
                                    to={menu3.slug || '/contact'}
                                    onClick={() => setMenuOpen(false)} // Menü kapansın
                                >
                                    <li className="nav-item">
                                        <a href="#">{menu3.navbarTitle}</a>
                                    </li>
                                </NavLink>
                            )}
                            {menu4 && (
                                <NavLink
                                    key={menu4.id}
                                    style={{ textDecoration: 'none' }}
                                    to={menu4.slug || '/aboutus'}
                                    onClick={() => setMenuOpen(false)} // Menü kapansın
                                >
                                    <li className="nav-item">
                                        <a href="#">{menu4.navbarTitle}</a>
                                    </li>
                                </NavLink>
                            )}
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Navbar;

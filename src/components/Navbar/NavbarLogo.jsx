import React, { useEffect, useState } from 'react';
import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_API_URL;
const NavbarLogo = () => {
    const [logoUrl, setLogoUrl] = useState('');

    useEffect(() => {
        const fetchLogo = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/navbar-logo?populate=logo`);
                const url = res.data?.data?.logo?.url;
                if (url) {
                    setLogoUrl(`${API_BASE_URL}${url}`);
                }
            } catch (err) {
                console.error("Logo alınamadı:", err);
            }
        };

        fetchLogo();
    }, []);

    return (
        <div>
            <a className="navbar-brand" href="/">
                {logoUrl && <img src={logoUrl} alt="Logo" style={{ height: '100px', width: "300px" }} />}
            </a>
        </div>
    );
};

export default NavbarLogo;

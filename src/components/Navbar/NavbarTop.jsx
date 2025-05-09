import React, { useEffect, useState } from 'react';
import { GrLanguage } from "react-icons/gr";
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import LanguageSwitcher from '../../context/LanguageSwitcher';
import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_API_URL;

const NavbarTop = () => {
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/navbar-tops`);
        
        // Eğer "data" array ise:
        const info = Array.isArray(res.data.data) ? res.data.data[0] : res.data.data;
        setContactInfo(info);

      } catch (error) {
        console.error("Navbar verileri alınamadı:", error);
      }
    };

    fetchNavbarData();
  }, []);

  if (!contactInfo) return null;

  return (
    <div className='bg-body-tertiary pt-3'>
      <div className="container w-100 d-flex justify-content-between ">
        <div className="navbarTopText d-flex gap-3 text-center align-items-center m-0">
          <div>
            <p className='m-0 d-flex align-items-center gap-2'>
              <EmailIcon /> <strong>{contactInfo.mail}</strong>
            </p>
          </div>
          <div>
            <p className='m-0 d-flex align-items-center gap-2'>
              <CallIcon /> <strong>{contactInfo.tel}</strong>
            </p>
          </div>
        </div>
        <div>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
};

export default NavbarTop;

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Button from '../../Button/Button';
import axios from 'axios';
import { useLanguage } from '../../../context/LanguageContext'; // Dil bağlamını içe aktar


const API_BASE_URL = import.meta.env.VITE_API_URL;

const CardText = () => {
    const containerRef = useRef(null);
    const [blog, setBlog] = useState(null); // Varsayılan değer null
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { locale } = useLanguage(); // Kullanıcının seçtiği dil


    useEffect(() => {
        // GSAP animasyonu
        gsap.fromTo(
            containerRef.current?.children || [],
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                stagger: 0.2,
            }
        );
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(`${API_BASE_URL}/container-sections?locale=${locale}`);
                console.log(result.data); // Gelen veriyi kontrol edin
                setBlog(result.data.data[0]); // İlk veriyi al
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchData();
    }, [locale]); // Dil değiştikçe veri çek

    if (loading) {
        return <p>Yükleniyor...</p>;
    }

    if (error) {
        return <p>Bir hata oluştu: {error.message}</p>;
    }

    if (!blog) {
        return <p>Veri yüklenemedi.</p>;
    }

    return (
        <div className='card-textt h-100' ref={containerRef} style={{ position: 'relative' }}>
            <h1 style={{ color: "#7eb0da" }} className="display-3 fw-bold ">
                {blog?.ContainerBaslik || 'Başlık Yükleniyor...'}
            </h1>
            <h1 style={{ color: "black" }} className="display-3 fw-bold ">
                {blog?.ContainerAltBaslik || 'Alt Başlık Yükleniyor...'}
            </h1>
            <p className="opacity-50 w-75">
                {blog?.ContainerYazi || 'İçerik Yükleniyor...'}
            </p>
            <div
                className="btn"
                style={{
                    position: 'absolute', // Konumlandırmayı absolute yap
                    bottom: '0', // Alt tarafa yerleştir
                    left: '0', // Sol tarafa yerleştir

                }}
            >
                <Button />
            </div>
        </div>
    );
};

export default CardText;

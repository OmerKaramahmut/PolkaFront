import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const CardPhoto = () => {
    const cardRef = useRef(null);
    const [card, setCard] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // GSAP animasyonu
        gsap.fromTo(
            cardRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
            }
        );
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(`${API_BASE_URL}/container-imgs?populate=*`);
                console.log(result.data);
                setCard(result.data.data[0]);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <p>Yükleniyor...</p>;
    }

    if (error) {
        return <p>Bir hata oluştu: {error.message}</p>;
    }

    if (!card) {
        return <p>Veri yüklenemedi.</p>;
    }

    // Resim URL'sini oluştur
    const imageUrl = `${API_BASE_URL}${card?.Image || ''}`;


    return (
        <div>
            <div
                ref={cardRef}
                style={{ width: "500px", height: "400px" }}
                className="card bg-black cardContainerResponsive"
            >
                <img style={{ width: "100%", overflow: "hidden" }} src={imageUrl} alt="Container Image" />
            </div>
        </div>
    );
};

export default CardPhoto;

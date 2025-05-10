import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import axios from 'axios';

// URL Tanımları
const API_BASE_URL = import.meta.env.VITE_API_URL;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const CardPhoto = () => {
    const cardRef = useRef(null);
    const [card, setCard] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState("");

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
                const data = result.data.data[0];

                if (data?.attributes?.Image?.data?.attributes?.url) {
                    const url = data.attributes.Image.data.attributes.url;
                    setImageUrl(`${BASE_URL}${url}`);
                }

                setCard(data);
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

    return (
        <div>
            <div
                ref={cardRef}
                style={{ width: "500px", height: "400px" }}
                className="card bg-black cardContainerResponsive"
            >
                {imageUrl && (
                    <img
                        style={{ width: "100%", overflow: "hidden" }}
                        src={imageUrl}
                        alt="Container Image"
                    />
                )}
            </div>
        </div>
    );
};

export default CardPhoto;

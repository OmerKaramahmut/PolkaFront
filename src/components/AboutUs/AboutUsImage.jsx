import React, { useEffect, useState } from 'react';

// URL Tanımları
const API_BASE_URL = import.meta.env.VITE_API_URL;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const AboutUsImage = () => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/about-img?populate=*`);
                const data = await res.json();

                const url = data?.data?.attributes?.img?.data?.attributes?.url;

                if (url) {
                    setImageUrl(`${BASE_URL}${url}`);
                } else {
                    console.error("Resim yolu bulunamadı.");
                }

            } catch (error) {
                console.error("Görsel verisi alınamadı:", error);
            }
        };

        fetchImage();
    }, []);

    return (
        <div
            style={{
                backgroundColor: 'white',
                width: '80%',
                height: '400px',
                borderRadius: '10px',
                backgroundImage: imageUrl ? `url(${imageUrl})` : '',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        ></div>
    );
};

export default AboutUsImage;

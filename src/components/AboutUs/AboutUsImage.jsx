import React, { useEffect, useState } from 'react';



const API_BASE_URL = import.meta.env.VITE_API_URL;
const AboutUsImage = () => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                // Strapi'den görsel verisini almak için doğru API çağrısı
                const res = await fetch(`${API_BASE_URL}/about-img?populate=*`); // about-img API endpoint'i
                const data = await res.json();

                // Eğer API'den gelen veri doğruysa img.url'yi alıyoruz
                if (data.data) {
                    const imageUrl = data.data.img?.url;  // img.url doğrudan alınır
                    setImage(imageUrl ? `${API_BASE_URL}${imageUrl}` : null); // URL'yi doğru şekilde ekliyoruz
                    console.log(data.data.img?.url);

                }
                console.log(data);  // Veriyi kontrol etmek için
            } catch (error) {
                console.error("Görsel verisi alınamadı:", error);
            }
        };

        fetchImage();
    }, []); // Bağımlılıklar boş olduğu için sadece component mount olduğunda çalışır

    return (
        <div
            style={{
                backgroundColor: 'white',
                width: '80%',
                height: '400px',
                borderRadius: '10px',
                backgroundImage: image ? `url(${image})` : '', // image varsa URL'yi ekle
                backgroundSize: 'cover', // Resmi düzgün şekilde sığdır
                backgroundPosition: 'center', // Resmin ortalanmasını sağla
            }}
        ></div>
    );
};

export default AboutUsImage;

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

const API_BASE_URL = import.meta.env.VITE_API_URL;
const ParallaxSection = () => {
    const containerRef = useRef(null); 
    const imageRef = useRef(null); 

    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
              
                const res = await axios.get(`${API_BASE_URL}/parallax-img?populate=parallaxImage`);

              
                const imagePath = res.data.data.parallaxImage.url;
                setImageUrl(`${API_BASE_URL}${imagePath}`);
            } catch (error) {
                console.error("Resim alınamadı:", error);
            }
        };

        fetchImage();
    }, []); 

    // imageUrl yüklendiğinde, animasyonu başlatmak için yeni useEffect
    useEffect(() => {
        if (imageUrl) {
            // GSAP animasyonu
            gsap.fromTo(
                imageRef.current,
                { y: "-0%" },
                {
                    y: "50%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                }
            );
        }
    }, [imageUrl]); // imageUrl değiştiğinde çalışacak

    if (!imageUrl) return <div>Yükleniyor...</div>;

    return (
        <div
            ref={containerRef}
            style={{
                height: "350px", // Daha büyük yükseklik, scroll etkisi için
                position: "relative",
                overflow: "hidden",
            }}
        >
            <img
                ref={imageRef}
                src={imageUrl}
                alt="Parallax"
                style={{
                    width: "100%",
                    height: "auto",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                }}
            />
        </div>

    );
};

export default ParallaxSection;

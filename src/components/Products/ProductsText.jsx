import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLanguage } from '../../context/LanguageContext';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const ProductsText = () => {
    const { locale } = useLanguage();
    const [title, setTitle] = useState('');

    useEffect(() => {
        const fetchProductText = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/product-text?locale=${locale}`);
                const title = res.data?.data?.title; // Single Type için doğru yapı
                setTitle(title || 'Başlık bulunamadı');
                console.log(title); 
            } catch (error) {
                console.error('Başlık verisi alınamadı:', error);
            }
        };

        fetchProductText();
    }, [locale]);

    return (
        <div>
            <h2 className="text-center mb-4" style={{ color: '#7eb0da', letterSpacing: '2px' }}>
                {title || 'Yükleniyor...'}
            </h2>
        </div>
    );
};

export default ProductsText;

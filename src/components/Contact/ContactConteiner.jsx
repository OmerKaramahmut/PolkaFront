import React, { useEffect, useState } from "react";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import { useLanguage } from "../../context/LanguageContext";
import "./ContactPage.css"



const API_BASE_URL = import.meta.env.VITE_API_URL;
const ContactConteiner = () => {
    const { locale } = useLanguage();
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContactInfos = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/talk-to-uses?locale=${locale}`);
                const data = await res.json();

                // Burada attributes yok, direkt alıyoruz
                const flattened = data.data.map((item) => ({
                    id: item.id,
                    ...item,
                }));

                setContacts(flattened);
            } catch (error) {
                console.error("İletişim kutuları alınamadı:", error);
            }
        };

        fetchContactInfos();
    }, [locale]);

    return (
        <div className="bg-light">
            <div className="container">
                <div className="row d-flex justify-content-around align-items-center py-5">
                    {contacts.map((item, index) => (
                        <div
                            key={item.id}
                            style={{
                                width: "600px",
                                height: "350px",
                                backgroundColor: index % 2 === 0 ? "#f0f8ff" : "#ffe4e1", // Dinamik arka plan rengi
                                transform: `translateY(${index * -20}px)`, // Yukarıya doğru yönlendirme
                                transition: "transform 0.5s ease", // Geçiş animasyonu
                            }}
                            className="col-lg-6 col-md-6 col-sm-12 d-flex flex-column align-items-center justify-content-center gap-3"
                            data-aos="fade-up"
                            data-aos-delay={index * 200}
                        >
                            {index === 0 ? (
                                <CallIcon style={{ fontSize: "50px" }} />
                            ) : (
                                <EmailIcon style={{ fontSize: "50px" }} />
                            )}
                            <h2>{item.title}</h2>
                            <p>{item.text}</p>
                            {(item.number || item.mail) && (
                                <h5 className="fw-bold">{item.number || item.mail}</h5>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContactConteiner;

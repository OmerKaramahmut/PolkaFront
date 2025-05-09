import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from 'axios';
import { useLanguage } from "../../../context/LanguageContext"; // Dil bağlamını içe aktar



const API_BASE_URL = import.meta.env.VITE_API_URL;
const HomeFormContact = () => {
  const { locale } = useLanguage(); // Aktif dil bilgisi
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    message: false,
  });

  const [formLabels, setFormLabels] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    submitButton: ""
  });

  // Dil bazlı metinleri çekmek için useEffect kullanıyoruz
  useEffect(() => {
    const fetchFormLabels = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/form-texts?locale=${locale}`);
        const data = res.data?.data[0] || {};
        setFormLabels({
          title: data.title || 'Başlık bulunamadı',
          firstName: data.name || 'İsim',
          lastName: data.surname || 'Soyisim',
          email: data.email || 'Email',
          phone: data.telephone || 'Telefon',
          message: data.message || 'Mesaj',
          submitButton: data.buttonText || 'Gönder',
        });
      } catch (error) {
        console.error('Form etiketleri alınamadı:', error);
      }
    };

    fetchFormLabels();
  }, [locale]); // Dil değiştikçe veriyi güncelle

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstName" && /[^a-zA-Z\s]/.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });

    switch (name) {
      case "firstName":
        setErrors({ ...errors, firstName: value.trim() === "" });
        break;
      case "lastName":
        setErrors({ ...errors, lastName: value.trim() === "" });
        break;
      case "email":
        setErrors({
          ...errors,
          email: !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value),
        });
        break;
      case "phone":
        setErrors({
          ...errors,
          phone: !/^\d{10}$/.test(value),
        });
        break;
      case "message":
        setErrors({
          ...errors,
          message: value.trim().length < 10,
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid =
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email) &&
      /^\d{10}$/.test(formData.phone) &&
      formData.message.trim().length >= 10;

    if (isValid) {
      console.log("Form submitted:", formData);
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 5,
        marginLeft: 13,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        borderRadius: 2,
        backgroundColor: "#e0e0e0",
      }}
    >
      <Typography variant="h5" component="h1" textAlign="center" gutterBottom>
        {formLabels.title || 'İletişim Formu'}
      </Typography>
      <TextField
        label={formLabels.firstName || "İsim"}
        name="firstName"
        variant="outlined"
        fullWidth
        required
        value={formData.firstName}
        onChange={handleChange}
        error={errors.firstName}
        helperText={errors.firstName ? "İsim gerekli." : ""}
      />
      <TextField
        label={formLabels.lastName || "Soyisim"}
        name="lastName"
        variant="outlined"
        fullWidth
        required
        value={formData.lastName}
        onChange={handleChange}
        error={errors.lastName}
        helperText={errors.lastName ? "Soyisim gerekli." : ""}
      />
      <TextField
        label={formLabels.email || "Email"}
        name="email"
        type="email"
        variant="outlined"
        fullWidth
        required
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        helperText={errors.email ? "Geçerli bir email adresi girin." : ""}
      />
      <TextField
        label={formLabels.phone || "Telefon"}
        name="phone"
        type="tel"
        variant="outlined"
        fullWidth
        required
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        helperText={errors.phone ? "Geçerli bir telefon numarası girin (10 haneli)." : ""}
      />
      <TextField
        label={formLabels.message || "Mesaj"}
        name="message"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        required
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        helperText={errors.message ? "Mesaj en az 10 karakter olmalı." : ""}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {formLabels.submitButton || "Gönder"}
      </Button>
    </Box>
  );
};

export default HomeFormContact;

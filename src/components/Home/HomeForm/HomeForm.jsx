import React, { useState } from "react";
import HomeFormMap from "./HomeFormMap";
import { Box, Typography, TextField, Button } from "@mui/material";


const API_BASE_URL = import.meta.env.VITE_API_URL;
const HomeForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const formLabels = {
    title: "İletişim Formu",
    firstName: "İsim",
    lastName: "Soyisim",
    email: "Email",
    phone: "Telefon",
    message: "Mesaj",
    submitButton: "Gönder",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation and submission logic here
  };

  return (
    <div className="bg-dark py-5">
      <div className="row container d-flex justify-content-center align-items-center mx-auto">
        {/* Google Harita */}
        <div className="col-xl-6 col-lg-12">
          <HomeFormMap />
        </div>

        {/* İletişim Formu */}
        <div className="col-xl-6 col-lg-12">
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              maxWidth: 600,
              width: "100%",
              margin: "0 auto",
              padding: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              borderRadius: 2,
              backgroundColor: "#e0e0e0",
            }}
          >
            <Typography variant="h5" component="h1" textAlign="center" gutterBottom>
              {formLabels.title || "İletişim Formu"}
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
        </div>
      </div>
    </div>
  );
};

export default HomeForm;
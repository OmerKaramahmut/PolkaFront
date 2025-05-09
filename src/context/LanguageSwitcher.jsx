import { useLanguage } from "./LanguageContext";

const LanguageSwitcher = () => {
  const { locale, changeLanguage } = useLanguage();

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <img
        src="/flags/en.png" // İngiliz bayrağı görseli
        alt="English"
        style={{
          width: "40px",
          height: "30px",
          cursor: "pointer",
          opacity: locale === "en" ? 0.5 : 1, // Aktif dil için opaklık azaltılır
        }}
        onClick={() => changeLanguage("en")}
      />
      <img
        src="/flags/tr.webp" // Türk bayrağı görseli
        alt="Türkçe"
        style={{
          width: "40px",
          height: "30px",
          cursor: "pointer",
          opacity: locale === "tr" ? 0.5 : 1, // Aktif dil için opaklık azaltılır
        }}
        onClick={() => changeLanguage("tr")}
      />
    </div>
  );
};

export default LanguageSwitcher;

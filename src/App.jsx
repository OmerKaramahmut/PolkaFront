import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Navbar from './components/Navbar/Navbar'
import Products from './Pages/Products'
import Footer from './components/Home/Footer/Footer'
import Contact from './Pages/Contact'
import AboutUs from './Pages/AboutUs'

function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
      <Footer />

    </>
  )
}

export default App

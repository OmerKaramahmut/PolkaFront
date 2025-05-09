import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import "./Button.css";


const Button = () => {
    return (
        <div><button className='productBtn p-3 border-0 rounded-3 text-light fw-bold d-flex align-items-center gap-2 justify-content-center' style={{ backgroundColor: "#7eb0da", border: "none", width: "180px", height: "50px" }}>
            Ürünler <FaArrowRight className='btnArrow' />
        </button></div>
    )
}

export default Button
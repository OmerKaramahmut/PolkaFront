import React from 'react'

const ContactContainerLeft = () => {
    return (
        <div
            style={{ width: "600px", height: "350px" }}
            id="contactAbs"
            className="col-lg-6 col-md-6 col-sm-12 d-flex flex-column align-items-center w-50 justify-content-center gap-3"
            data-aos="fade-up" // AOS animasyonu
        >
            <CallIcon style={{ fontSize: "50px" }} />
            <h2>Talk to us</h2>
            <p>Daha fazla desteğe mi ihtiyaıcnız var? hemen arayın.</p>
            <h5 className='fw-bold'>2324234</h5>
        </div>
    )
}

export default ContactContainerLeft
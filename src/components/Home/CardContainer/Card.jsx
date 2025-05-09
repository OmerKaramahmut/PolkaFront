import React from 'react'
import CardPhoto from './CardPhoto'
import CardText from './CardText'
import "./CardContainer.css"

const Card = () => {
    return (
        <div className=' py-5 bg-light'>
            <div className='container responsive-container'>
                <div className="row ">
                    <div className="col-xl-6 col-12">
                        <CardPhoto />
                    </div>
                    <div className="col-xl-6 col-12 d-flex flex-column justify-content-start align-items-start">
                        <CardText />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Card
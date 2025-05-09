
import React from 'react'
import './HomeProducts.css'
import HomeProductsText from './HomeProductsText'
import HomeProductsDataCard from './HomeProductsDataCard'
const HomeProducts = () => {
    return (
        <div className='py-5 d-flex container'>
            <div className="row">
                <div className="col-12 col-xl-12">
                    <div>
                        <HomeProductsText />
                    </div>
                </div>
                <div className="col-12 col-xl-12">
                    <div className="homeProductsCard ">
                        <section className="sectionBrand d-flex align-items-center justify-content-center">
                            <div class="containerBrand">
                                <HomeProductsDataCard />
                            </div>
                        </section>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default HomeProducts
import React from 'react'
import Header from '../components/Home/Header/Header'
import Card from '../components/Home/CardContainer/Card'
import HomeProducts from '../components/Home/HomeProducts/HomeProducts'
import Certificate from '../components/Home/Certificate/Certificate'
import Parallax from '../components/Home/Parallax/Parallax'
import HomeForm from '../components/Home/HomeForm/HomeForm'
import Industries from '../components/Home/Industries/Industries'
const Home = () => {
  return (
    <div>
      <Header />
      <Card />
      <HomeProducts />
      <Parallax />
      <Industries />
      <Certificate />

      <HomeForm />
   
    </div>
  )
}

export default Home
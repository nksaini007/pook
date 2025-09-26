import React from 'react'
import Nev from './Nev'
import ArmyWallpaper from './ArmyWallpaper'
import img from "../img/dance2.gif"
import Categories from './Categories'
import AnimatedCart from './AnimatedCard'
import Footer from './Footer'
import TrendingItems from './TrendingItems'
const Home = () => {
  return (
    <div  >
      <Nev />

      <AnimatedCart/>
      <TrendingItems/>
      <Categories />
      <Footer/>
    </div>
  )
}

export default Home

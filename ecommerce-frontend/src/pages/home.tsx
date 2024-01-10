import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/Product-card'

const Home = () => {

  const addToCart=()=>{

  }

  return (
    <div className='home'>
      <section></section>

      <h1>
        Latest Products
        <Link to="/search" className="findmore">More</Link>
      </h1>

      <main>
        <ProductCard 
        productid='jigar' 
        name="macbook"
        price = {20000} 
        stock={4000} 
        handler={addToCart} 
        photo='https://m.media-amazon.com/images/I/71vFKBpKakL._SL1500_.jpg'/>
      </main>
    </div>
  )
}

export default Home
import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/Product-card'
import { useLatestProductsQuery } from '../redux/api/productAPI'
import toast from 'react-hot-toast'
import Loader, { Skeleton } from '../components/Loader'

const Home = () => {

  const { data,isError,isLoading } = useLatestProductsQuery("")

  const addToCart=()=>{

  }

  if(isError) toast.error("Cannot Fetch the Products!")

  return (
    <div className='home'>
      <section></section>

      <h1>
        Latest Products
        <Link to="/search" className="findmore">More</Link>
      </h1>

      <main>
        {
          isLoading ? <Skeleton width="80vw" /> :
          (data?.products.map(i=>(
            <ProductCard 
            productid={i._id}
            name={i.name}
            price = {i.price} 
            stock={i.stock} 
            handler={addToCart} 
            photo={i.photo}/>
          )))
        }
      </main>
    </div>
  )
}

export default Home
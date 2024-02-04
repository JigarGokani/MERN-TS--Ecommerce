import React, { useState } from 'react'
import ProductCard from '../components/Product-card'
import { useCategoriesQuery } from '../redux/api/productAPI'
import { CustomError } from '../types/api-types';
import toast from 'react-hot-toast';

const Search = () => {

  const { data:categoriesResponse,isLoading:loadingCategories,isError,error} = useCategoriesQuery("");

  const[search,setSearch] = useState("")
  const[sort,setSort]=useState("")
  const[maxPrice,setMaxPrice] = useState(100000)
  const[category,setCategory] = useState("")
  const[page,setPage] = useState(1)


  const addToCart=()=>{

  }

  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  if(isError){
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className='product-search-page'>
      <aside>
        <h2>Filters</h2>
        <div>
          <h1>Sort</h1>
          <select value={sort} onChange={(e)=>setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low To High)</option>
            <option value="dsc">Price (High To Low)</option>

          </select>
        </div>
        <div>
          <h4>Max Price : {maxPrice || ""}</h4>
          <input
          type='range'
          value={maxPrice}
          min="100"
          max="100000"
          onChange={(e)=>setMaxPrice(Number(e.target.value))}

          />

        </div>
        <div>
          <h4>Category</h4>
        <select value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option value="">ALL</option>
            {
              !loadingCategories && categoriesResponse?.
              Categories.map((i)=>(<option key={i} value={i}>{i.toUpperCase()}</option>))
            }
            

          </select>
        </div>
        

      </aside>
      <main>
        <h1>Products</h1>
        <input
        type='text'
        placeholder='Search by name....'
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        />

        <ProductCard
        productid='jigar' 
        name="macbook"
        price = {20000} 
        stock={4000} 
        handler={addToCart} 
        photo='https://m.media-amazon.com/images/I/71vFKBpKakL._SL1500_.jpg'
        />

        <article>
          <button disabled ={!isPrevPage} onClick={()=>setPage((prev)=>prev-1)}>Prev</button>
          <span>{page} of {4}</span>
          <button disabled={!isNextPage} onClick={()=>setPage((prev)=>prev+1)}>Next</button>
        </article>
      </main>
    </div>
  )
}

export default Search
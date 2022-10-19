import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useProductsContext } from '../../hooks/useProductsContext'

export default function Bids() {
  const {products,dispatch} = useProductsContext()

  const fetchProducts = async ()=>{
    const response = await fetch('/api/products')
    const json = await response.json()  
    
    if(response.ok){
     dispatch({type:'SET_PRODUCTS', payload:json})
    }   
 }


 
useEffect(()=>{
  fetchProducts()
},[])

  return (
    <div>
        {
          products && products.map((product) =>
          <div className='product-bids'>
            <p><strong>Bid:<br/> </strong>{product.bid} $ </p>
        
      </div>
            )
        }

    </div>
  )
    }
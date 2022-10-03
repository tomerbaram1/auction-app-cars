import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux'
import {newProduct} from "../features/products/productsSlice"

function ProductData() {
  const [products,setProducts] = useState([])
  const [text,setText] = useState("")
  const dispatch = useDispatch()
  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(newProduct({text}))
    setText('')
  }

  return (
    <div className="products-container">
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor='text'>Product</label>
            <input type='text' name='text' id='text' 
            value={text} onChange={(e) => setText(e.target.value)}/>
          </div>
          <div className="form-group">
            <button className="btn btn-block" type='submit'>
              Add Item
            </button>
          </div>
        </form>
      </section>
      
      <ul className='products'>
        {
          products.map((product,i) => {
            return <li className='product' key={i}>{product.title}</li>
          })
        }
      </ul>
    </div>
  );
}
export default ProductData
import {useState,useEffect} from 'react'
import { useProductsContext } from "../hooks/useProductsContext";
import { useSelector } from "react-redux";

export default function DeleteBtnAdmin(props) {
    const[remove,setRemove]= useState(true)
    const { products, dispatch } = useProductsContext();
    const { user } = useSelector((state) => state.auth);
    const setDeleteItem = () => {
        
      
      let deleteItem = {
        product:`product.${props.id}`
      };
  
      console.log(deleteItem);
      fetch(`/api/products/${props.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deleteItem),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    };
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const json = await response.json();
  
      if (response.ok) {
        dispatch({ type: "SET_PRODUCTS", payload: json });
      }
    }
  
    useEffect(() => {
      fetchProducts();
    }, [products]);
  
  return (

    <div>
        <button className='bid-btn' onClick={setDeleteItem}>Delete</button>
    </div>
  )
}

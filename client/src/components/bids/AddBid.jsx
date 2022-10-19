import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useProductsContext } from '../../hooks/useProductsContext'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Bid(props) {
  const { dispatch }= useProductsContext()
  const [products, setProducts] = useState([]);
  const [bid, setBid] = useState('')
  const [bidder, setBidder] = useState('')
  const [noBid,setNoBid] = useState(null)


  const {user} = useSelector((state) => state.auth)
  const [error,setError] = useState(null)
  
  // const placeBid = () => {
  //   let newBid = {bid: bid}
  
  // }
  
  const sendBid = () => {
    
    console.log('1')
    
    
    switch (true) {

      case bid < 1000:
        return toast.error('You must make a bid greater then 1000$', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          }),  noBid
        break;
      case bid < 10000:
        setBid('')
        break;
      default:
        
    }
  
    const setBidderAsUser =() =>{
      setBidder(user)
    }
    let updatedBid = {
      bid: bid ,
      time: new Date(),
      bidder: user.name,
      updatedprice: Number(props.updatedprice) + Number(bid), 
      
  
    };
    
console.log(updatedBid);
    fetch(`/api/products/${props.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedBid),
    })
    
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        fetchProducts()
      })
      .catch((error) => {
        console.log('Error:', error);
      })}
      ;
  

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
      <div>
        <input
        type='number'
        className="bid"
        value={bid}
        onChange={(e) => setBid(e.target.value)}
        />
   
        <button onClick={sendBid} className='bid-btn'>Place Bid</button>
      </div>
       <div>

       </div>
    </div>
  )
}

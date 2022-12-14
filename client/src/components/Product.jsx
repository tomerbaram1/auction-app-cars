import React, { useEffect, useState } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import ProductForm from "./ProductForm";
import Bid from "./bids/AddBid";
import { FaChevronUp } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';

import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiper.css";
import { Pagination, Navigation } from "swiper";
import TimeLeft from "./Timer";
import DeleteBtnAdmin from "./DeleteBtnAdmin";
import { productsReducer } from "../features/products/ProductContext";
function Product(props) {
  //no need for useState because of the new Hook we created
  const { products, dispatch } = useProductsContext();
  const [updatedprice, setUpdatedPrice] = useState("");
  const [bidder, setBidder] = useState("");
  const [admin, setAdmin] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [noBid, setNoBid] = useState(null);
  const [showMore, setShowMore] = useState(false);





  // const calcLastBid = () => {
  //   if(bids.length===0) {
  //     return "None";
  //   } else{
  //     return bids[bids.length - 1].bid
  //   }
  // }
  const fetchProducts = async () => {
    const response = await fetch("/api/products");
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_PRODUCTS", payload: json });
    }
  };
  useEffect(() => {
    fetchProducts();
    // isAdminVal()
  }, [user]);
 
  return (
    <>
      {user && user.isAdmin ? (
      
        <section className="content">
          <p className="cars-par">Cars for sell</p>
          <div className="products">
            {products &&
              products.map((product, index) => (
                
                <div className="product-details" key={index}>
                  <h4>{product.title}</h4>
                  <div>
                    <img className="car-image" src={product.image}></img>
                  </div>
                  <p>
                    <strong>
                      Car Brand:
                      <br />{" "}
                    </strong>
                    {product.brand}
                  </p>
                  <p>
                    <strong>
                      Car Catergory:
                      <br />{" "}
                    </strong>
                    {product.catergory}{" "}
                  </p>
                  <p>
                    <strong>
                      About the Car:
                      <br />{" "}
                    </strong>
                    {product.description}
                  </p>
                  <p>
                    <strong>
                      Starting Price:
                      <br />{" "}
                    </strong>
                    {product.startprice} ${" "}
                  </p>
                  <p>
                    <strong>
                      Last Bid:
                      <br />{" "}
                    </strong>
                    {product.bid} ${" "}
                  </p>
                  <p>
                    <strong>
                      Current Price:
                      <br />{" "}
                    </strong>
                    {product.updatedprice > 0
                      ? product.updatedprice + product.startprice
                      : product.startprice}{" "}
                    ${" "}
                  </p>
                  <div>
                    <strong>
                      Auction Start:
                      <br />{" "}
                    </strong>
                    {product.bidStart}
                  </div>
                  <div>
                    <strong>
                      Auction End:
                      <br />{" "}
                    </strong>
                    <TimeLeft bidEnd={product.bidEnd} />
                  </div>
                  {user.isAdmin ? (
                    <>
                    <p><strong>Total bids:</strong>{product.bids}</p>
                      <p>
                        <strong>
                          Last Bidder:
                          <br />{" "}
                        </strong>
                        {product.bidder}{" "}
                      </p>
                     
                      <DeleteBtnAdmin
                      id={product._id}
                      />
                    </>
                  ) : null}
                  
                </div>
              ))}
          </div>
        </section>
      ) : (
        <section className="container">

            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              slidesPerGroup={3}
              loop={true}
              loopFillGroupWithBlank={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {products &&
                products.map((product, index) => (
                  <SwiperSlide className="swiper-slide" key={index}>
                    <div className="product-details-swiper">
                      <h4>{product.title}</h4>
                      <div>
                        <img src={product.image}></img>
                      </div>
                      <p>
                        <strong>
                          Current Price:
                          <br />{" "}
                        </strong>
                        {product.updatedprice > 0
                          ? product.updatedprice + product.startprice
                          : product.startprice}{" "}
                        ${" "}
                      </p>
                    <div>
                        <strong>
                          Auction End:
                          <br />{" "}
                        </strong>
                        <TimeLeft bidEnd={product.bidEnd} />
                      </div>
                      <section>
                    <button className="bid-btn" onClick={() => setShowMore(!showMore)}>
                    {showMore ? FaChevronUp() : FaChevronDown()}
                    </button>
                        {showMore? 
                        <>
                        

                        <p>
                        <strong>
                          Car Brand:
                          <br />{" "}
                        </strong>
                        {product.brand}
                      </p>
                      <p>
                        <strong>
                          Car Catergory:
                          <br />{" "}
                        </strong>
                        {product.catergory}{" "}
                      </p>
                      <p>
                        <strong>
                          About the Car:
                          <br />{" "}
                        </strong>
                        {product.description}
                      </p>
                      <p>
                        <strong>
                          Starting Price:
                          <br />{" "}
                        </strong>
                        {product.startprice} ${" "}
                      </p>
                      <p>
                        <strong>
                          Last Bid:
                          <br />{" "}
                        </strong>
                        {product.bid} ${" "}
                      </p>
                     
                     
                      {/* <div>
                        <strong>
                          Auction Start:
                          <br />{" "}
                        </strong>
                        {product.bidStart}
                      </div> */}
                      
                      <Bid
                        
                        bidder={product.bidder}
                        id={product._id}
                        updatedprice={product.updatedprice}
                        bid={product.bid}
                      />
                      </>

                      :
                      ''}
                        
                      </section>
                      
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
        
        </section>
      )}
    </>
  );
}
export default Product;

{
  /*<section className="content">
      <p className='cars-par'>Cars for sell</p>
        <div className='products'>
          
        {
          products && products.map((product,index) =>
          
          <div className='product-details' key={index}>
          <h4>{product.title}</h4>
          <div ><img className='car-image' src={product.image}></img></div>
          <p><strong>Car Brand:<br/> </strong>{product.brand}</p>
          <p><strong>Car Catergory:<br/> </strong>{product.catergory} </p>
          <p><strong>About the Car:<br/> </strong>{product.description}</p>
          <p><strong>Starting Price:<br/> </strong>{product.startprice} $ </p>
          <p><strong>Last Bid:<br/> </strong>{product.bid} $ </p>
          <p><strong>Current Price:<br/> </strong>{product.updatedprice>0 ? product.updatedprice + product.startprice  : product.startprice} $ </p>
          <p><strong>Auction End:<br/> </strong>{product.bidEnd}</p>
          { user.isAdmin  ? 
          <>
           
           <p><strong>Last Bidder:<br/> </strong>{product.bidder}  </p>
           <p><strong>Last Bid Time:<br/> </strong>{product.time}  </p>
           </> 
          : null}

        
          <Bid 
          
          bidder={product.bidder}
          id={product._id}
          updatedprice={product.updatedprice}
          bid={product.bid}
          />
      </div> */
}

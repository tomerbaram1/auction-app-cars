import React, { useEffect, useState } from "react";
import { useProductsContext } from "../hooks/useProductsContext";

export default function LastBid() {
  const { products, dispatch } = useProductsContext();

  const fetchProducts = async () => {
    const response = await fetch("/api/products");
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_PRODUCTS", payload: json });
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <section>
        <div>
          {products &&
            products.map((product, index) => (
              <>
                <div key={index}>
                  <h5>{product.title}</h5>
                  <p>
                    <strong>
                      Last Bidder:
                      <br />{" "}
                    </strong>
                    {product.bidder}{" "}
                  </p>
                  <p>
                    <strong>
                      Last Bid Time:
                      <br />{" "}
                    </strong>
                    {product.time}{" "}
                  </p>
                </div>
              </>
            ))}
        </div>
      </section>
    </>
  );
}

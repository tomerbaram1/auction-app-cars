import { useState } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ProductForm() {
  const { user } = useSelector((state) => state.auth);

  const { dispatch } = useProductsContext();
  let d = new Date();

  const [updatedprice, setUpdatedPrice] = useState("");
  const [bid, setBid] = useState("");
  const [title, setTitle] = useState("");
  const [bidStart, setBidStart] = useState(new Date().toLocaleString());
  const [bidEnd, setBidEnd] = useState(new Date().toLocaleString());
  const [startprice, setStartprice] = useState("");
  const [brand, setBrand] = useState("");
  const [catergory, setCatergory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [error, setError] = useState(null);

  // const uploadImage = () => {
  //     const formData = new FormData()
  //     formData.append("file",image)
  //     formData.append("upload_preset", "wjfih9hg")

  //     axios.post("https://api.cloudinary.com/v1_1/dnpuz1rss/image/upload", formData).then((response)=>{
  //         console.log(response);
  //     })
  // }

  const newEndTime = (days) => {
    // const days = 5;
    let d = new Date();
    const newBidEnd = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate() + parseInt(days),
      d.getHours(),
      d.getMinutes(),
      d.getSeconds()
    );
    setBidStart(d.toLocaleString())
    setBidEnd(newBidEnd);

    // console.log(newBidEnd);
    // console.log("=================");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      title,
      bidStart: bidStart.toLocaleString(),
      bidEnd: bidEnd.toLocaleString(),
      startprice,
      brand,
      catergory,
      description,
      image,
    };

    // setBidEnd(new Date(d.getFullYear(),d.getMonth(),d.getDate()+parseInt(product.bidEnd),d.getHours(),d.getMinutes(),d.getSeconds()).toLocaleString())
    // console.log(bidEnd);
    // setBidStart(new Date().toLocaleString())
    // setBidEnd(new Date(d.getFullYear(),d.getMonth(),d.getDate()+parseInt(product.bidStart),d.getHours(),d.getMinutes(),d.getSeconds()).toLocaleString(),)
    // bidStart=Date.now
    // bidEnd=new Date(d.getFullYear(),d.getMonth(),d.getDate()+parseInt(product.bidStart),d.getHours(),d.getMinutes(),d.getSeconds()).toLocaleString(),
    console.log("product", product);
    const response = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
    }
    if (response.ok) {
      setTitle("");
      setBidStart("");
      newEndTime();
      setBrand("");
      setCatergory("");
      setDescription("");
      setStartprice("");
      setImage("");
      // setUpdatedPrice('')
      // setBid('')
      setError(null);
      console.log("new car added");
      dispatch({ type: "ADD_PRODUCT", payload: data });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Add a Car</h3>

      <label> Car Name: </label>
      <input
        type="text"
        placeholder="Product name"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        type="text"
        placeholder="Car image"
        onChange={(e) => setImage(e.target.value)}
        value={image}
      />
      <label> Car Brand: </label>
      <input
        type="text"
        placeholder="Car company and brand"
        onChange={(e) => setBrand(e.target.value)}
        value={brand}
      />
      <label> Auction End: </label>
      <h3>{bidEnd.toLocaleString()} Day/s</h3>
      <select
        className="select"
        placeholder="Select how long the auction will last."
        onChange={(e) => newEndTime(e.target.value)}
        value={bidEnd}
      >
        <option value="">Select End Time</option>
        <option className="option" value={"1"}>
          1 Day
        </option>
        <option className="option" value={"2"}>
          2 Days
        </option>
        <option className="option" value={"3"}>
          3 Days
        </option>
        <option className="option" value={"4"}>
          4 Days
        </option>
        <option className="option" value={"5"}>
          5 Days
        </option>
      </select>
      <div></div>
      <label> Car Catergory: </label>
      <h3>{catergory}</h3>
      <select
        onChange={(e) => setCatergory(e.target.value)}
        value={catergory}
        className="select"
      >
        <option value="">Select Car Catergory</option>
        <option className="option">Sport</option>
        <option className="option">SUV</option>
        <option className="option">Crossover</option>
        <option className="option">Sedan</option>
        <option className="option">Minivan</option>
        <option className="option">Coupe</option>
      </select>
      <label> Car Description: </label>
      <input
        type="text"
        placeholder="Product description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <label> Car Starting Price: </label>
      <input
        type="text"
        placeholder="Auction will start from this price point."
        onChange={(e) => setStartprice(e.target.value)}
        value={startprice}
      />

      <button className="bid-btn" type="submit">
        Add Product
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

import { useEffect, useState } from "react";
import { useProductsContext } from "../hooks/useProductsContext";

const TimeLeft = (props) => {
  const { products, dispatch } = useProductsContext();
  const fetchProducts = async () => {
    const response = await fetch("/api/products");
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_PRODUCTS", payload: json });
    }
  };


  let [timeCounter, setTimeCounter] = useState("");
  setInterval(() => {
    timeleft();
  }, 1000);
  function timeleft() {
    let aaa = Date.now();
    const bbb = Date.parse(props.bidEnd);
    if (bbb > aaa) {
      let ccc = bbb - aaa;
      let seconds = Math.floor(ccc / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);
      hours = hours % 24;
      seconds = seconds % 60;
      minutes = minutes % 60;
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      setTimeCounter(
        days + " days  " + hours + ":" + minutes + ":" + seconds + "  hours"
      );
    } else {
      setTimeCounter("The auction ended");
    }
  }

  useEffect(() => {
    fetchProducts();
    // isAdminVal()
  }, []);
  return <h5 style={{ color: "red" }}>{timeCounter}</h5>;
};
export default TimeLeft;

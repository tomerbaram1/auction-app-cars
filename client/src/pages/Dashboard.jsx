import React from "react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Product from "../components/Product";

import car1 from "../assets/car1.jpg";
import car2 from "../assets/car2.jpg";
import car3 from "../assets/car3.jpg";
import Landing from "../components/Landing";
import Slider from "../components/Slider";
import LastBid from "../components/LastBid";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      {user && !user.isAdmin ? (
        <>
          <Landing imageSrc={car3} />
          <Slider
            imageSrc={car2}
            title={"Be Adventurus"}
            subtitle={
              "Our platform offers a wide variety of unique cars only for you."
            }
          />
          <Slider
            imageSrc={car1}
            title={"Drive Comfortably"}
            subtitle={"Your dream car is only a few clicks away."}
            flipped={true}
          />
        </>
      ) : null}

      <section className="heading">
        <h1>Welcome {user && user.name}</h1>

        <br />
      </section>
      <Product />
    </>
  );
};

export default Dashboard;

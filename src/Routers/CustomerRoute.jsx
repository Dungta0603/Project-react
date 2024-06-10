import React from "react";
import { Navbar } from "../componet/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../componet/Home/Home";
import RestaurantDetails from "../componet/Restaurant/RestaurantDetails";
import Cart from "../componet/Cart/Cart";
import Profile from "../componet/Profile/Profile";
import { Auth } from "../componet/Auth/Auth";
import { PaymentSuccess } from "../componet/PaymentSuccess/PaymentSuccess";
export const CustomerRoute = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/:register" element={<Home />} />
        <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails />} /> 
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-Proflie/*" element={<Profile />} />
        <Route path="/payment/success/:id" element={<PaymentSuccess />} />
        
      </Routes>
      <Auth />
    </div>
  );
};
import React from "react";
import RestaurantCard from "../Restaurant/RestaurantCard";
import { useSelector } from "react-redux";

export default function Favories() {
  const {auth} = useSelector(store=>store)
  return (
    <div>
      <h1 className="py-5 text-xl font-semibold text-center ">Nhà hàng yêu thích của tôi</h1>
      <div className="flex flex-wrap gap-3 justify-center">
        {auth.favorites.map((item) => (
          <RestaurantCard item = {item}/>
        ))}
      </div>
    </div>
  );
}

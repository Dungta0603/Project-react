import React from "react";
import { ProfileNavigation } from "./ProfileNavigation";
import { Routes, Route } from "react-router-dom";
import UserProflie from "./UserProflie";
import { Orders } from "./Orders";
import Address from "./Address";
import Favories from "./Favories";
import { Events } from "./Events";

const Profile = () => {
  return (
    <div className="lg:flex justify-between">
      <div className="sticky h-[80vh] lg:w-[20%]">
        <ProfileNavigation />
      </div>
      <div className="lg:w-[80%]">
        <Routes>
          <Route path="/" element={<UserProflie />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/favorites" element={<Favories />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;

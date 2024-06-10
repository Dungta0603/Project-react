import "./App.css";
import { Navbar } from "./componet/Navbar/Navbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./Theme/DarkTheme";
import Home from "./componet/Home/Home";
import RestaurantDetails from "./componet/Restaurant/RestaurantDetails";
import Cart from "./componet/Cart/Cart";
import Profile from "./componet/Profile/Profile";
import { CustomerRoute } from "./Routers/CustomerRoute";
import { LoginForm } from "./componet/Auth/LoginForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./componet/State/Authentication/Action";
import { findCart } from "./componet/State/Cart/Action";
import Routers from "./Routers/Routers";
import { getAllRestaurantByUserId } from "./componet/State/Restaurant/Action";

function App() {
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")
  const {auth}=useSelector(store=>store)

  useEffect(()=>{
    dispatch(getUser(auth.jwt || jwt))
    dispatch(findCart(jwt))
  },[auth.jwt]);
  
  useEffect(()=>{
    dispatch(getAllRestaurantByUserId(auth.jwt || jwt));
  },[auth.user])
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <Routers />
     
    </ThemeProvider>
  );
}

export default App;

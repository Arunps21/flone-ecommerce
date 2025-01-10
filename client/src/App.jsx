import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./sections/Home";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Collections from "./pages/Collections";
import SearchBar from "./components/SearchBar";
import IndividualProduct from "./pages/IndividualProduct";
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import ContactUs from "./pages/ContactUs";
import Banner from "./components/Banner";
import Invoice from "./pages/Invoice";
import BackToTop from "./components/BackToTop";

const App = () => {
  const location = useLocation();
  const isNotFound =
    location.pathname &&
    ![
      "/",
      "/login",
      "/signin",
      "/profile",
      "/collection",
      "/product/:id",
      "/cart",
      "/placeorder",
      "/orders",
      "/contactus",
      "/invoice",
    ].some((path) => {
      const matchPath = new RegExp(`^${path.replace(/:\w+/g, "\\w+")}$`);
      return matchPath.test(location.pathname);
    });

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw]  bg-wh dark:text-white dark:bg-[#212121]">
    {/* <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] bg-wh dark:text-white dark:bg-[#212121]"> */}
      <ToastContainer />
      {!isNotFound && <Banner />}
      {!isNotFound && <Nav />}
      {!isNotFound && <SearchBar />}
      <BackToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/collection" element={<Collections />} />
        <Route path="/product/:id" element={<IndividualProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isNotFound && <Footer />}
    </div>
  );
};

export default App;

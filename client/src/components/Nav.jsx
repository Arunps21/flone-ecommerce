import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LuMoon } from "react-icons/lu";
import { FaRegSun } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { ShopContext } from "../context/ShopContext";
import { useTheme } from "../context/ThemeContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AnimationContext } from "../context/AnimationContext";

const Nav = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    cartCount,
    setCartCount,
    token,
    setToken,
    navigate,
    fetchCart,
    setCartData,
    userName,
  } = useContext(ShopContext);

  const timeline = useContext(AnimationContext);
  const navRef = useRef(null);

  const { theme, changeTheme } = useTheme();

  // Toggle the theme between light and dark
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    changeTheme(newTheme);
  };

  // Render the theme icon based on the current theme
  const renderThemeIcon = () => {
    return theme === "light" ? (
      <LuMoon className="w-5 h-5 cursor-pointer " />
    ) : (
      <FaRegSun className="w-5 h-5 cursor-pointer dark:text-white" />
    );
  };

  console.log(userName);

  const logoutFun = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartData({ cart: [] });
    setCartCount(0);
    navigate("/login");
  };

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);

  useGSAP(() => {
    if (timeline) {
      timeline.fromTo(
        navRef.current.querySelectorAll("a, ul p, .icons > *"),
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.2 }
      );
    }
  }, [timeline]);

  return (
    <nav
      ref={navRef}
      className="flex justify-between items-center font-medium "
    >
      <a href="/" className="text-3xl font-bold uppercase">
        Flone.
      </a>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700 uppercase dark:text-gray-300">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden " />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>Collections</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contactus" className="flex flex-col items-center gap-1">
          <p>contact us</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="icons flex items-center gap-5">
        {/* Search Icon */}
        <FiSearch
          className=" dark:text-white w-5 h-5 cursor-pointer"
          onClick={() => setShowSearch(true)}
        />

        {/* Profile Icon with Dropdown */}
        <div className="group relative z-20">
          <div className="flex items-center justify-center">
            <IoPersonCircleOutline className="dark:text-white w-5 h-5 cursor-pointer" />
            {token && <p className="text-[10px]">{userName}</p>}
          </div>
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-30">
            <div className="flex flex-col gap-2 w-36 py-2 px-5 bg-slate-50 text-gray-500 dark:bg-slate-600 dark:text-gray-300 rounded shadow">
              <Link to={"/profile"}>
                <p className="cursor-pointer hover:text-black">My Profile</p>
              </Link>
              <hr />
              <p
                onClick={() => navigate("/orders")}
                className="cursor-pointer hover:text-black"
              >
                Orders
              </p>
              <hr />
              {token ? (
                <p
                  onClick={logoutFun}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              ) : (
                <Link to={"/login"}>
                  <p className="cursor-pointer hover:text-black">Login</p>
                </Link>
              )}
              <hr />
              <a href="https://flone-admin.vercel.app/" target="_blank">
                <p>Admin Panel</p>
              </a>
            </div>
          </div>
        </div>

        {/* Cart Icon with Badge */}
        <Link to="/cart" className="relative">
          <FiShoppingCart className="dark:text-white w-5 h-5 cursor-pointer" />
          {cartCount > 0 && (
            <p className="absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {cartCount}
            </p>
          )}
        </Link>

        {/* Theme Change Icon */}
        <button onClick={toggleTheme}>
          {/* Display the theme icon */}
          {renderThemeIcon()}
        </button>

        {/* Hamburger Menu Icon */}
        <GiHamburgerMenu
          className="w-5 h-5 cursor-pointer sm:hidden"
          onClick={() => setVisible(true)}
        />
      </div>

      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all z-50 ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600 relative">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center absolute gap-4 p-3 right-4 top-2 cursor-pointer"
          >
            <RxCross1 className="dark:text-white w-5 h-5 cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-6 text-lg mt-28 uppercase">
          <NavLink onClick={() => setVisible(false)} to="/">
            Home
          </NavLink>
          <NavLink onClick={() => setVisible(false)} to="/collection">
            Collections
          </NavLink>
          <NavLink onClick={() => setVisible(false)} to="/contactus">
            Contact us
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

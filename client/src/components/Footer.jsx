import React from "react";
import { LuFacebook } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";
import { master, visa } from "../assets/icons/icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm">
        <div>
          <h1 className="text-3xl font-bold uppercase">Flone.</h1>
          <p className="w-full md:w-2/3 text-gray-600 dark:text-gray-400">
            Explore Flone Men's Wear, where style meets comfort. Discover
            premium quality clothing tailored to perfection. Redefine your
            wardrobe with trendy designs, timeless classics, and exceptional
            craftsmanship. Elevate your fashion game with Flone – your ultimate
            style destination.
          </p>
          <div className="flex gap-2 mt-1">
            <img className="h-7 w-7" src={visa} alt="" />
            <img className="h-7 w-7" src={master} alt="" />
          </div>
        </div>

        <div>
          <p className="text-xl font-md mb-5">Company</p>
          <ul className="flex flex-col gap-1 text-gray-600 dark:text-gray-400">
            <Link to={"/"}><li>Home</li></Link>
            <Link to={"/contactus"}><li>Contact Us</li></Link>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-md mb-5">Get In Touch</p>
          <ul className="flex flex-col gap-1 text-gray-600 dark:text-gray-400">
            <li>+91 7034470692</li>
            <li>flone@gmail.com</li>
          </ul>
          <div className="flex gap-4 mt-3 items-center dark:text-gray-400">
            <LuFacebook />
            <FaInstagram />
            <FaXTwitter />
            <FiYoutube />
          </div>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          &copy; {new Date().getFullYear()} flone.com &reg;All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

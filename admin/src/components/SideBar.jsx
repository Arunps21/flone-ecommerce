import React from "react";
import { NavLink } from "react-router-dom";
import { add_icon, conversation, list_icon, order_icon, user } from "../assets/assets";

const SideBar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink to="/users" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 ">
          <img className="w-5 h-5" src={user} alt="Add Icon" />
          <p className="hidden md:block">All Users</p>
        </NavLink>
        <NavLink to="/add" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 ">
          <img className="w-5 h-5" src={add_icon} alt="Add Icon" />
          <p className="hidden md:block">Add Products</p>
        </NavLink>
        <NavLink to="/list" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 ">
          <img className="w-5 h-5" src={list_icon} alt="Add Icon" />
          <p className="hidden md:block">List Products</p>
        </NavLink>
        <NavLink to="/orders" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 ">
          <img className="w-5 h-5" src={order_icon} alt="Add Icon" />
          <p className="hidden md:block">Product Orders</p>
        </NavLink>
        <NavLink to="/contact" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 ">
          <img className="w-5 h-5" src={conversation} alt="Add Icon" />
          <p className="hidden md:block">Contact Messages</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;

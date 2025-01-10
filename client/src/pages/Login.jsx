import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Login = () => {
  const {backendUrl,navigate,token,setToken,fetchCart} = useContext(ShopContext)
  const [login,setLogin] = useState({})

  const loginFun=(event)=>{
    setLogin({...login,[event.target.name]:event.target.value})
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
      const {data} = await axios.post(`${backendUrl}/user/login`,login)
      if(data.success == true){
        setToken(data.token)
        await fetchCart()
        localStorage.setItem("token",data.token)
        toast.success(data.msg)
      }
      else{
        toast.error(data.msg)
      }
    }
    catch(err){
      console.log(err)
    }
  };

  useEffect(()=>{
    if(token){
      navigate("/")
    }
  },[token])

  return (
    <form
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 dark:text-gray-500"
      onSubmit={handleSubmit}
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">Sign In</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800 dark:bg-gray-500" />
      </div>
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
        name="email"
        onChange={loginFun}
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
        name="password"
        onChange={loginFun}
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password</p>
        <Link to="/signin">
          <p className="cursor-pointer">Create account</p>
        </Link>
      </div>
      <button
        className="bg-black text-white px-8 py-2 mt-4 font-light"
        type="submit"
      >
        Sign In
      </button>
    </form>
  );
};

export default Login;

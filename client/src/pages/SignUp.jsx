import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const SignUp = () => {
  const { backendUrl, token, setToken, navigate,fetchCart } = useContext(ShopContext);
  const [signUp, setSignUp] = useState({ name: "", email: "", password: "" });

  const signUpFun = (event) => {
    setSignUp({ ...signUp, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/user/register`, signUp);
      if (data.success == true) {
        setToken(data.token);
        await fetchCart()
        localStorage.setItem("token", data.token);
        setSignUp({ name: "", email: "", password: "" });
        toast.success(data.msg);
        navigate("/");
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">Sign Up</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      <input
        type="text"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Name"
        required
        name="name"
        value={signUp.name}
        onChange={signUpFun}
      />
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
        name="email"
        value={signUp.email}
        onChange={signUpFun}
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
        name="password"
        value={signUp.password}
        onChange={signUpFun}
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password</p>
        <Link to="/login">
          <p className="cursor-pointer">Login here</p>
        </Link>
      </div>
      <button
        className="bg-black text-white px-8 py-2 mt-4 font-light"
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;

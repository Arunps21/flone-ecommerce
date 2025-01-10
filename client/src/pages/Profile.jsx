import React, { useContext, useEffect } from "react";
import Orders from "./Orders";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { profilelooking } from "../assets/gifs/gifs";
import { user } from "../assets/images/images";
import axios from "axios";
import { useState } from "react";

const Profile = () => {
  const { token, backendUrl } = useContext(ShopContext);
  const [userData,setUserData] = useState({})

  const userView = async () => {
    if(!token){
      return null
    }
    try{
      const { data } = await axios.post(`${backendUrl}/user/profile`,{}, {
        headers: { token },
      });
      if(data.success == true){
        return setUserData(data.user)
      }
    }
    catch(err){
      console.log(err)
    }
  };

  useEffect(() => {
    userView();
  }, [token]);

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center mt-6">
        <img src={profilelooking} alt="Not Login" className="w-60 mb-3" />
        <p className="text-gray-500 text-center">Your journey begins here!</p>
        <p className="text-gray-500 text-center">
          Log in now to unlock your personalized profile.
        </p>
        <Link to={"/login"}>
          <button className="px-4 py-1 text-white bg-black mt-2">Login</button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-md p-8 md:flex sm:space-x-6  dark:text-gray-800 mt-8 flex justify-center items-center xs:flex-col">
        <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
          <img
            src={user}
            alt="user"
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">{userData.name}</h2>
          </div>
          <div className="space-y-1">
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="Email address"
                className="w-4 h-4"
              >
                <path
                  fill="currentColor"
                  d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                ></path>
              </svg>
              <span className="dark:text-gray-600">
                {userData.email}
              </span>
            </span>
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="Phonenumber"
                className="w-4 h-4"
              >
                <path
                  fill="currentColor"
                  d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"
                ></path>
              </svg>
              <span className="dark:text-gray-600">+25 381 77 983</span>
            </span>
          </div>
        </div>
      </div>
      <Orders />
    </>
  );
};

export default Profile;

import React, { useContext, useState } from "react";
import { LuFacebook } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";
import Title from "../components/Title";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [msg, setMsg] = useState({ name: "", email: "", message: "" });
  const { backendUrl } = useContext(ShopContext);

  const submitMsg = (event) => {
    setMsg({ ...msg, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/contact/message`, msg);
      console.log(data);

      if (data.success == true) {
        toast.success(data.msg);
        setMsg({ name: "", email: "", message: "" });
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className="text-gray-600 dark:text-gray-600 body-font relative">
        <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              <Title text1={"Contact"} text2={"us"} />
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base dark:text-gray-500">
              Have questions? Feel free to reach out to us. We're here to help!
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto ">
            <form className="flex flex-wrap -m-2" onSubmit={handleSubmit}>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600 dark:text-gray-500"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    value={msg.name}
                    onChange={submitMsg}
                    className="w-full bg-gray-100 dark:text-white dark:bg-gray-600 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600 dark:text-gray-500"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={msg.email}
                    placeholder="Your Email"
                    onChange={submitMsg}
                    className="w-full bg-gray-100 dark:text-white dark:bg-gray-600 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-600 dark:text-gray-500"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={msg.message}
                    placeholder="Your Message"
                    onChange={submitMsg}
                    className="w-full bg-gray-100 dark:bg-gray-600 dark:text-white bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-black border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Send Message
                </button>
              </div>
              <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                <a href="mailto:example@email.com" className="text-gray-700 dark:text-gray-500">
                  flone@gmail.com
                </a>
                <address className="leading-normal my-5">
                  49 Smith St.
                  <br />
                  Saint Cloud, MN 56301
                </address>
                <span className="inline-flex">
                  <a className="text-gray-500" aria-label="Facebook">
                    <LuFacebook />
                  </a>
                  <a className="ml-4 text-gray-500" aria-label="Twitter">
                    <FaXTwitter />
                  </a>
                  <a className="ml-4 text-gray-500" aria-label="Instagram">
                    <FaInstagram />
                  </a>
                  <a className="ml-4 text-gray-500" aria-label="LinkedIn">
                    <FiYoutube />
                  </a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;

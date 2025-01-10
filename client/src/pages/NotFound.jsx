import React from "react";
import { Link } from "react-router-dom";
import { notfound } from "../assets/gifs/gifs";

const NotFound = () => {
  return (
    <div>
      <section className="flex items-center h-full dark:bg-gray-50 dark:text-gray-800">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <img src={notfound} alt="" />
            <p className="text-2xl font-semibold md:text-3xl">
              Sorry, we couldn't find this page.
            </p>
            <p className="mt-4 mb-8 dark:text-gray-600">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            <Link to="/">
              <button className="px-3 py-4 font-semibold rounded bg-black text-white dark:bg-default-600 dark:text-gray-50">
                Back to homepage
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;

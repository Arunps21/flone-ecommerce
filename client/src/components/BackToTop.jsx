import React, { useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";

const BackToTop = () => {
  useEffect(() => {
    const mybutton = document.getElementById("btn-back-to-top");

    const scrollFunction = () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        mybutton.classList.remove("hidden");
      } else {
        mybutton.classList.add("hidden");
      }
    };

    const backToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    mybutton.addEventListener("click", backToTop);
    window.addEventListener("scroll", scrollFunction);

    return () => {
      mybutton.removeEventListener("click", backToTop);
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  return (
    <>
      {/* Back to top button */}
      <button
        type="button"
        className="fixed bottom-5 right-5 hidden rounded-full bg-black p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out "
        id="btn-back-to-top"
      >
        <span className="w-4">
          <FaArrowUp />
        </span>
      </button>
    </>
  );
};

export default BackToTop;

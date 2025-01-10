import React, { useContext, useRef } from "react";
import { heroImg } from "../assets/images/images";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { AnimationContext } from "../context/AnimationContext";

const Hero = () => {
  const timeline = useContext(AnimationContext);
  const heroRef = useRef(null);

  useGSAP(() => {
    if (timeline && heroRef.current) {

      timeline.fromTo(
        heroRef.current.querySelector(".container h1"),
        { x: -200, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power1.out" }
      );

      // Add animation for p
      timeline.fromTo(
        heroRef.current.querySelector("p"),
        { x: -200, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power1.out" }
      );

      // Add animation for buttons
      timeline.fromTo(
        heroRef.current.querySelectorAll("button"),
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.2,
          ease: "back.out(1.7)",
        }
      );

      // Add animation for image
      timeline.fromTo(
        heroRef.current.querySelector("img"),
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [timeline]);

  return (
    <div>
      <section ref={heroRef} className="text-gray-600 body-font ">
        <div className="container mx-auto flex px-5 py-16 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="prata-regular title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 dark:text-white">
              Redefine Your Style with Premium <span className="prata-regular text-gray-500">Men's Wear</span>
              <br className="hidden lg:inline-block" /> Where Fashion Meets
              Confidence
            </h1>
            <p className="mb-8 leading-relaxed">
              Explore a world of timeless elegance and cutting-edge trends. From
              tailored suits to casual classics, our collection is designed to
              elevate your wardrobe and amplify your confidence. Shop now and
              step into style like never before!
            </p>
            <div className="flex justify-center">
              <Link to={"/cart"}>
                <button className="inline-flex text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Shop Now
                </button>
              </Link>
              <Link to={"/collection"}>
                <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                  View Collection
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={heroImg}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;

import React, { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductCard from "../components/ProductCard";
// import { AnimationContext } from "../context/AnimationContext";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);


const NewArrival = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  // const timeline = useContext(AnimationContext)
  // const newRef = useRef(null)

  useEffect(() => {
    setLatestProducts(products.slice(0, 15));
  }, [products]);
  
  // useGSAP(() => {
  //   if (timeline && newRef.current) {
  //     gsap.from(
  //       newRef.current.querySelector(".title"),
  //       {
  //         opacity:0,
  //         duration: 0.5,
  //         scrollTrigger: {
  //           trigger: newRef.current,
  //           scroller: document.body,
  //           markers: true,
  //           start: "top bottom", 
  //           end: "bottom top", 
  //           scrub: true, 
  //         },
  //       }
  //     );
      // gsap.fromTo((newRef.current.querySelectorAll(".product")),
      //   {
      //     opacity: 0,
      //   },
      //   {
      //     opacity: 1,
      //     duration: 0.5,
      //     stagger: 0.6, 
      //     scrollTrigger: {
      //       trigger: newRef.current,
      //       scroller: document.body,
      //       markers: true,
      //       start: "top bottom", // Adjust this based on where you want the animation to start
      //       end: "bottom top", // Adjust this based on where you want the animation to stop
      //       scrub: true, // Ties the animation to the scroll
      //     },
      //   }
      // );;
  //   }
  // }, [timeline]);


    return (
    // <section ref={newRef} className="my-10">
    <section className="my-4">
      <div className="title text-center py-8 text-3xl">
        <Title text1="new" text2="arrival" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 dar mt-3">
          Fresh Styles, Just In! Explore Our Latest Arrivals Today!
        </p>
      </div>

      <div className="product grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.length > 0 ? (
          latestProducts.map((item, index) => (
            <ProductCard
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-sm text-gray-600">
            No Items Found
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrival;

import React, { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductCard from "../components/ProductCard";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  // const timeline = useContext(AnimationContext)
  // const bestRef = useRef(null)
  
  useEffect(() => {
    setBestSeller(products.slice(0, 18));
  }, [products]);

  // useGSAP(() => {
  //   if (timeline && bestRef.current) {
  //     gsap.from(
  //       bestRef.current.querySelector(".title"),
  //       {
  //         opacity:0,
  //         duration: 0.5,
  //         scrollTrigger: {
  //           trigger: bestRef.current,
  //           scroller: document.body,
  //           markers: true,
  //           start: "top 50%", 
  //           end: "bottom top", 
  //           scrub: true, 
  //         },
  //       }
  //     );
  //   }
  // }, [timeline]);

  return (
    // <section ref={bestRef} className="my-10">
    <section className="my-5">
      <div className="title text-center py-8 text-3xl">
        <Title text1="best" text2="seller" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-3">
          Shop Our Best Sellers – The Hottest Trends You’ll Love!
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.length > 0 ? (
          bestSeller
            .filter((item) => item.bestSeller === true)
            .map((item, index) => (
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

export default BestSeller;

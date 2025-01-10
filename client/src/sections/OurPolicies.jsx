import React, { useContext, useRef } from "react";
import { exchange, express, payment, quality } from "../assets/icons/icons";
// import { AnimationContext } from "../context/AnimationContext";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";

const OurPolicies = () => {
  // const timeline = useContext(AnimationContext);
  // const policyRef = useRef(null);

  //   useGSAP(() => {
  //     if (timeline) {
  //         gsap.fromTo(
  //             policyRef.current.querySelectorAll("section div"),
  //             {
  //                 opacity: 0,
  //             },
  //             {
  //                 opacity: 1,
  //                 y: 0,
  //                 stagger:0.6,
  //                 ease: "power3.out",
  //                 scrollTrigger: {
  //                     trigger: policyRef.current,
  //                     scroller: document.body,
  //                     markers: true,
  //                     start: "top bottom",
  //                     end: "bottom top",
  //                     scrub: true,
  //                 },
  //             }
  //         );
  //     }
  // }, [timeline]);

  return (
    // <section
    //   ref={policyRef}
    //   className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700"
    // >
    <section className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-16 text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-400">
      <div>
        <img className="w-12 m-auto mb-2" src={exchange} alt="" />
        <p className="font-semibold mb-3">Easy Exchange Policy</p>
        <p className="text-gray-400 dark:text-gray-500"> We offer hastle free exchange policy.</p>
      </div>
      <div>
        <img className="w-12 m-auto mb-2" src={quality} alt="" />
        <p className="font-semibold mb-3">7 Days Return Policy</p>
        <p className="text-gray-400 dark:text-gray-500"> We provide 7 days free return policy.</p>
      </div>
      <div>
        <img className="w-12 m-auto mb-2" src={payment} alt="" />
        <p className="font-semibold mb-3">Secure Payment</p>
        <p className="text-gray-400 dark:text-gray-500">
          {" "}
          Safe and secure payments, always for you.
        </p>
      </div>
      <div>
        <img className="w-12 m-auto mb-2" src={express} alt="" />
        <p className="font-semibold mb-3">Express Delivery</p>
        <p className="text-gray-400 dark:text-gray-500"> Fast, reliable express delivery service.</p>
      </div>
    </section>
  );
};

export default OurPolicies;

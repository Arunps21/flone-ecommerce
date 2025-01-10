import React, { createContext, useRef, useEffect } from "react";
import gsap from "gsap";

const AnimationContext = createContext();

const AnimationProvider = ({ children }) => {
  const timeline = useRef(gsap.timeline());


  return (
    <AnimationContext.Provider value={timeline.current}>
      {children}
    </AnimationContext.Provider>
  );
};

export { AnimationContext, AnimationProvider };

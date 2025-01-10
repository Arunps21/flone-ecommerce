import React from "react";
import { brands } from "../assets/icons/icons";

function Brand() {
  return (
    <>
      <div className="w-full text-5xl inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] ">
        <ul className="flex items-center justify-center md:justify-start sm:[&_li]:mx-8 [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll">
          <li>
            <img src={brands.RalphLauren} alt="RalphLauren" className="w-24" />
          </li>
          <li>
            <img src={brands.Levis} alt="Levis" className="w-24" />
          </li>
          <li>
            <img src={brands.Nike} alt="Nike" className="w-24" />
          </li>
          <li>
            <img src={brands.Zara} alt="Zara" className="w-24" />
          </li>
          <li>
            <img src={brands.Gucci} alt="Gucci" className="w-24" />
          </li>
          <li>
            <img src={brands.Calvin} alt="Calvin" className="w-24" />
          </li>
          <li>
            <img src={brands.Puma} alt="Puma" className="w-24" />
          </li>
          <li>
            <img src={brands.HM} alt="HM" className="w-20" />
          </li>
          <li>
            <img src={brands.Uniqlo} alt="Uniqlo" className="w-16" />
          </li>
          <li>
            <img src={brands.Louisvui} alt="Louisvui" className="w-14" />
          </li>
          <li>
            <img src={brands.TommyHilfiger} alt="TommyHilfiger" className="w-40" />
          </li>
          <li>
            <img src={brands.Lacoste} alt="Lacoste" className="w-24" />
          </li>
          <li>
            <img src={brands.Versace} alt="Versace" className="w-16" />
          </li>
        </ul>
        <ul className="flex items-center justify-center md:justify-start sm:[&_li]:mx-8 [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll">
          <li>
            <img src={brands.RalphLauren} alt="RalphLauren" className="w-24" />
          </li>
          <li>
            <img src={brands.Levis} alt="Levis" className="w-24" />
          </li>
          <li>
            <img src={brands.Nike} alt="Nike" className="w-24" />
          </li>
          <li>
            <img src={brands.Zara} alt="Zara" className="w-24" />
          </li>
          <li>
            <img src={brands.Gucci} alt="Gucci" className="w-24" />
          </li>
          <li>
            <img src={brands.Calvin} alt="Gucci" className="w-24" />
          </li>
          <li>
            <img src={brands.Puma} alt="Puma" className="w-24" />
          </li>
          <li>
            <img src={brands.HM} alt="HM" className="w-20" />
          </li>
          <li>
            <img src={brands.Uniqlo} alt="Uniqlo" className="w-16" />
          </li>
          <li>
            <img src={brands.Louisvui} alt="Louisvui" className="w-14" />
          </li>
          <li>
            <img src={brands.TommyHilfiger} alt="TommyHilfiger" className="w-40" />
          </li>
          <li>
            <img src={brands.Lacoste} alt="Lacoste" className="w-24" />
          </li>
          <li>
            <img src={brands.Versace} alt="Versace" className="w-16" />
          </li>
        </ul>
      </div>
    </>
  );
}
export default Brand;

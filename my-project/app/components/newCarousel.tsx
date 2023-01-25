"use client"
import "./newstyles.css";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { useState } from "react";

const Slider = ({data}: any) => {
   const [current, setCurrent] = useState(0);

   const nextSlide = () => {
      setCurrent(current === data.length - 1 ? 0 : current + 1);
   };
   const prevSlide = () => {
      setCurrent(current === 0 ? data.length - 1 : current - 1);
   };

   return (
      <div className="slider w-[full] h-[32rem] rounded-lg animate-pulse">
         <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
         <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
         {data.map((d: any, index: any) => {
            return current === index ? (
               <div key={index} className="slide w-[50%]] rounded-lg">
                  <img className="object-center object-scale-down overflow-hidden" src={d} alt="images" />
               </div>
            ) : null;
         })}
      </div>
   );
};
export default Slider;

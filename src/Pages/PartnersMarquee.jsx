import React from "react";
import Marquee from "react-fast-marquee";

import brand1 from '../assets/brands/amazon.png';
import brand2 from '../assets/brands/amazon_vector.png';
import brand3 from '../assets/brands/casio.png';
import brand4 from '../assets/brands/moonstar.png';
import brand5 from '../assets/brands/randstad.png';
import brand6 from '../assets/brands/start-people 1.png';
import brand7 from '../assets/brands/start.png';

const partners = [
  { name: "Amazon", img: brand1 },
  { name: "Amazon Vector", img: brand2 },
  { name: "Casio", img: brand3 },
  { name: "Moonstar", img: brand4 },
  { name: "Randstad", img: brand5 },
  { name: "Start People", img: brand6 },
  { name: "Start", img: brand7 },
];

const PartnersMarquee = () => {
  return (
    <section className="py-10 bg-gray-100 my-10">
      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 text-center mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          We've helped thousands of sales teams
        </h2>
      </div>

      <Marquee
        speed={50}
        gradient={false}
        pauseOnHover={true}
        className="py-4"
      >
        {partners.map((partner, index) => (
          <div
            key={index}
            className="flex items-center justify-center mx-6 w-[120px] md:w-[150px] lg:w-[180px]"
          >
            <img
              src={partner.img}
              alt={partner.name}
              className="max-h-12 object-contain"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default PartnersMarquee;
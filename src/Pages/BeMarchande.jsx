import React from "react";
import lacationMarchant from "../assets/location-merchant.png";
import merchantBg from "../assets/be-a-merchant-bg.png";

const BeMarchande = () => {
  return (
    <div data-aos="flip-right" className="bg-secondary md:rounded-3xl px-6 py-16 md:py-20 bg-no-repeat bg-top"  style={{ backgroundImage: `url(${merchantBg})` }}>
      <div className="flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl mx-auto gap-10">
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-100 mb-4">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="text-sm text-gray-300 mb-6">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-15 md:mt-0">
            <button className="btn btn-primary rounded-full px-6 py-2 text-black">
              Become a Merchant
            </button>
            <button className="btn btn-primary btn-outline rounded-full px-6 py-2 hover:text-black">
              Earn with Profast Courier
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src={lacationMarchant}
            className="w-52 sm:w-72 md:w-96"
            alt="Merchant Location"
          />
        </div>
      </div>
    </div>
  );
};

export default BeMarchande;

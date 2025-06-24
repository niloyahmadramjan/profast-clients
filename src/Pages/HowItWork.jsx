import React from "react";
import { motion } from "framer-motion";
import { FaTruckLoading, FaMoneyBillWave, FaWarehouse, FaBriefcase } from "react-icons/fa";

const howItWorks = [
  {
    title: "Booking Pick & Drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaTruckLoading size={35} className="text-primary" />,
  },
  {
    title: "Cash On Delivery",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaMoneyBillWave size={35} className="text-primary" />,
  },
  {
    title: "Delivery Hub",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaWarehouse size={35} className="text-primary" />,
  },
  {
    title: "Booking SME & Corporate",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaBriefcase size={35} className="text-primary" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-12 px-4 md:px-10 lg:px-20 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">How it Works</h2>
        </motion.div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {howItWorks.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl p-6 shadow-md bg-white flex flex-col items-center justify-center text-center border hover:shadow-lg"
            >
              {item.icon}
              <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-700">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
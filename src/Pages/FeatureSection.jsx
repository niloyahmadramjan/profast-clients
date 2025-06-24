import { motion } from "framer-motion";
import imge1 from "../assets/live-tracking.png";
import imge2 from "../assets/bookingIcon.png";
import imge3 from "../assets/safe-delivery.png";

const FeatureSection = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const cards = [
    {
      img: imge1,
      title: "Live Parcel Tracking",
      desc:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    },
    {
      img: imge2,
      title: "100% Safe Delivery",
      desc:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    },
    {
      img: imge3,
      title: "24/7 Call Center Support",
      desc:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    },
  ];

  return (
    <section className="flex flex-col gap-8 my-12 px-4">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          custom={index}
          className="bg-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-xl hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="md:pr-10 md:border-r-2 md:border-dotted md:border-gray-300">
            <img
              src={card.img}
              alt={card.title}
              className="w-36 md:w-48 object-contain"
            />
          </div>
          <div className="md:pl-10 text-center md:text-left">
            <h3 className="text-xl font-bold text-[#01303f] mb-3">
              {card.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {card.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </section>
  );
};

export default FeatureSection;

import React from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";

const FAQ = () => {
  return (
    <div className="my-20 px-4" >
      <div>
        <h2 className="text-4xl text-center font-bold text-black pb-5" data-aos="fade-up">
          Frequently Asked Questions (FAQ)
        </h2>
        <p className="text-gray-400 text-center pb-5 max-w-2xl mx-auto" data-aos="fade-up">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>
      </div>

      {/* Accordion 1 */}
      <div className="collapse collapse-arrow border border-base-300 rounded-md mb-3" data-aos="fade-up">
        <input type="radio" name="faq-accordion" className="peer" defaultChecked />
        <div className="collapse-title font-semibold peer-checked:bg-[#E6F2F3] transition-all">
          How does this posture corrector work?
        </div>
        <div className="collapse-content text-sm bg-[#F8FAFB] peer-checked:bg-[#E6F2F3] transition-all">
          The posture corrector gently pulls your shoulders back and aligns your spine, encouraging proper posture. It helps train your muscles and spine to maintain a healthier position even when you're not wearing it.
        </div>
      </div>

      {/* Accordion 2 */}
      <div className="collapse collapse-arrow border border-base-300 rounded-md mb-3" data-aos="fade-up">
        <input type="radio" name="faq-accordion" className="peer" />
        <div className="collapse-title font-semibold bg-base-100 peer-checked:bg-[#E6F2F3] transition-all">
          Is it suitable for all ages and body types?
        </div>
        <div className="collapse-content text-sm bg-base-100 peer-checked:bg-[#E6F2F3] transition-all">
          Yes, our posture corrector is adjustable and designed to fit most body types, and it's safe for both teens and adults. We recommend consulting with a healthcare professional before use if you have existing medical conditions.
        </div>
      </div>

      {/* Accordion 3 */}
      <div className="collapse collapse-arrow border border-base-300 rounded-md mb-3" data-aos="fade-up">
        <input type="radio" name="faq-accordion" className="peer" />
        <div className="collapse-title font-semibold bg-base-100 peer-checked:bg-[#E6F2F3] transition-all">
          Does it really help with back pain and posture improvement?
        </div>
        <div className="collapse-content text-sm bg-base-100 peer-checked:bg-[#E6F2F3] transition-all">
          Yes, consistent use can relieve tension in the shoulders, neck, and back by encouraging better posture. Many users report reduced discomfort and noticeable posture improvement within weeks.
        </div>
      </div>

      {/* Accordion 4 */}
      <div className="collapse collapse-arrow border border-base-300 rounded-md mb-3" data-aos="fade-up">
        <input type="radio" name="faq-accordion" className="peer" />
        <div className="collapse-title font-semibold bg-base-100 peer-checked:bg-[#E6F2F3] transition-all">
          Does it have smart features like vibration alerts?
        </div>
        <div className="collapse-content text-sm bg-base-100 peer-checked:bg-[#E6F2F3] transition-all">
          Yes! Some models include smart features like real-time posture monitoring and gentle vibration alerts when you slouch, helping you correct posture instantly.
        </div>
      </div>

      {/* Accordion 5 */}
      <div className="collapse collapse-arrow border border-base-300 rounded-md" data-aos="fade-up">
        <input type="radio" name="faq-accordion" className="peer" />
        <div className="collapse-title font-semibold bg-base-100 peer-checked:bg-[#E6F2F3] transition-all">
          How will I be notified when the product is back in stock?
        </div>
        <div className="collapse-content text-sm bg-base-100 peer-checked:bg-[#E6F2F3] transition-all">
          You can subscribe to restock alerts on the product page. Once the product is available, we’ll send you an email notification right away.
        </div>
      </div>
      <div className="flex justify-center items-center mt-10" data-aos="fade-up">
        <button className="btn btn-primary text-black">See More FAQ’s <FaArrowAltCircleRight className="rotate-320" size={20} /></button>
      </div>
    </div>
  );
};

export default FAQ;

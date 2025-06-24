import customerTop from "../assets/customer-top.png"; // top quote image

const CustomerReviews = () => {
  return (
    <div className="w-full bg-gray-50 py-14 flex flex-col items-center">
      {/* Header */}
      <div className="text-center px-4">
        <img
          src={customerTop}
          alt="Top Icon"
          className="mx-auto mb-6 w-48 md:w-52"
        />
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          What our customers are sayings
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>

      {/* reviews card  */}
      <div>
        <div>
          <img src="" alt="x" />
        </div>
        <h2></h2>
      </div>
    </div>
  );
};

export default CustomerReviews;

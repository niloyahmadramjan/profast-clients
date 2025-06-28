import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../Hook/UseAxiosSecure";
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "../../LoadingAnimation";
import Swal from "sweetalert2";
import AuthUser from "../../../Hook/AuthUser";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = AuthUser();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { parcelId } = useParams();
  const navigate = useNavigate();

  // Fetch parcel details
  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) {
    return <LoadingAnimation />;
  }

  const amount = parcelInfo.cost;
  const amountCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // Step 1: Create payment intent from server
      const { data } = await axiosSecure.post("/createPaymentIntent", {
        amount: amountCents,
      });
      const clientSecret = data.clientSecret;

      // Step 2: Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: parcelInfo.name || "Customer",
            email: parcelInfo.email,
          },
        },
      });

      if (result.error) {
        setMessage("❌ Payment failed. Please try again.");
      } else {
        if (result.paymentIntent.status === "succeeded") {
          setMessage("✅ Payment successful!");
          const transactionId = result.paymentIntent.id;

          // Step 3: Send payment info to server
          const paymentData = {
            parcelId,
            email: user.email,
            amount,
            transactionId: transactionId,
            paymentMethod: result.paymentIntent.payment_method_types[0],
          };

          const paymentRes = await axiosSecure.post("/payments", paymentData);

          if (paymentRes.data.insertedId) {
            await Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
              confirmButtonText: "Go to My Parcels",
            });
            navigate("/dashboard/myparcels");
          }
        }
      }
    } catch (error) {
      console.log(error)
      setMessage("❌ Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 mt-10 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Secure Payment
      </h2>

      <div className="bg-gray-50 p-4 rounded-md mb-6 border">
        <p>
          <strong>Parcel Name:</strong> {parcelInfo.parcelName}
        </p>
        <p>
          <strong>Amount to Pay:</strong> RM {amount}
        </p>
        <p>
          <strong>Tracking:</strong> {parcelInfo.trackingNumber}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="p-4 border border-gray-300 rounded-md bg-white shadow-sm">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#333",
                  '::placeholder': {
                    color: "#a0aec0",
                  },
                },
                invalid: {
                  color: "#e53e3e",
                },
              },
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full btn btn-success text-white text-lg"
        >
          {loading ? "Processing..." : `Pay RM ${amount}`}
        </button>

        {message && (
          <p
            className={`text-center mt-3 ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;

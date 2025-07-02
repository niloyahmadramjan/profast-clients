import React from "react";
import useAxiosSecure from "../../Hook/UseAxiosSecure";
import AuthUser from "../../Hook/AuthUser";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "../LoaderAnimation/LoadingAnimation";

const PaymentHistory = () => {
  const { user } = AuthUser();
  const axiosSecure = useAxiosSecure();

  const { data: paymentHistory = [], isLoading } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/paymentHistory?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingAnimation></LoadingAnimation>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        My Payment History
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full table-auto text-sm text-left text-gray-700">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Transaction ID</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Method</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paymentHistory.map((payment, index) => (
              <tr
                key={payment._id}
                className="hover:bg-gray-100 transition duration-300"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 text-blue-700 font-medium break-all">
                  {payment.transactionId}
                </td>
                <td className="px-6 py-4 font-semibold text-green-600">
                  RM {payment.amount}
                </td>
                <td className="px-6 py-4 capitalize">
                  {payment.paymentMethod}
                </td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    {payment.payment_status || "Paid"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {new Date(payment.paid_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {paymentHistory.length === 0 && (
          <p className="text-center text-gray-500 py-6">
            You have no payment history yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;

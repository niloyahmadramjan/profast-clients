import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaEye,
  FaMoneyBillWave,
} from "react-icons/fa";
import useAxiosSecure from "../../Hook/UseAxiosSecure";
import Swal from "sweetalert2";
import AuthUser from "../../Hook/AuthUser";
import LoadingAnimation from "../LoaderAnimation/LoadingAnimation";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = AuthUser();
  const navigate = useNavigate();

  // 🟡 Load parcels for the logged-in user using TanStack React Query
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcelsData?email=${user?.email}`);
      return res.data;
    },
  });

  // 🔴 Handle Delete (you can later connect with your backend)
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this parcel!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/parcels/delete/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Your parcel has been deleted.", "success");
          refetch(); // refresh list
        }
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  // 🟠 Handle View (You can later show a modal or navigate)
  const handleView = (parcel) => {
    Swal.fire({
      title: "Parcel Details",
      html: `
        <p><strong>Tracking Number:</strong> ${parcel.trackingNumber}</p>
        <p><strong>Sender:</strong> ${parcel.senderName}, ${parcel.senderDistrict}</p>
        <p><strong>Receiver:</strong> ${parcel.receiverName}, ${parcel.receiverDistrict}</p>
        <p><strong>Status:</strong> ${parcel.status}</p>
        <p><strong>Payment Status:</strong> ${parcel.paymentStatus}</p>
        <p><strong>Cost:</strong> ৳${parcel.cost}</p>
      `,
    });
  };

  // 🟢 Handle Pay (Navigate to payment or show modal)
  const handlePay = (parcel) => {
    // You can show Stripe payment modal here
    navigate(`/dashboard/payment/${parcel._id}`);
  };

  const getPaymentBadgeClass = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";
      case "Unpaid":
        return "bg-red-100 text-red-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-gray-200 text-gray-700";
      case "Error":
        return "bg-pink-100 text-pink-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  if (isLoading) return <LoadingAnimation></LoadingAnimation>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">My Parcels</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="table w-full">
          <thead className="bg-gray-100 text-base">
            <tr>
              <th>#</th>
              <th>Parcel</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Cost</th>
              <th>Tracking</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.parcelName}</td>
                <td>
                  {parcel.senderName} ({parcel.senderDistrict},{" "}
                  {parcel.senderArea})
                </td>
                <td>
                  {parcel.receiverName} ({parcel.receiverDistrict},{" "}
                  {parcel.receiverArea})
                </td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      parcel.status === "Pending"
                        ? "bg-yellow-200 text-yellow-700"
                        : parcel.status === "Cancelled"
                        ? "bg-red-200 text-red-700"
                        : "bg-green-200 text-green-700"
                    }`}
                  >
                    {parcel.status}
                  </span>
                </td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${getPaymentBadgeClass(
                      parcel.paymentStatus
                    )}`}
                  >
                    {parcel.paymentStatus}
                  </span>
                </td>

                <td>৳{parcel.cost}</td>
                <td>{parcel.trackingNumber}</td>
                <td className="flex  gap-2">
                  {/* View Button */}
                  <button
                    onClick={() => handleView(parcel)}
                    className="btn btn-sm btn-info text-white"
                  >
                    <FaEye className="mr-1" /> View
                  </button>

                  {/* Pay Button (only if unpaid) */}
                  {parcel.paymentStatus === "Unpaid" && (
                    <button
                      onClick={() => handlePay(parcel)}
                      className="btn btn-sm btn-success text-white"
                    >
                      <FaMoneyBillWave className="mr-1" /> Pay
                    </button>
                  )}

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;

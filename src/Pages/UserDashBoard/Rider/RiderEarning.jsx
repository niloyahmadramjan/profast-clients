// RiderEarning.jsx
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import AuthUser from "../../../Hook/AuthUser";
import useAxiosSecure from "../../../Hook/UseAxiosSecure";

const RiderEarning = () => {
  const { user } = AuthUser();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["rider-parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels-earning?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const withdrawMutation = useMutation({
    mutationFn: async (parcelId) => {
      const res = await axiosSecure.patch(`/rider/withdraw/${parcelId}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Earning withdrawn successfully.", "success");
      queryClient.invalidateQueries(["rider-parcels"]);
    },
    onError: () => {
      Swal.fire("Error!", "Withdrawal failed.", "error");
    },
  });

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Rider Earnings</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Cost</th>
              <th>Earning</th>
              <th>Status</th>
              <th>Withdraw</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.parcelName}</td>
                <td>{parcel.senderDistrict}</td>
                <td>{parcel.receiverDistrict}</td>
                <td>৳ {parcel.cost}</td>
                <td>৳ {parcel.earning?.toFixed(2)}</td>
                <td>{parcel.withdrawn ? "Withdrawn" : "Pending"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-success"
                    disabled={parcel.withdrawn}
                    onClick={() =>
                      Swal.fire({
                        title: "Withdraw earning?",
                        text: "Are you sure to withdraw this earning?",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonText: "Yes, withdraw it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          withdrawMutation.mutate(parcel._id);
                        }
                      })
                    }
                  >
                    Withdraw
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

export default RiderEarning;

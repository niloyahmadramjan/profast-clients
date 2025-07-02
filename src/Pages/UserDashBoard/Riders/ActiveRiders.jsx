import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/UseAxiosSecure";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedRider, setSelectedRider] = useState(null);

  // 🚀 Load all approved riders
  const { data: riders = [], isLoading } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/active-rider?status=approved");
      return res.data;
    },
  });

  // ❌ Reject Rider
  const rejectMutation = useMutation({
    mutationFn: async ({ id, email }) => {
      return await axiosSecure.patch(`/riders/application/${id}`, {
        status: "rejected",
        email,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["activeRiders"]);
      Swal.fire("Rider Rejected!", "Status changed to rejected.", "info");
    },
  });

  // ❌ Delete Rider
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/riders/application/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["activeRiders"]);
      Swal.fire("Deleted!", "Rider has been removed.", "success");
    },
  });

  const handleReject = (rider) => {
    rejectMutation.mutate({ id: rider._id, email: rider.email });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p className="text-center py-10">Loading riders...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Active Riders</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id} className="hover">
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.district}</td>
                <td>
                  <span className="badge badge-success">{rider.status}</span>
                </td>
                <td className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedRider(rider)}
                    className="btn btn-sm btn-info"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleReject(rider)}
                    className="btn btn-sm btn-warning"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleDelete(rider._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal to show full rider details */}
      {selectedRider && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg relative">
            <button
              className="absolute top-2 right-2 btn btn-sm"
              onClick={() => setSelectedRider(null)}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-2">Rider Details</h3>
            <p><strong>Name:</strong> {selectedRider.name}</p>
            <p><strong>Email:</strong> {selectedRider.email}</p>
            <p><strong>Phone:</strong> {selectedRider.phone}</p>
            <p><strong>Age:</strong> {selectedRider.age}</p>
            <p><strong>Region:</strong> {selectedRider.region}</p>
            <p><strong>District:</strong> {selectedRider.district}</p>
            <p><strong>NID:</strong> {selectedRider.nid}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveRiders;

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/UseAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const PendingRider = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  // Load all pending riders
  const { data: riders = [], isLoading } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/status/pending");
      return res.data;
    },
  });

  // Update status (approve or reject)
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, email }) => {
      return await axiosSecure.patch(`/riders/application/${id}`, {
        status,
        email,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingRiders"]);
      Swal.fire("Updated!", "Rider status changed.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to update status.", "error");
    },
  });

  const handleUpdate = (id, status, email) => {
    updateStatusMutation.mutate({ id, status, email });
  };

  // Delete rider
  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/riders/application/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingRiders"]);
      Swal.fire("Deleted!", "Rider deleted.", "success");
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the rider.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
    });

    if (confirm.isConfirmed) {
      deleteMutation.mutate(id);
    }
  };

  const filteredRiders = riders.filter((rider) =>
    rider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if(isLoading){
    return <h2>Loading...</h2>
  }

  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-bold mb-4">Pending Rider Applications</h2>

      <input
        type="text"
        placeholder="Search rider by name..."
        className="input input-bordered mb-4 w-full max-w-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="table table-zebra table-sm lg:table-md">
          <thead className="bg-base-200">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Age</th>
              <th>NID</th>
              <th>Region</th>
              <th>District</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRiders.map((rider) => (
              <tr key={rider._id}>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.phone}</td>
                <td>{rider.age}</td>
                <td>{rider.nid}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>
                <td className="flex flex-col gap-1 lg:flex-row">
                  <button
                    className="btn btn-xs bg-green-500 text-white"
                    onClick={() =>
                      handleUpdate(rider._id, "approved", rider.email)
                    }
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-xs bg-yellow-500 text-white"
                    onClick={() =>
                      handleUpdate(rider._id, "rejected", rider.email)
                    }
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-xs bg-red-500 text-white"
                    onClick={() => handleDelete(rider._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRiders.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No rider found.</p>
        )}
      </div>
    </motion.div>
  );
};

export default PendingRider;

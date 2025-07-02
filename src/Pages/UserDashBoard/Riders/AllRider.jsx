// ✅ Client-side: Show All Rider Applications with Action Controls

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/UseAxiosSecure";
import AuthUser from "../../../Hook/AuthUser";

const AllRiders = () => {
  const { user } = AuthUser();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const email = user.email;

  // 🔁 Load all rider applications
  const { data: riders = [], isLoading } = useQuery({
    queryKey: ["allRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allRider");
      return res.data;
    },
  });

  // ✅ Mutations for status updates
  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      return await axiosSecure.patch(`/riders/application/${id}`, {
        status,
        email,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allRiders"]);
      Swal.fire("Success", "Rider status updated", "success");
    },
  });

  // ❌ Mutation for delete
  const deleteRider = useMutation({
    mutationFn: async (id) =>
      await axiosSecure.delete(`/riders/application/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["allRiders"]);
      Swal.fire("Deleted", "Rider has been removed", "success");
    },
  });

  const handleStatus = (id, status) => {
    updateStatus.mutate({ id, status });
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      deleteRider.mutate(id);
    }
  };

  const filteredRiders = riders.filter((rider) =>
    rider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded shadow-lg overflow-x-auto"
    >
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">All Rider Applications</h2>
        <input
          type="text"
          placeholder="Search by name..."
          className="input input-bordered w-64"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Region</th>
              <th>District</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRiders.map((rider, index) => (
              <tr key={rider._id} className="hover">
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.phone}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>
                <td>
                  <span
                    className={`badge ${
                      rider.status === "approved"
                        ? "badge-success"
                        : rider.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {rider.status}
                  </span>
                </td>
                <td className="flex flex-col gap-1">
                  <button
                    className="btn btn-xs btn-success"
                    onClick={() => handleStatus(rider._id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleStatus(rider._id, "rejected")}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-xs btn-outline"
                    onClick={() => handleDelete(rider._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </motion.div>
  );
};

export default AllRiders;

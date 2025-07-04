import React from "react";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/UseAxiosSecure";
import AuthUser from "../../../Hook/AuthUser";
import LoadingAnimation from "../../LoaderAnimation/LoadingAnimation";



const MyApplication = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = AuthUser();
  const queryClient = useQueryClient();

  // 📦 Load application using TanStack
  const { data: application, isLoading } = useQuery({
    queryKey: ["riderApplication", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders/${user.email}`);
      return res.data;
    },
  });

  // ❌ Mutation for deleting application
  const deleteMutation = useMutation({
    mutationFn: async () => {
      return await axiosSecure.delete(`/riders/${user.email}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["riderApplication"]);
      Swal.fire("Deleted!", "Your application has been removed.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete application", "error");
    },
  });

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete your application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      deleteMutation.mutate();
    }
  };

  if (isLoading) return <LoadingAnimation></LoadingAnimation>

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">My Rider Application</h2>

      {!application ? (
        <p className="text-gray-500">You have not submitted any application yet.</p>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <p><strong>Name:</strong> {application.name}</p>
            <p><strong>Email:</strong> {application.email}</p>
            <p><strong>Phone:</strong> {application.phone}</p>
            <p><strong>Age:</strong> {application.age}</p>
            <p><strong>Region:</strong> {application.region}</p>
            <p><strong>District:</strong> {application.district}</p>
            <p><strong>NID:</strong> {application.nid}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`badge ${application.status === "pending"
                ? "badge-warning"
                : application.status === "approved"
                ? "badge-success"
                : "badge-error"
              }`}>
                {application.status}
              </span>
            </p>
          </div>
              {
                application.status === 'approved'? "":  <button
            onClick={handleDelete}
            className="mt-4 btn bg-red-500 hover:bg-red-600 text-white"
          >
            Delete Application
          </button>
              }
        </div>
      )}
    </div>
  );
};

export default MyApplication;

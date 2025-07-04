import useAxiosSecure from "../../../Hook/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AdminManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  // ✅ Load default 10 users
  const { data: defaultUsers = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users?limit=10");
      return res.data;
    },
  });

  // ✅ Handle Search
  const handleSearch = async () => {
    if (search.trim() === "") {
      refetch(); // fallback to default
    } else {
      const res = await axiosSecure.get(`/riders/search?q=${search}`);
      setUsers(res.data);
    }
  };

  useEffect(() => {
    setUsers(defaultUsers);
  }, [defaultUsers]);

  const handleMakeAdmin = async (id) => {
    await axiosSecure.patch(`/users/role/${id}`, { role: "admin" });
    Swal.fire("Success", "User promoted to admin", "success");
    handleSearch();
  };

  const handleRemoveAdmin = async (id) => {
    await axiosSecure.patch(`/users/role/${id}`, { role: "user" });
    Swal.fire("Success", "Admin demoted to user", "success");
    handleSearch();
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Confirm delete?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });
    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/users/${id}`);
      Swal.fire("Deleted", "User removed", "success");
      handleSearch();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Management</h2>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          className="input input-bordered w-full sm:w-64"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === "admin" ? "badge-success" : "badge-neutral"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="flex flex-col gap-1 sm:flex-row sm:justify-center">
                  {user.role !== "admin" ? (
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => handleMakeAdmin(user._id)}
                    >
                      Make Admin
                    </button>
                  ) : (
                    <button
                      className="btn btn-xs btn-warning"
                      onClick={() => handleRemoveAdmin(user._id)}
                    >
                      Remove Admin
                    </button>
                  )}
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <p className="text-center text-gray-400 mt-4">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminManagement;

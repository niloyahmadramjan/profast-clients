import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/UseAxiosSecure";

export default function ParcelAssignment() {
  const axiosSecure = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [selectedRiderId, setSelectedRiderId] = useState("");
  const [search, setSearch] = useState("");

  // Parcel query
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/unassignedParcels");
      return res.data;
    },
  });

  console.log(parcels);

  // Rider query - only trigger when modal is open
  const { data: riders = [] } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?district=${selectedParcel.senderDistrict}`
      );
      return res.data;
    },
    enabled: !!selectedParcel,
  });

 const handleAssign = async () => {
  if (!selectedRiderId || !selectedParcel) return;

  // Find the selected rider object from riders list
  const selectedRider = riders.find(r => r._id === selectedRiderId);

  await axiosSecure.patch(`/parcels/assign/${selectedParcel._id}`, {
    riderId: selectedRiderId,
    riderEmail: selectedRider?.email || "",
  });

  await axiosSecure.patch(`/riders/busy/${selectedRiderId}`);

  // Reset state
  setSelectedParcel(null);
  setSelectedRiderId("");
  setSearch("");
  refetch();
};


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Paid Parcel Assignment</h2>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Parcel</th>
              <th>Receiver</th>
              <th>Weight</th>
              <th>Cost</th>
              <th>Tracking</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td>{parcel.parcelName}</td>
                <td>
                  {parcel.receiverName} ({parcel.receiverDistrict})
                </td>
                <td>{parcel.parcelWeight} kg</td>
                <td>{parcel.cost} BDT</td>
                <td>{parcel.trackingNumber}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => setSelectedParcel(parcel)}
                  >
                    Pickup
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedParcel && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-lg">
            <h3 className="font-bold text-lg mb-2">Assign Rider</h3>

            <input
              type="text"
              placeholder="Search rider by name"
              className="input input-bordered w-full mb-3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="max-h-60 overflow-y-auto space-y-2">
              {riders
                .filter((r) =>
                  r.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((rider) => (
                  <div
                    key={rider._id}
                    className={`p-2 border rounded cursor-pointer ${
                      selectedRiderId === rider._id
                        ? "bg-blue-100 border-blue-500"
                        : ""
                    }`}
                    onClick={() => setSelectedRiderId(rider._id)}
                  >
                    <p className="font-semibold">{rider.name}</p>
                    <p className="text-sm text-gray-500">
                      {rider.district} | {rider.phone}
                    </p>
                  </div>
                ))}
              {riders.length === 0 && (
                <p className="text-sm text-red-500">
                  No riders found in {selectedParcel.receiverDistrict}
                </p>
              )}
            </div>

            <div className="modal-action">
              <form method="dialog" className="flex gap-2">
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setSelectedParcel(null);
                    setSelectedRiderId("");
                    setSearch("");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!selectedRiderId}
                  onClick={handleAssign}
                >
                  Assign
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

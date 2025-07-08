import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../Hook/UseAxiosSecure';
import Swal from 'sweetalert2';

const RiderPickup = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Load tasks that are not yet "Delivery Complete"
  const { data: assignedParcels = [], isLoading } = useQuery({
    queryKey: ['assigned-parcels'],
    queryFn: async () => {
      const res = await axiosSecure.get('/rider/tasks');
      return res.data;
    },
  });

  // Status update mutation
  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/parcels/update-status/${id}`, { status });
      return res.data;
    },
    onSuccess: (_, { status }) => {
      toast.success(`Status updated to ${status}`);
      queryClient.invalidateQueries(['assigned-parcels']);
    },
    onError: () => {
      toast.error('Failed to update parcel status');
    },
  });

  const handleCompleteDelivery = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once completed, you cannot undo this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, complete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus({ id, status: 'Delivery Complete' });
      }
    });
  };

  if (isLoading) {
    return (
      <p className="text-center p-5">
        <span className="loading w-20 loading-spinner text-error"></span>
      </p>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 ">📦 Rider Task List</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th>Tracking</th>
              <th>Type</th>
              <th>Contact Info</th>
              <th>Location</th>
              <th>Instruction</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignedParcels.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-5">
                  No active parcels found.
                </td>
              </tr>
            )}
            {assignedParcels.map((parcel) => {
              const isAssigned = parcel.status === 'Assigned-Rider';
              const isTransit = parcel.status === 'In Transit';
              const contactName = isAssigned ? parcel.senderName : parcel.receiverName;
              const contactNumber = isAssigned ? parcel.senderContact : parcel.receiverContact;
              const location = isAssigned
                ? `${parcel.senderDistrict}, ${parcel.senderArea}`
                : `${parcel.receiverDistrict}, ${parcel.receiverArea}`;
              const instruction = isAssigned ? parcel.pickupInstruction : parcel.deliveryInstruction;

              return (
                <tr key={parcel._id} className="hover">
                  <td className="font-medium">{parcel.trackingNumber}</td>
                  <td>{parcel.parcelType}</td>
                 
                  
                  <td>
                    <p className="font-semibold">{contactName}</p>
                    <p className="text-sm text-gray-500">{contactNumber}</p>
                  </td>
                  <td>{location}</td>
                  <td className="text-sm">{instruction}</td>
                   <td>৳{parcel.cost}</td>
                  <td>
                    <span
                      className={`badge ${
                        isAssigned
                          ? 'badge-warning'
                          : isTransit
                          ? 'badge-info'
                          : 'badge-success'
                      }`}
                    >
                      {parcel.status}
                    </span>
                  </td>
                  <td>
                    {isAssigned && (
                      <button
                        onClick={() =>
                          updateStatus({ id: parcel._id, status: 'In Transit' })
                        }
                        className="btn btn-sm btn-warning"
                      >
                        Mark as Picked
                      </button>
                    )}
                    {isTransit && (
                      <button
                        onClick={() => handleCompleteDelivery(parcel._id)}
                        className="btn btn-sm btn-success"
                      >
                        Complete Delivery
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiderPickup;

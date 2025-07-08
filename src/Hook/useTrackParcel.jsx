import toast from "react-hot-toast";
import useAxiosSecure from "./UseAxiosSecure";

const useTrackParcel = () => {
  const axiosSecure = useAxiosSecure();

  const updateTracking = async ({
    parcelId,
    trackingNumber,
    status,
    location,
    message,
  }) => {
    try {
      const log = {
        status, // e.g. "Order Placed", "Assigned to Rider", etc.
        location, // e.g. "Dhaka - Dhanmondi Branch"
        message, // e.g. "Your parcel has been picked up by rider John."
        timestamp: new Date().toISOString(), // for sorting
      };

      const res = await axiosSecure.patch(`/parcels/track/${parcelId}`, {
        trackingNumber,
        log,
      });

      if (res.data.modifiedCount > 0) {
        toast.success("Tracking updated");
      }
    } catch (err) {
      toast.error("Failed to update tracking");
      console.error(err);
    }
  };

  return updateTracking;
};

export default useTrackParcel;

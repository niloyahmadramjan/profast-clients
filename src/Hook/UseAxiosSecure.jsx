import axios from "axios";
import AuthUser from "./AuthUser";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { user } = AuthUser();
  const location = useNavigate()

  // REQUEST INTERCEPTOR
  axiosSecure.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    },
    (error) => {
      console.error("Request error:", error);
      return Promise.reject(error);
    }
  );

  // RESPONSE INTERCEPTOR
  axiosSecure.interceptors.response.use(
    (response) => {
      // সব কিছু ঠিক থাকলে
      return response;
    },
    (error) => {
      // Error থাকলে এখানে catch হবে
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || "Unknown error";

        console.error(`HTTP ${status} - ${message}`);
        toast.error(`Error: ${message}`); // optional notification

        // Optionally: তুমি চাও user কে logout করে redirect করাতে
        if (status === 401 || status === 403) {
          location("/login")
        }
      } else {
        console.error("Network/server error:", error.message);
        toast.error("Server unreachable");
      }

      return Promise.reject(error); // এটাতে তুমি error.catch করতে পারো
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;

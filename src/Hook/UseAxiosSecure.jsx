import axios from "axios";
import AuthUser from "./AuthUser";
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000", //base URL
});

const useAxiosSecure = () => {
  const { user } = AuthUser();

  axiosSecure.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      return config;
    },
    (error) => {
      console.log(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;

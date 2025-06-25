import axios from "axios";
// import { useEffect } from 'react';

const useAxiosSecure = () => {
  const axiosSecure = axios.create({
    baseURL: "http://localhost:5000", //base URL
  });

  // Optional: Add interceptors if using JWT token
  //   useEffect(() => {
  //     axiosSecure.interceptors.request.use(config => {
  //       const token = localStorage.getItem('access-token'); // if you have JWT
  //       if (token) {
  //         config.headers.Authorization = `Bearer ${token}`;
  //       }
  //       return config;
  //     });
  //   }, [axiosSecure]);

  return axiosSecure;
};

export default useAxiosSecure;

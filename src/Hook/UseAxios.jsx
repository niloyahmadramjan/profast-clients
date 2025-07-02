import axios from "axios";

const UseAxios = () => {
  const axiosSecure = axios.create({
    baseURL: "http://localhost:5000", //base URL
  });

  return axiosSecure;
};

export default UseAxios;

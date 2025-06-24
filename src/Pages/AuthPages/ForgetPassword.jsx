import React from "react";

import ProFastLogo from "../ProFastLogo";
import { useForm } from "react-hook-form";
import AuthUser from "../../Hook/AuthUser";
import Swal from "sweetalert2";

const ForgerPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { resetPassword } = AuthUser();
  const onSubmit = (data) => {
    resetPassword(data.email)
      .then(() => {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Link send successfully!",
          text: "Please check your E-mail inbox",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <>
      {/* Left Side - Form */}
      <div className="md:w-1/2 w-full px-6 md:px-16">
        <div className="pb-16 pt-5">
          <ProFastLogo></ProFastLogo>
        </div>
        <h2 className="text-3xl font-bold mb-2">Forgot Password</h2>
        <p className="text-gray-500 mb-6">
          Enter your email address and we’ll send you a reset link.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-lime-400 hover:bg-lime-500 text-white py-2 rounded-md font-semibold transition"
          >
            Send
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Remember your password?{" "}
          <a href="#" className="text-lime-600 hover:underline font-semibold">
            Login
          </a>
        </p>
      </div>
    </>
  );
};

export default ForgerPassword;
